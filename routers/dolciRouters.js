const express = require("express");
const router = express.Router();
const multer = require("multer");
const dolciController = require ("../controllers/dolci.js")

// mostro tutti
router.get("/", dolciController.index);
// Mostro uno al dettaglio
router.get("/:slug", dolciController.show);
// Post
// Delete

module.exports = router;
