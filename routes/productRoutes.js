import express from 'express';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, updateProductController } from '../controllers/productController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController); 

//get products
router.get('/get-products', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:productId', productPhotoController)

//delete product
router.delete('/delete-product/:productId', deleteProductController);

//update product
router.put('/update-product/:productId', requireSignIn, isAdmin, formidable(), updateProductController);

//filter product
router.post('/product-filters', productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController)

export default router;