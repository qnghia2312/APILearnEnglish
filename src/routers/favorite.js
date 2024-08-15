import express from 'express';
import { addFavorite, deleteFavorite, getFavoritesByUsername } from '../controllers/favorite.js';

const router = express.Router();

router.post('/add', addFavorite); // POST /api/favorite/add
router.post('/delete', deleteFavorite); // DELETE /api/favorite/delete  thay thành post để sử dụng trong android
router.get('/:username', getFavoritesByUsername) // GET /api/favorite/:username

export default router;