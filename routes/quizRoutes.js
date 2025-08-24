import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    const { answers } = req.body;

    // Build dynamic filters
    let query = {};

    // Gender filter (exact match)
    if (answers.gender) {
      query.gender = answers.gender;
    }

    // Occasion filter (partial match: e.g. "Night" should match "Night, Romantic, Luxury")
    if (answers.occasion) {
      query.occasion = { $regex: answers.occasion, $options: "i" };
    }

    // Scent Family filter (exact match)
    if (answers.scentFamily) {
      query.scentFamily = answers.scentFamily;
    }

    // Longevity filter
    if (answers.longevity) {
      query.longevity = { $regex: answers.longevity, $options: "i" };
    }

    // Tags filter (check if any quiz-selected tags appear in perfume tags)
    if (answers.tags && answers.tags.length > 0) {
      query.tags = { $in: answers.tags };
    }

    // Fetch perfumes with filters
    let recommended = await productModel.find(query).limit(5);

    // If no results, fall back to similar perfumes (so user always gets something)
    if (recommended.length === 0) {
      recommended = await productModel.find().limit(5);
    }

    res.json({ success: true, recommended });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Quiz processing failed" });
  }
});

export default router;
