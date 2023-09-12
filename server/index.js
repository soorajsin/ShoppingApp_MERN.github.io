const express = require("express");
const app = new express();
require("./DB/Connection");
const router = require("./Routers/route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 4000;



app.get("/", (req, res) => {
          res.status(201).json({
                    error: "Server Created..."
          })
})


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(port, () => {
          console.log(`server is running on ${port}`)
})