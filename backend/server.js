import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

const con = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection", err);
  } else {
    console.log("Connected");
  }
});

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hrpulse4546@gmail.com",
        pass: "mrnregrrayrhhzxm",
      },
    });

    const mail_configs = {
      from: "hrpulse4546@gmail.com",
      to: recipient_email,
      subject: "HRPulse Password Recovery",
      html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>CodePen - OTP Email Template</title>
              
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">HRPulse</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing HRPulse. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />HRPulse</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>HRPulse</p>
                  <p>Rishon LeZion</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

app.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const enteredPassword = req.body.password;

  const sql = "SELECT * FROM users WHERE email = ?";
  con.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Error in running query" });
    }

    if (result.length > 0) {
      const hashedPasswordFromDatabase = result[0].password;
      // Compare the entered password with the hashed password from the database
      bcrypt.compare(
        enteredPassword,
        hashedPasswordFromDatabase,
        (err, passwordMatch) => {
          if (err) {
            return res.json({
              Status: "Error",
              Error: "Error comparing passwords",
            });
          }
          if (passwordMatch) {
            const id = result[0].id;
            const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({ Status: "Success" });
          } else {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.get("/getEmployee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, address, salary } = req.body;
  const sql =
    "UPDATE employee SET name = ?, email = ?, address = ?, salary = ? WHERE id = ?";
  con.query(sql, [name, email, address, salary, id], (err, result) => {
    if (err) {
      return res.json({ Error: "Update employee error in SQL" });
    }
    return res.json({ Status: "Success" });
  });
});

app.put("/reset", (req, res) => {
  const { email, newPassword } = req.body;
  const sql = "UPDATE users SET password = ? WHERE email = ?";
  bcrypt.hash(newPassword.toString(), 10, (err, hash) => {
    if (err) {
      console.error("Error in hashing password:", err);
      return res.json({ Error: "Error in hashing password" });
    }
    con.query(sql, [hash, email], (err, result) => {
      if (err) {
        console.error("Error updating password in MySQL:", err);
        return res.json({ Error: "Error updating password in MySQL" });
      }
      return res.json({ Status: "Success" });
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete employee error in sql" });
    return res.json({ Status: "Success" });
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.post("/create", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO employee (`id`, `name`, `email`, `password`, `address`, `salary`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) {
      console.error("Error in hashing password:", err);
      return res.json({ Error: "Error in hashing password" });
    }
    const id = req.body.id || null;
    const values = [
      id,
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
    ];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        return res.json({ Error: "Error inserting data into MySQL" });
      }

      return res.json({ Status: "Success" });
    });
  });
});

app.post("/employeelogin", (req, res) => {
  const sql = "SELECT * FROM employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in runnig query" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password error" });
          if (response) {
            const token = jwt.sign(
              { role: "employee", id: result[0].id },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ Status: "Success", id: result[0].id });
          } else {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.get("/adminCount", (req, res) => {
  const sql = "Select count(id) as admin from users";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});
app.get("/employeeCount", (req, res) => {
  const sql = "Select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/salary", (req, res) => {
  const sql = "Select sum(salary) as sumOfSalary from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/adminList", (req, res) => {
  const sql = "SELECT email FROM users";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});


app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen(8081, () => {
  console.log("Running");
});
