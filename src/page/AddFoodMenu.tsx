import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layout/layoutside';
import { toast } from 'react-toastify';
import { requestMethod } from './requestMethod';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';

const AddFoodMenu: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    store_id: 1,
    food_name: '',
    description: '',
    price: '',
    category: ''
  });
  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' && files ? files[0] : value,
    }));
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
      } catch {
        toast.error('Image upload failed');
      }
    }
  };

  const handleRemoveImage = (image: string) => {
    setImages(images.filter((img) => img !== image));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${requestMethod}/food/create`, {
        store_id: formData.store_id,
        food_name: formData.food_name,
        food_img: images,
        price: formData.price,
        description: formData.description,
        category: formData.category,
      });
      if (response.status === 201) {
        Swal.fire({ title: 'Food added successfully', icon: 'success' });
        navigate('/foods/foodlist');
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <Layout>
      <div className="app-foodmenu container-xxl container-p-y flex-grow">
        <h4 className="py-3 mb-4">
          <span className="text-muted fw-light">Food Menu /</span> Add Food Menu
        </h4>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">Add Food Menu</h5>
              </div>
              <form className="card-body" id="myForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="imageUpload">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    accept="image/*"
                    onChange={uploadFileHandler}
                  />
                  <ul className="color-list">
                    {images.map((image, index) => (
                      <li key={index} className="color-item">
                        <span>{image}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="food_name">Food Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="food_name"
                    name="food_name"
                    placeholder="Enter food name"
                    value={formData.food_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
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
                    placeholder="Enter price"
                    value={formData.price}
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
                    placeholder="Enter category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddFoodMenu;
