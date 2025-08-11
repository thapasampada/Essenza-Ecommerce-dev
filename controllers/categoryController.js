import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// Create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    // Check if category already exists by slug
    const existingCategory = await categoryModel.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({ // Changed to 400, because category already exists is an error here
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({ name, slug }).save();

    res.status(201).json({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || error,
      message: "Error creating category",
    });
  }
};

// Update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name, { lower: true, strict: true }) },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || error,
      message: "Error while updating category",
    });
  }
};

// Get all categories
export const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    // IMPORTANT: your frontend expects "category" not "categories"
    // so change the key from categories to category for consistency
    res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      category: categories, // changed from categories to category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || error,
      message: "Error while getting all categories",
    });
  }
};

// Get single category by slug
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single category fetched successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || error,
      message: "Error while getting single category",
    });
  }
};

// Delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || error,
      message: "Error while deleting category",
    });
  }
};
