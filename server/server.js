const express = require("express");
const app = express();
app.use(express.json());
require(`dotenv`).config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
