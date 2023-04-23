"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const FILENAME = "data.json";
const loadJSON = (fileName) => {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", fileName), "utf-8"));
};
let data = loadJSON(FILENAME);
let devices = loadJSON("devices.json");
const saveJSON = (fileName, data) => {
    fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", fileName), JSON.stringify(data));
};
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/register", (req, res) => {
    console.log(req.query);
    if (!("devices" in devices)) {
        let { productId } = req.query;
        productId = productId;
        if (!(productId in devices)) {
            devices[productId] = {
                desc: "",
                price: "",
                productId,
                title: "",
            };
            saveJSON("devices.json", devices);
        }
    }
    res.status(200).json({ message: "Ok" });
});
app.get("/getDevices", (req, res) => {
    res.status(200).json(devices);
});
app.get("/setPrice", (req, res) => {
    let { productId, price } = req.query;
    productId = productId;
    price = price;
    let _data = loadJSON(FILENAME);
    _data = Object.assign({}, _data);
    if (productId in _data) {
        _data[productId].push({ price, time: new Date().toISOString() });
    }
    else {
        _data[productId] = [{ price, time: new Date().toISOString() }];
    }
    if (productId in devices) {
        devices[productId].price = price;
    }
    saveJSON(FILENAME, _data);
    data = _data;
    return res.status(200).json({ message: "Ok" });
});
app.get("/getPrice", (req, res) => {
    let { productId } = req.query;
    productId = productId;
    if (productId in data) {
        if (data[productId].length >= 2) {
            let lastValueStr = data[productId].at(-1).price;
            let secondLastStr = data[productId].at(-2).price;
            let lastValue = Number.parseFloat(lastValueStr);
            let secondLast = Number.parseFloat(secondLastStr);
            if (lastValue >= secondLast) {
                return res.send(`1${lastValue}`);
            }
            let temp = 16 - lastValueStr.length - secondLastStr.length - 2;
            return res.send(`2$${secondLast}${" ".repeat(temp)}$${lastValue}`);
        }
        else {
            return res.send(`1${data[productId].at(-1)}`);
        }
    }
    return res.send("Not Found");
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map