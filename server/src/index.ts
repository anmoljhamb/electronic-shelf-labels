import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT || 8080;
const FILENAME = "data.json";

const loadJSON = (fileName: string) => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", fileName), "utf-8")
    );
};

let data: any = loadJSON(FILENAME);

const saveJSON = (fileName: string, data: any) => {
    fs.writeFileSync(
        path.join(__dirname, "..", fileName),
        JSON.stringify(data)
    );
};

app.get("/", (req: Request, res: Response) => {
    return res.send("Express Typescript on Vercel");
});

app.get("/register", (req, res) => {
    console.log(req.query);
    res.status(200).json({ message: "Ok" });
});

app.get("/setPrice", (req, res) => {
    let { productId, price } = req.query;
    productId = productId as string;

    let _data = loadJSON(FILENAME);
    _data = { ..._data };

    if (productId in _data) {
        _data[productId].push({ price, time: new Date().toISOString() });
    } else {
        _data[productId] = [{ price, time: new Date().toISOString() }];
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

            let temp = 16 - lastValueStr.length - secondLastStr.length;
            return res.send(`2${lastValue}${" ".repeat(temp)}${secondLast}`);
        } else {
            return res.send(`1${data[productId].at(-1)}`);
        }
    }

    return res.send("Not Found");
});

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
