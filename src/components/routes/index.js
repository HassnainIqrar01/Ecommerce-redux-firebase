import { Routes, Route } from "react-router-dom";
import Category from "../../pages/category";
import Search from "../../pages/hits";
import Login from "../../pages/login";
import Signup from "../../pages/signUp";
import ProductDetails from "../../pages/productDetails";
import PasswordChange from "../../pages/passwordChange";
import PasswordReset from "../../pages/passwordReset";
import AddProduct from "../products/addProduct";
import DelProduct from "../products/delProduct";

function AppRoutes() {
  return (
    <Routes>
       <Route path="/" element={<Login />}></Route>
      <Route path="/category" element={<Category />}></Route>
      <Route path="/:categoryId" element={<Category />}></Route>
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/add-product" element={<AddProduct />}></Route>
      <Route path="/del-product" element={<DelProduct />}></Route>
      <Route path="/hit" element={<Search />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route path="/change-password" element={<PasswordChange />} />
    </Routes>
  );
}
export default AppRoutes;
