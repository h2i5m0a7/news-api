import express from 'express'
import bodyParser from 'body-parser';
import register from "./route/login.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: "*",
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'UPDATE']
}));

app.use("/app",register)
app.listen(8800,()=>{
    console.log("App Started")

})