import { db } from "../connection.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) {
        return res.status(500).send("Something went wrong");
      }
      
      if (data.length) {
        return res.status(409).send("User already exists");
      }
      const salt=bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password,salt);
  
      const a = "INSERT INTO users (`username`, `email`, `password`) VALUE ( ?, ?, ?)";
      const values = [req.body.username, req.body.email,  hashPassword];
  
      db.query(a, values, (err, data) => {
        if (err) {
          return res.status(500).send("Something went wrong");
        }
        
        return res.status(200).send("Registered");
      });
    });
  };

  export const login= (req, res) =>{
    const q= " Select * from users where username=?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) {
        return res.status(500).send("Something went wrong");
      }
      
      if (data.length==0) {
        return res.status(409).send("User doesnt exists ");}
       
      const checkPassword= bcrypt.compareSync(req.body.password,data[0].password);
      if (! checkPassword)return res.status(400).send ("password not matched ");
      else res.status(200).send("login succesfully");
  })
    }

    export const post = (req, res) => {
        
          
        
          const a = "INSERT INTO post (`title`, `description`) VALUE ( ?, ?)";
          const values = [req.body.title, req.body.description];
      
          db.query(a, values, (err, data) => {
            if (err) {
              return res.status(500).send("Something went wrong");
            }
            
            return res.status(200).send("Published");
          });
        };
      ;
    