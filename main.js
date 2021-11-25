const express = require('express');
const app = express();
const port = 3000
const readFile = require("./util/readFile");
const writeFile = require("./util/writeFile");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }))

app.get('/', (req, res) => {
    res.render("home");
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.route("/signup").post(function (req, res) {
    const { username, password, name, mobile } = req.body;
    readFile('./db.txt', function (err, data) {
        if (err) {
            res.render("signup", { error: "Something went Wrong!" });
            return
        }
        let users = [];
        if (data.length > 0) {
            users = JSON.parse(data);
        }
        users.push({
            username,
            password,
            name,
            mobile
        });
        writeFile("./db.txt", JSON.stringify(users), function (err) {
            if (err) {
                res.render("signup", { error: "Server caught fire!" });
                return
            }
            res.redirect("/home");
        })
    })
})
.get(function(req,res){
    res.render("signup");
})

app.get("/home", function (req, res) {
    res.render("LandingPage");
})

app.listen(port, () => {
    console.log(`E-Commerce app listening at http://localhost:${port}`)
})