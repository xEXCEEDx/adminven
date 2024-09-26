import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DashboardsPage from './page/DashboardsPage';
// import ProductPage from './page/ProductListPage';
import OrderListPage from './page/OrderListPage';
import EditPage from './page/EditPage';
import AddProductPage from './page/Addproduct';
import ProductListPage from './page/ProductListPage';


function App() {
  return (
    <Router>

            <Routes>
              <Route path="/dashboards" element={<DashboardsPage />} />
              <Route path="/products/productlist" element={<ProductListPage />} />
              <Route path="/products/addproduct" element={<AddProductPage />} />
              
              <Route path="/orders/orderlist" element={<OrderListPage />} />
              <Route path="/edit-page" element={<EditPage />} />
              
            </Routes>
       
    </Router>
  );
}

export default App;