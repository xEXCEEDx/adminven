import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import '../css/AddProduct.css';
import Layout from './layout/layoutside';
import axios from "axios";
import { requestMethod } from './requestMethod';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    store_id: 1,
    name: '',
    detail: '',
    price: '',
    stock: '',
    category: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('');
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${requestMethod}/product/${id}`);
        setFormData(response.data);
        setImages(response.data.product_img);
        setColors(response.data.product_more);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product data');
      }
    };

    fetchProduct();
  }, [id]); // เรียกใช้ useEffect เมื่อ id เปลี่ยนแปลง

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' && files ? files[0] : value,
    }));
  };

  const handleAddColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor('');
    }
  };

  const handleRemoveColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleRemoveImage = (image: string) => {
    setImages(images.filter((c) => c !== image));
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      try {
        const { data } = await axios.post(`${requestMethod}/uploadFile`, bodyFormData);
        setImages([...images, data.secure_url]);
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Image upload failed', error);
        toast.error('Image upload failed');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${requestMethod}/product/update/${id}`, {
        store_id: formData.store_id,
        name: formData.name,
        product_img: images,
        product_more: colors,
        price: formData.price,
        detail: formData.detail,
        stock: formData.stock,
        category: formData.category,
      });
      if (response.status === 200) {
        Swal.fire({ title: 'Product updated successfully', icon: 'success' });
        navigate('/products/productlist'); // เปลี่ยนเส้นทางไปยังหน้ารายการสินค้า
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <Layout>
      <div className="app-ecommerce container-xxl container-p-y flex-grow">
        <h4 className="py-3 mb-4">
          <span className="text-muted fw-light">Product /</span> Edit Product
        </h4>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">Edit Product Details</h5>
              </div>
              <form className="card-body form-about" id="myForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="imageUpload">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    accept="image/*"
                    onChange={uploadFileHandler}
                  />
                  <ul>
                    {images.map((image, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{image}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="bg-red-500 text-white py-2 px-4 mt-2 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="detail">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="detail"
                    name="detail"
                    placeholder="Enter product description"
                    value={formData.detail}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Enter product price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    placeholder="Enter stock quantity"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="category">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    placeholder="Enter product category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Additional Colors</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                    />
                    <button type="button" onClick={handleAddColor} className="btn btn-success ms-2">
                      Add
                    </button>
                  </div>
                  <ul className="mt-2 color-list">
                    {colors.map((color, index) => (
                      <li key={index} className="color-item">
                        {color}
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(color)}
                          className="btn btn-danger ms-2"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProductPage;
