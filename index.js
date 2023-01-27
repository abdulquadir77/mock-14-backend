const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const connection = require("./Config/db");
const UserModel = require("./Models/user.model");

app.get("/", (req, res) => {
  res.send("WELCOME TO MOCK  14");
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    console.log("Somthing wrong in get method");
  }
});

app.post("/usercreate", async (req, res) => {
  let { name, difficulty } = req.body;
  try {
    const user = new UserModel({ name, difficulty });
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.send("User not created");
  }
});

app.listen("2644", async () => {
  try {
    await connection;
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.log("SOMTHING WRONG IN CONNECTION");
    console.log(error);
  }

  console.log("Litening On PORT 2644");
});
