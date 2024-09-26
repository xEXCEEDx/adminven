import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/OrderList.css';
import Layout from './layout/layoutside';

interface Order {
  id: number;
  userId: number;
  status: string;
  total: number;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId: number) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
        setOrders(orders.filter(order => order.id !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="container">
        <h4 className="my-4">Orders/List</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.status}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <Link to={`/orders/${order.id}`}>
                    <button className="btn btn-primary me-2">Details</button>
                  </Link>
                  <button className="btn btn-warning me-2">Change Status</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrderPage;
