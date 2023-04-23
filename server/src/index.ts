import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
    return res.send("Express Typescript on Vercel");
});

app.get("/register", (req, res) => {
    console.log(req.query);
    res.status(200).json({ message: "Ok" });
});

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
