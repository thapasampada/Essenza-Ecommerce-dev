import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  // other fields...
});

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
