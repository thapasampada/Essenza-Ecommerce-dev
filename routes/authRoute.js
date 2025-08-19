import express from 'express';
import { registerController, loginController,testController, forgotPasswordController, updateProfileController} from '../controllers/authController.js';
import { requireSignIn, isAdmin} from '../middlewares/authMiddleware.js';

//router object
const router = express.Router(); 

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', loginController);

//Forgot Password || METHOD POST
router.post('/forgot-password', forgotPasswordController);


//test route
router.get('/test',requireSignIn, isAdmin ,testController);

//protected router auth for user
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected router auth for admin
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put('/profile', requireSignIn, updateProfileController)

export default router;