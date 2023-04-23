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
const loadJSON = (fileName) => {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", fileName), "utf-8"));
};
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
    let data = loadJSON("data.json");
    data = Object.assign({}, data);
    if (productId in data) {
        data[productId].push(price);
    }
    else {
        data[productId] = [price];
    }
    saveJSON("data.json", data);
    return res.status(200).json({ message: "Working." });
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map