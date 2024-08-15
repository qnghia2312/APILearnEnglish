import express from 'express';
import { addQuestion, updateQuestion, getQuestionsByTopic, deleteQuestionById } from '../controllers/question';

const router = express.Router();

router.get('/', getQuestionsByTopic);
router.post('/', addQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestionById);
export default router;