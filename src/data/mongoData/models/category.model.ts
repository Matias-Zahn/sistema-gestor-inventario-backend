import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  parentId: {
    type: String,
    required: false,
  },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
