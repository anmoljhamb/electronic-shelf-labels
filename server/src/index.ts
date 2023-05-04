import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import {
    Customers,
    DataInterface,
    DevicesInterface,
    ProductInterface,
} from "./types";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;
const FILENAME = "data.json";

const loadJSON = (
    fileName: string
): DataInterface | DevicesInterface | Customers => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", fileName), "utf-8")
    );
};

let data: DataInterface = loadJSON(FILENAME) as DataInterface;
let devices: DevicesInterface = loadJSON("devices.json") as DevicesInterface;
let customers: Customers = loadJSON("customers.json") as Customers;

const saveJSON = (
    fileName: string,
    data: DataInterface | DevicesInterface | Customers
) => {
    fs.writeFileSync(
        path.join(__dirname, "..", fileName),
        JSON.stringify(data)
    );
};

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

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
    } else {
        data[productId] = [{ price, time: new Date().toISOString() }];
    }

    saveJSON("data.json", data);

    res.status(200).json({ ...req.body });
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

            console.log(lastValue);

            if (lastValue >= secondLast) {
                return res.send(`1${lastValue}`);
            }

            let temp = 16 - lastValueStr.length - secondLastStr.length - 2;
            return res.send(`2$${secondLast}${" ".repeat(temp)}$${lastValue}`);
        } else {
            return res.send(`1${data[productId].at(-1).price}`);
        }
    }

    return res.send("Not Found");
});

app.post("/registerUser", (req, res) => {
    interface body {
        cardId: string;
        user: string;
    }
    const data = req.body as body;

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
    interface body {
        oldCardId: string;
        newCardId: string;
        user: string;
    }

    const data = req.body as body;

    const new_data = {
        ...customers,
        [data.newCardId]: customers[data.oldCardId],
    };

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

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
