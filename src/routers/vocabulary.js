import express from "express";
import { deleteVocabulary, getVocabulary, getVocabularyByWord, addVocabulary, updateVocabulary } from "../controllers/vocabulary";

const router = express.Router();

router.get('/', getVocabulary);
router.get('/search' ,getVocabularyByWord);
router.post('/', addVocabulary);
router.put('/:oldWord', updateVocabulary);
router.delete('/', deleteVocabulary);

export default router;
