const express = require('express')
const path = require("path");
const cp = require("child_process");
const nodemailer = require("nodemailer");
const app = express()
const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  let pathOfIndexFile = path.join(__dirname,'index.html');
  res.sendFile(pathOfIndexFile);
})
app.get('/index.css', function(req, res) {
res.sendFile(__dirname + "/" + "index.css");
});
app.get('/index.js', function(req, res) {
res.sendFile(__dirname + "/" + "index.js");
});
let transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "singhaman2750@gmail.com", // generated ethereal user
      pass: "ztuuzqbzwcbpfhic", // generated ethereal password
    },
  });
app.get("/details/:pin/:age/:email",async function(req,res){
    let pin = req.params.pin;
    let email = req.params.email;
    let age = req.params.age;
    let arr = cp.execSync(`node script ${pin} ${age}`);
    
    console.log(arr+"");
    console.log(typeof arr);
    res.send(arr);
    let info = await transporter.sendMail({
        from: '"Aman Singh" <singhaman2750@gmail.com>', // sender address
        to:  `${email}`, // list of receivers
        subject: "Figth Against Covid", // Subject line
        html: "<b>Schedule of Vaccination</b>", // html body
        attachments:[{path:"./Schedule.xlsx"}]
      });
    
      console.log("Message sent: %s", info.messageId);
})

app.listen($port)
console.log("server is running");