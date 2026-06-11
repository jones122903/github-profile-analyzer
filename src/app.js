const express = require("express");
const cors = require("cors");

require("dotenv").config();


// TEST ENV FILE
console.log("DB USER:", process.env.DB_USER);
console.log("DB NAME:", process.env.DB_NAME);


require("./config/database");


const app = express();


// ADD THIS HERE 👇
const routes = require("./routes/githubRoutes");



app.use(cors());

app.use(express.json());


// ADD THIS HERE 👇
app.use("/api", routes);



app.get("/",(req,res)=>{

res.json({
message:"Github Analyzer API Running"
})

});



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

console.log(
`Server running on ${PORT}`
);

});