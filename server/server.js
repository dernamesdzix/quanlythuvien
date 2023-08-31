const express = require("express");
const app = express();
app.use(express.json());
require(`dotenv`).config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/reports", reportRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
