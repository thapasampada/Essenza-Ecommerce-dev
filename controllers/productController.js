import slugify from "slugify";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";
import fs from "fs";
import categoryModel from '../models/categoryModel.js'

export const createProductController = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            fragranceTop,
            fragranceMiddle,
            fragranceBase,
            scentFamily,
            gender,
            longevity,
            occasion,
            quantity,
            tags,
            shipping
        } = req.fields;

        
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(400).send({ success: false, message: "Name is required" });
            case !description:
                return res.status(400).send({ success: false, message: "Description is required" });
            case !price:
                return res.status(400).send({ success: false, message: "Price is required" });
            case !category:
                return res.status(400).send({ success: false, message: "Category is required" });
            case !quantity:
                return res.status(400).send({ success: false, message: "Quantity is required" });
            case !photo || photo.size > 1000000:
                return res.status(400).send({ success: false, message: "Photo is required and should be less than 1MB" });
        }

        // Build fragranceNotes from flat fields
        const fragranceNotes = {
            top: fragranceTop ? fragranceTop.split(",").map(s => s.trim()) : [],
            middle: fragranceMiddle ? fragranceMiddle.split(",").map(s => s.trim()) : [],
            base: fragranceBase ? fragranceBase.split(",").map(s => s.trim()) : []
        };

        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];


        // Create product
        const product = new productModel({
            ...req.fields,
            fragranceNotes,
            slug: slugify(name),
            tags: tagsArray
        });

        // Attach photo
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error: error.message
        });
    }
};

// Get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalcount : products.length,
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching products",
            error: error.message
        });
    }
};

//Get single product
export const getSingleProductController = async (req, res) => {
    try{
        const product = await productModel.findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single product fetched successfully",
            product
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching single product",
            error: error.message
        }); 
    }
}

// Get product photo
export const productPhotoController = async (req, res) => {
    try{
        const product = await productModel.findById(req.params.productId).select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching product photo",
            error: error.message
        });
    }
}

//delete product
export const deleteProductController = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.params.productId).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch(error){
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting product",
            error: error.message
        });
    }
}

//update product
export const updateProductController = async (req, res) => {
     try {
    const {
      name,
      description,
      price,
      category,
      fragranceTop,
      fragranceMiddle,
      fragranceBase,
      scentFamily,
      gender,
      longevity,
      occasion,
      quantity,
      tags,
      shipping,
    } = req.fields;
    const { photo } = req.files;

    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID format",
      });
    }

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ success: false, message: "Name is required" });
      case !description:
        return res.status(400).send({ success: false, message: "Description is required" });
      case !price:
        return res.status(400).send({ success: false, message: "Price is required" });
      case !category:
        return res.status(400).send({ success: false, message: "Category is required" });
      case !quantity:
        return res.status(400).send({ success: false, message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ success: false, message: "Photo should be less than 1MB" });
    }

    const fragranceNotes = {
    top: fragranceTop ? fragranceTop.split(",").map(s => s.trim()) : [],
    middle: fragranceMiddle ? fragranceMiddle.split(",").map(s => s.trim()) : [],
    base: fragranceBase ? fragranceBase.split(",").map(s => s.trim()) : []
    };

    const tagsArray = tags ? tags.split(",").map(s => s.trim()) : [];

    const updateData = {
    ...req.fields,
    slug: slugify(name),
    fragranceNotes,
    tags: tagsArray
    };

    let product = await productModel.findById(req.params.productId);
    if (!product) {
        return res.status(404).send({ success: false, message: "Product not found" });
    }

    // Update fields
    Object.assign(product, updateData);

    // Attach photo if uploaded
    if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
    }

    // Save once
    await product.save();

    res.status(200).send({
        success: true,
        message: "Product updated successfully",
        product
});

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error: error.message,
    });
  }
}

//filters
export const productFiltersController = async (req,res) =>{
    try{
        const {checked, radio} = req.body
        let args = {}
            if(checked.length > 0) args.category = checked
            if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
            const products = await productModel.find(args)
            res.status(200).send({
                success: true,
                products,
            })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while filtering products',
            error,
        })
    }
}

//product count
export const productCountController = async (req,res) => {
    try{
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in product count',
            error,
        })
    }
}

//product list based on page
export const productListController = async (req,res) => {
    try{
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page-1) * perPage).limit(perPage).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            products,
        })
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in per page controller',
            error,
        })
    }
}

//search product
export const searchProductController = async (req,res) => {
    try{
        const {keyword} = req.params
        const results = await productModel.find({
            $or:[
                {name:{$regex : keyword, $options:"i"}},
                {description:{$regex : keyword, $options:"i"}},
            ],
        }).select("-photo")
        res.json(results);

    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in search product API',
            error,
        })
    }
}

//silmilar products
export const relatedProdcutController = async (req,res) =>{
    try{
        const {pid, cid} =req.params
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success: true,
            products,
        })
    }catch{error}{
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in search product API',
            error,
        })
    }
}

//get product by category
export const productCategoryController = async (req,res) => {
    try{
        const category = await categoryModel.findOne({slug: req.params.slug})
        const products = await productModel.find({category}).populate("category")
        res.status(200).send({
            success: true,
            category,
            products
        })
    }
    catch{error}{
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while getting category wise product',
            error,
        })
    }
}