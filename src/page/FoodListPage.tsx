import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './layout/layoutside';
import { requestMethod } from './requestMethod';
import { Link } from 'react-router-dom';
import '../css/FoodList.css';

interface Food {
  id: number;
  food_name: string;
  price: number;
  category: string;
  food_img: string[];
}

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const storeId = 1;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${requestMethod}/food/findAll/${storeId}`);
        if (response.status === 200) {
          setFoods(response.data);
        } else {
          setError('Unable to fetch foods');
        }
      } catch {  // แก้ไขตรงนี้
        setError('Error fetching foods');
      }
    };

    fetchFoods();
  }, [storeId]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${requestMethod}/filterFood/${searchKeyword}`);
      if (response.status === 200) {
        setFoods(response.data);
      } else {
        setError('Unable to find matching foods');
      }
    } catch  {  // แก้ไขตรงนี้
      setError('Error searching foods');
    }
  };

  const handleDelete = async (foodId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this food?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${requestMethod}/deleteFood/${foodId}`);
      if (response.status === 200) {
        setFoods(foods.filter(food => food.id !== foodId));
      } else {
        setError('Error deleting food');
      }
    } catch  {  // แก้ไขตรงนี้
      setError('Error deleting food');
    }
  };

  return (
    <Layout>
      <div className="app-foodlist container-xxl container-p-y flex-grow">
        <h4 className="py-3 mb-4">
          <span className="text-muted fw-light">Food Menu /</span> Food List
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
          <Link to="/foodmenu/addfoodmenu" className="btn btn-secondary">Add Food</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">Food List</h5>
              </div>
              <div className="card-body">
                {foods.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foods.map((food, index) => (
                        <tr key={food.id}>
                          <th>{index + 1}</th>
                          <td>{food.food_name}</td>
                          <td>{food.price}</td>
                          <td>{food.category}</td>
                          <td>
                            {food.food_img.length > 0 && (
                              <img src={food.food_img[0]} alt={food.food_name} style={{ width: '50px', height: '50px' }} />
                            )}
                          </td>
                          <td>
                            <Link to={`/foods/edit/${food.id}`} className="btn btn-warning btn-sm">Edit</Link>
                            <button
                              className="btn btn-danger btn-sm ms-2"
                              onClick={() => handleDelete(food.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-foods text-center">
                    <h5 className="text-muted">No foods found</h5>
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

export default FoodList;
