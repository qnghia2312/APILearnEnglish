import express from 'express';
import { getHistoryByType, addHistory } from "../controllers/history.js"

const router = express.Router();

router.get('/', getHistoryByType);
router.post('/', addHistory);
 
export default router;