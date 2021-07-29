const { Router } = require("express");
const { loginUser, updateUser, registerUser } = require("../controllers/userController");
const auth  = require("../middleware");

const router = Router();

router.put("/profile", auth, updateUser);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
