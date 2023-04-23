import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { DataInterface, DevicesInterface, ProductInterface } from "./types";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;
const FILENAME = "data.json";

const loadJSON = (fileName: string): DataInterface | DevicesInterface => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", fileName), "utf-8")
    );
};

let data: DataInterface = loadJSON(FILENAME) as DataInterface;
let devices: DevicesInterface = loadJSON("devices.json") as DevicesInterface;

const saveJSON = (fileName: string, data: DataInterface | DevicesInterface) => {
    fs.writeFileSync(
        path.join(__dirname, "..", fileName),
        JSON.stringify(data)
    );
};

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    return res.send("Express Typescript on Vercel");
});

app.get("/register", (req, res) => {
    console.log(req.query);
    if (!("devices" in devices)) {
        let { productId } = req.query;
        productId = productId as string;
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
    res.status(200).json({ devices: Object.keys(data) });
});

app.get("/setPrice", (req, res) => {
    let { productId, price } = req.query;
    productId = productId as string;
    price = price as string;

    let _data = loadJSON(FILENAME) as DataInterface;
    _data = { ..._data };

    if (productId in _data) {
        _data[productId].push({ price, time: new Date().toISOString() });
    } else {
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
    productId = productId as string;

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
        } else {
            return res.send(`1${data[productId].at(-1)}`);
        }
    }

    return res.send("Not Found");
});

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
