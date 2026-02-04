const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// If you want a 404 for unknown API routes:
router.use((req, res) => res.status(404).send("Not Found"));

module.exports = router;
