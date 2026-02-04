const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

const buildPath = path.join(__dirname, "../../client/build");

if (fs.existsSync(buildPath)) {
  router.use((req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  router.use((req, res) => res.status(404).send("Not Found"));
}
module.exports = router;
