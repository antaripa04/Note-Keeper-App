const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");

const auth = require("../middleware");

router.use("/users", userRoutes);
router.use("/notes", auth, noteRoutes);


module.exports = router;
