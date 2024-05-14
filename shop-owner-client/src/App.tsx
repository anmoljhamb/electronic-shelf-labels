import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import CartsPage from "./pages/CartsPage";
import ProductsPage from "./pages/ProductsPage";
import ViewCart from "./pages/ViewCart";
import ViewProduct from "./pages/ViewProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/carts"} />} />
        <Route path="/carts" element={<CartsPage />} />
        <Route path="/view/carts" element={<ViewCart />} />
        <Route path="/view/products" element={<ViewProduct />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
