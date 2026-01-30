import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "sku is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: 0.0,
    },
    costPrice: {
      type: Number,
      required: [true, "costPrice is required"],
      min: 0.0,
    },
    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: 0,
    },
    minStock: {
      type: Number,
      required: [true, "minStock is required"],
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DISCONTINUED"],
      default: "ACTIVE",
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model("Product", ProductSchema);
