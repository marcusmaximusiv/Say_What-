var router = require("express").Router();
var viewRoutes = require("./view");

router.use("/", viewRoutes);

module.exports = router;