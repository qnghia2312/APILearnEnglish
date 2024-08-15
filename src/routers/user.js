import express from "express";
import { getActiveUsers, getInactiveUsers, getUserByUsername, createUser, changePassword, updateUser, changeUserStatus, userLogin, forgotPassword, resetPassword } from "../controllers/user.js";

const router = express.Router();

router.get('/active', getActiveUsers); 
router.get('/inactive', getInactiveUsers); 
router.get('/getByUsername/:username', getUserByUsername); 
router.post('/login', userLogin);
router.post('/', createUser); 
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);
router.put('/changePassword', changePassword); 
router.put('/infor/:username', updateUser); 
router.put('/status/:username', changeUserStatus); 

export default router;