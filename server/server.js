require("dotenv").config({ debug: false });
const path = require("path");
const fs = require("fs");
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

const activity = cwd.includes("01-Activities")
  ? cwd.split("/01-Activities/")[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static build (if present) BEFORE the routes so /static/* is handled by express.static
const buildPath = path.join(process.cwd(), "client", "build");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

app.use(routes);

// fallback to client index.html for single-page app routing (only if build exists)
if (fs.existsSync(buildPath)) {
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

db.once("open", () => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});

console.log("Serving static files from:", buildPath);
