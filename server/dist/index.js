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
let customers = loadJSON("customers.json");
const saveJSON = (fileName, data) => {
    fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", fileName), JSON.stringify(data));
};
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
app.post("/setDevice", (req, res) => {
    let { productId, price, desc, title } = req.body;
    price = price.toString();
    if (productId in devices) {
        devices[productId] = { productId, price, desc, title };
        saveJSON("devices.json", devices);
    }
    if (productId in data) {
        data[productId].push({ price, time: new Date().toISOString() });
    }
    else {
        data[productId] = [{ price, time: new Date().toISOString() }];
    }
    saveJSON("data.json", data);
    res.status(200).json(Object.assign({}, req.body));
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
            console.log(lastValue);
            if (lastValue >= secondLast) {
                return res.send(`1${lastValue}`);
            }
            let temp = 16 - lastValueStr.length - secondLastStr.length - 2;
            return res.send(`2$${secondLast}${" ".repeat(temp)}$${lastValue}`);
        }
        else {
            return res.send(`1${data[productId].at(-1).price}`);
        }
    }
    return res.send("Not Found");
});
app.post("/registerUser", (req, res) => {
    const data = req.body;
    if (!(data.cardId in customers)) {
        customers[data.cardId] = {
            email: data.user,
            cart: [],
        };
    }
    saveJSON("customers.json", customers);
    return res.status(200).json({ message: "ok", body: req.body });
});
app.post("/updateId", (req, res) => {
    const data = req.body;
    const new_data = Object.assign(Object.assign({}, customers), { [data.newCardId]: customers[data.oldCardId] });
    delete new_data[data.oldCardId];
    customers = new_data;
    saveJSON("customers.json", customers);
    return res.status(200).json({ message: "ok" });
});
app.get("/getId/:email", (req, res) => {
    const email = req.params.email;
    let idFound = false;
    let personId = "keyNotFound";
    Object.keys(customers).forEach((key) => {
        if (customers[key].email === email) {
            idFound = true;
            personId = key;
        }
    });
    return res.status(200).json({ message: "ok", cardId: personId });
});
app.get("/getTotal/:cardId", (req, res) => {
    const cardId = req.params.cardId;
    let total = 0;
    customers[cardId].cart.forEach((productId) => {
        total += Number.parseInt(devices[productId].price);
    });
    return res.status(200).json({ message: "ok", total });
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map