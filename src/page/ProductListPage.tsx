import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ProductList.css'; // Import custom CSS file
import Layout from './layout/layoutside';

interface Product {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  status: string;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      // Replace with your API call
      const response = await fetch(`/api/products?page=${currentPage}&search=${searchKeyword}`);
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, [currentPage, searchKeyword]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  return (
    <Layout>
    <div className="container ">
      <div className="header mb-4">
        <h1 className="display-4 text-center">Product List</h1>
        <div className="d-flex justify-content-between">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <Link to="/products/addproduct" className="btn btn-secondary">Add Product</Link>
        </div>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card product-card">
              <img src={`/uploads/${product.imgUrl}`} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/edit-product/${product.id}`} className="btn btn-primary btn-sm">Edit</Link>
                  <button className="btn btn-danger btn-sm">Delete</button>
                  <span className={`badge ${product.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>{product.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
      </Layout>
  );
};

export default ProductListPage;
