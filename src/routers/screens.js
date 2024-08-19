const router = require("express").Router();
const {
  createScreen
} = require("../controllers/screens");

//Create a screen
router.post("/", createScreen);

module.exports = router;