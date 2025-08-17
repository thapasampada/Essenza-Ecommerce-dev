import express from 'express';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCreateCategory } from '../controllers/categoryController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router();

//routes
//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCreateCategory)

//get all categories
router.get('/get-categories', categoryController);

//single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;