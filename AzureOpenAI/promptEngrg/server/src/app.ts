import express, {
    Request
    , Response
    , NextFunction
    , Application
    , ErrorRequestHandler
} from "express";
import { Server } from "http"
import createHttpError from "http-errors";
import { config } from "dotenv";

import { MainService } from "./function/main.service";

const cors = require("cors");
const main: MainService = new MainService();


config();

const app: Application = express();
app.use(express.json());
app.use(cors());

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
};

app.use(errorHandler);


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Got your request!")
});

app.post('/promptEng', async (req: Request, res: Response)=> {
    try {
        console.log("post: request: ", req.body)
        let response = await main.handler(req, null);
        console.log("----> response: ", response);
        res.status(200);
        res.send({response});
    }
    catch (err) {
        console.error(err);
    }

    
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
});

const PORT: Number = Number(process.env.PORT) || 3000;
const server: Server = app.listen(PORT, () => console.log(`🚀   listening on port: ${PORT}`));