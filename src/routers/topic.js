import express from 'express';
import { getAllTopics, addTopic, deleteTopicByName, updateTopicByName, getVocabularyByTopic } from '../controllers/topic.js';

const router = express.Router();

router.get('/', getAllTopics);
router.post('/getVocabulary', getVocabularyByTopic);
router.post('/', addTopic);
router.put('/', updateTopicByName);
router.delete('/', deleteTopicByName);


export default router;