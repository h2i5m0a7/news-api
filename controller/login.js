import { db } from "../connection.js";
import   bcrypt  from 'bcryptjs';
import jwt from "jsonwebtoken"
export const register = (req, res) => {
    const user = req.body;
  
    if (user.password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [user.username], (err, data) => {
      if (err) {
        console.log("error")
        return res.status(500).send("Something went wrong");
      }
      
      if (data.length) {
        return res.status(409).send("User already exists");
      }
  
  
       const salt = bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(req.body.password,salt);
    
      const a = "INSERT INTO users (`username`, `email`, `password`) VALUES ( ?, ?, ?)";
      const values = [req.body.username,  req.body.email, hashedPassword];
  
      db.query(a, values, (err, data) => {
        if (err) {
            console.log("error")
          return res.status(500).send("Something went wrong");
        }
        return res.status(200).send("Registered");
      });
    });
  };
  

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = data[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id }, "jwtkey", { expiresIn: "1h" });
    const { password: pwd, ...otherDetails } = user;

    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({ message: "Login successfully", ...otherDetails });
  });
};

export const getPosts= (req,res)=>{
  const q ="select `username`,`title`,`description`,`img`,`cat`,`date`from users U join post p on u.id=p.uid where p.id=?";
  db.query(q,[req.params.id],(err,data)=>{
    if (err){
      return res.status(500).send(err);
    }
    else{
      // console.log(data[0]);
      return res.status(200).send(data[0])
    }
  })
}
export const logout = (req, res) => {
  try {
    res.clearCookie("AccessToken", {
      sameSite: "none",
      secure: true
    });
    res.status(200).json({ message: "User has been logged out" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during logout" });
  }
};
export const getPost= (req,res)=>{
  const q= req.query.cat ? "select * from post where cat=?":"select * from post";
  db.query(q,[req.query.cat],(err,data)=>{
    if (err){
      return res.status(500).send(err)
    }
    else{
      return res.status(200).send(data)
    }
  })
}
 export const deletePost=(req,res)=>{
  const token= req.cookies.AccessToken; 
  console.log(token);
  if (!token){
    return res.status(401).send("Not Authentication")
  }
  jwt.verify(token,"jwtkey",(err,info)=>{
    if(err){
      return res.status(403).send("Token not verified");
    }
    console.log(info);
    const postId= req.params.id;
    const q ="delete from post where id=? and uid=?";
    db.query(q,[postId,info.id],(err,data)=>{
      if (err){
        return res.status(403).send("you cannot delete other posts")
      } 
      return res.status(200).send("post deleted");
    })
  })
 }

