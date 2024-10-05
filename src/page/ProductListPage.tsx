import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './layout/layoutside';
import { requestMethod } from './requestMethod';
import { Link } from 'react-router-dom';
import '../css/ProductList.css';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  product_img: string[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const storeId = 1; // กำหนด store_id เป็น 1

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${requestMethod}/product/findAll/${storeId}`);
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          setError('Unable to fetch products');
        }
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [storeId]);

  // Handle search functionality
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${requestMethod}/filter/${searchKeyword}`);
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        setError('Unable to find matching products');
      }
    } catch (error) {
      setError('Error searching products');
      console.error('Error searching products:', error);
    }
  };

  // Handle product deletion with confirmation
  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${requestMethod}/delete/${productId}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product.id !== productId));
        console.log(`Product with id ${productId} deleted successfully`);
      } else {
        setError('Error deleting product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product');
    }
  };

  return (
    <Layout>
      <div className="app-ecommerce container-xxl container-p-y flex-grow">
        <h4 className="py-3 mb-4">
          <span className="text-muted fw-light">Product /</span> Product List
        </h4>

        <div className="d-flex justify-content-between mb-4">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2 search-input"
              placeholder="Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <Link to="/products/addproduct" className="btn btn-secondary">Add Product</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">Product List</h5>
              </div>
              <div className="card-body">
                {products.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Category</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>{product.category}</td>
                          <td>
                            {product.product_img.length > 0 && (
                              <img
                                src={product.product_img[0]}
                                alt={product.name}
                                style={{ width: '50px', height: '50px' }}
                              />
                            )}
                          </td>
                          <td>
                            <Link to={`/products/edit/${product.id}`} className="btn btn-warning btn-sm">Edit</Link>
                            <button 
                              className="btn btn-danger btn-sm ms-2" 
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-products text-center">
                    <h5 className="text-muted">คุณยังไม่มีสินค้าในร้านของคุณ</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
