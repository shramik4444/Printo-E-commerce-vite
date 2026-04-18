import { Routes, Route, Navigate } from 'react-router-dom';



// import Breadcrumbs from './components/Breadcrumbs';
// import Header from './components/Header';

import Home from './Pages/Home';
import Login from './Pages/Login';
import EditProduct from "./Admin/Products/EditProduct";
import AddProduct from './Admin/Products/AddProduct';
import ApparelProductPage from './Pages/Apparel/ApparelProductPage';
import CorporateGiftsView from './Pages/CorporateGifts/CorporateGiftsView';
import ProductPage from './Pages/CorporateGifts/ProductPage';
import Dashboard from './Admin/Dashboard';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import AdminRoute from './Admin/AdminRoute';
import ProductList from './Admin/Products/ProductList';
import AllProducts from './Pages/Apparel/AllProducts/AllProducts';
import Cart from './Cart/Cart';

function App() {
  return (

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/apparel/products" element={<AllProducts />} />
      <Route path="/apparel/products/:id" element={<ApparelProductPage />} />
      <Route path="/corporate-gifts" element={<CorporateGiftsView />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />

      {/* Admin Login */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Protected Admin */}
      <Route path="/admin/*" element={<AdminRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>

    </Routes>






  );
}

export default App;





{/* 
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/apparel/products' element={<AllProducts />} />
      <Route path="/apparel/products/:id" element={<ApparelProductPage />} />
      <Route path="/corporate-gifts" element={<CorporateGiftsView />} />
      <Route path="/ProductPage" element={<ProductPage />} />

      <Route path='/cart' element={<Cart />} />



      <Route path="/admin" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminRoute />}>


        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} /> */}







