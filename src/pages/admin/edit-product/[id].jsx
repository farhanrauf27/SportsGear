// pages/admin/edit-product/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSave, FiLoader, FiAlertCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  const subcategoryOptions = {
    Sports: ['Football', 'Basketball', 'Tennis', 'Cricket'],
    Clothing: ['Jerseys', 'Shorts', 'Shoes'],
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setCategory(data.category);
          setSubcategory(data.subcategory);
          setImagePreview(data.picture);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First upload the image if a new one was selected
      let imageUrl = product.picture;
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);
        
        const uploadResponse = await fetch('/api/products/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Image upload failed');
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      // Then update the product with the new image URL
      const updatedProduct = {
        name: e.target.name.value,
        category: e.target.category.value,
        subcategory: e.target.subcategory.value,
        brand: e.target.brand.value,
        price: parseFloat(e.target.price.value),
        picture: imageUrl, // Use new URL if uploaded, otherwise keep existing
      };

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        Swal.fire('Success!', 'Product updated successfully.', 'success');
        router.push('/admin/dashboard');
      } else {
        Swal.fire('Error', 'Failed to update product.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong while updating.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FiLoader className="animate-spin h-12 w-12 text-indigo-600" />
        <p className="ml-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FiAlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg"
      >
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-indigo-600 hover:underline mr-4"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Preview */}
          <div className="text-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-64 h-64 object-cover mx-auto mb-2 rounded-md border"
              />
            ) : (
              <div className="w-64 h-64 mx-auto flex items-center justify-center border-2 border-dashed rounded-md text-gray-400">
                No Image Selected
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
            <p className="text-xs text-gray-500">Image change not saved in this version</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              name="name"
              defaultValue={product?.name}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory('');
              }}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select category</option>
              <option value="Sports">Sports</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select subcategory</option>
              {subcategoryOptions[category]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              name="brand"
              defaultValue={product?.brand}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin mr-2" /> Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2" /> Save Changes
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProduct;
