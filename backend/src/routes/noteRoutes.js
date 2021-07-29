const { Router } = require("express");
const { getNoteById, getNotes, createNote, deleteNoteByID, updateNoteByID } = require("../controllers/noteController");

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/create", createNote);
router.put("/:id", updateNoteByID);
router.delete("/:id", deleteNoteByID);



module.exports = router;
