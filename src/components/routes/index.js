import { Routes, Route } from "react-router-dom";
import Category from "../../pages/category";
import Search from "../../pages/hits";
import Login from "../../pages/login";
import Signup from "../../pages/signUp";
import ProductDetails from "../../pages/productDetails";

function AppRoutes() {
  return (
    <Routes>
       <Route path="/" element={<Login />}></Route>
      <Route path="/category" element={<Category />}></Route>
      <Route path="/:categoryId" element={<Category />}></Route>
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/hit" element={<Search />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}
export default AppRoutes;
