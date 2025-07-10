// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Sports', 'Clothing'],
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const subcategories = {
          Sports: ['Football', 'Basketball', 'Tennis', 'Cricket'],
          Clothing: ['Jerseys', 'Shorts', 'Shoes'],
        };
        return subcategories[this.category]?.includes(value);
      },
      message: props => `${props.value} is not a valid subcategory for ${props.instance.category}`,
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  picture: {
    type: String,
    required: true,
  },
  });


export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
