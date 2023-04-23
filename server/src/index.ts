import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT || 8080;

const loadJSON = (fileName: string) => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", fileName), "utf-8")
    );
};

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
    let data = loadJSON("data.json");
    data = { ...data };

    if (productId in data) {
        data[productId].push(price);
    } else {
        data[productId] = [price];
    }

    saveJSON("data.json", data);

    return res.status(200).json({ message: "Working." });
});

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
