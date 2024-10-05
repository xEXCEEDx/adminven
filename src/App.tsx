import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DashboardsPage from './page/DashboardsPage';
import OrderListPage from './page/OrderListPage';
import EditProductPage from './page/Editproduct';
import AddProductPage from './page/Addproduct';// ตรวจสอบการนำเข้าให้ถูกต้อง
import ProductListPage from './page/ProductListPage';
import AddFoodMenu from './page/AddFoodMenu';
import FoodList from './page/FoodListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboards" element={<DashboardsPage />} />
        <Route path="/shop/productlist" element={<ProductListPage />} />
        <Route path="/shop/addproduct" element={<AddProductPage />} />
        <Route path="/orders/orderlist" element={<OrderListPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/foodmenu/addfoodmenu" element={<AddFoodMenu />} />
    <Route path="/foodmenu/foodlist" element={<FoodList />} />
        
      </Routes>
    </Router>
  );
}

export default App;
