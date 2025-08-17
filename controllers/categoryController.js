import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const {name} =req.body;
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        }
        const existingCategory = await categoryModel.findOne({name});
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists',
            });
        }
        const category = await new categoryModel({name, slug: slugify(name)}).save();
        res.status(201).send({
            success: true,
            message: 'New category created successfully',
            category,
        });
    }catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating category',
        });
    }
};

//update category
export const updateCreateCategory = async (req, res) => {
    try {
        console.log("REQ PARAM ID:", req.params.id);
        console.log("REQ BODY:", req.body);
        const {name} = req.body;
        const {id} = req.params;

        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        }

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating category',
        });
    }
}

//get all categories
export const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'Categories fetched successfully',
            categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching categories',
        });
    }
};

//single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success: true,
            message: 'Single category fetched successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching category',
        });
    }
};

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting category',
        });
    }
};