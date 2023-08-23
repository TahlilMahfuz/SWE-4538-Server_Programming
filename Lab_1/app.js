const express=require("express");
const app = express();

// app.get("/", async (req,res) => {
//     res.send("Hello world!");
// });


app.get("/",(req,res) =>{
    res.sendFile("S:/SWE_STUDIES/Fifth Semeester/Server Programming Lab/Lab_01/index.html");
})
app.get("/contact_us", async (req,res) => {
    res.send("We are in contact us");
});
app.get("/show_name", async (req,res) => {
    res.send("My name is Tahlil.");
});

//Send a file to client
app.get("/show_file", async (req,res) => {
    res.send("My name is Tahlil.");
});




const port=3000;

app.listen(port, () =>{
    console.log(`Server listening port http://localhost:${port}`);
})

