"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const FILENAME = "data.json";
const loadJSON = (fileName) => {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", fileName), "utf-8"));
};
let data = loadJSON(FILENAME);
const saveJSON = (fileName, data) => {
    fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", fileName), JSON.stringify(data));
};
app.get("/", (req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/register", (req, res) => {
    console.log(req.query);
    res.status(200).json({ message: "Ok" });
});
app.get("/setPrice", (req, res) => {
    let { productId, price } = req.query;
    productId = productId;
    let _data = loadJSON(FILENAME);
    _data = Object.assign({}, _data);
    if (productId in _data) {
        _data[productId].push({ price, time: new Date().toISOString() });
    }
    else {
        _data[productId] = [{ price, time: new Date().toISOString() }];
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
            let lastValue = data[productId].at(-1).price;
            let secondLast = data[productId].at(-2).price;
            lastValue = Number.parseFloat(lastValue);
            secondLast = Number.parseFloat(secondLast);
            if (lastValue > secondLast) {
                return res.send(`1${lastValue}`);
            }
            return res.send(`2${lastValue} ${secondLast}`);
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