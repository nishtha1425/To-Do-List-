
const express =  require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy groceries", "Complete Module", "Buy stationary"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    
    let day = date();

        res.render("list.ejs", {
            listTitle: day,
            newListItem: items
        });

    
});

app.get("/work", function(req, res){

    res.render("list.ejs", {
        listTitle: "Work List",
        newListItem: workItems
    });
});


app.post("/", function(req, res){

    let item = req.body.newItem;

    if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    };
});


app.listen(process.env.PORT || 3000, function(){
    console.log("server started on port 3000");
});
