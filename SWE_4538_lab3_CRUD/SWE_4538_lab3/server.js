require('dotenv').config()
const app= require("./app")

app.listen(3000, () =>{
    console.log(`Server listening port http://localhost:3000`);
})