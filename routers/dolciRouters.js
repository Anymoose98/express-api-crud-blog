const express = require("express");
const router = express.Router();
const dolciController = require ("../controllers/dolci.js")
const multer = require("multer");
const uploader = multer({dest: "public"});

// mostro tutti
router.get("/", dolciController.index);

// Mostro uno al dettaglio
router.get("/:slug", dolciController.show);

// Post
// router.post("/", uploader.single("image"),dolciController.create)

// Delete
router.delete("/:slug", dolciController.deleteDolce)


module.exports = router;
