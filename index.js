import express from 'express'
import bodyParser from 'body-parser';
import register from "./route/login.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express()
app.use(cors({
  origin: " http://localhost:3000",
  credentials:true
}));
app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../appname/public/upload')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date().now + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
app.post('/app/upload', upload.single('file'), function (req, res) {
    const file= req.file;
    return res.status(200).send(file.filename)
  })


app.use("/app",register)
app.listen(8800,()=>{
    console.log("App Started")

})