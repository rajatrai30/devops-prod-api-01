import { signup, signIn, signOut } from '#controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

// Once the user goes to /auth/api/sign-up --> call the signup controller function
router.post('/sign-up', signup);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export default router;
