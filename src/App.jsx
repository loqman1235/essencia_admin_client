import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import CreatePage from "./pages/CreatePage";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import BrandsPage from "./pages/BrandsPage";
import BrandCreatePage from "./pages/BrandCreatePage";
import OrdersPage from "./pages/OrdersPage";
import UsersPage from "./pages/UsersPage";
import EditBrandPage from "./pages/EditBrandPage";
import EditProductPage from "./pages/EditProductPage";
import EditUserPage from "./pages/EditUserPage";
import UserCreatePage from "./pages/UserCreatePage";
import RegisterPage from "./pages/RegisterPage";
const App = () => {
  const { isLoading, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  console.log(isAuthenticated);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#FEFEFF]">
        <ClipLoader size={80} color="#4F72DF" />;
      </div>
    );
  }

  if (isAuthenticated) {
    if (location.pathname === "/login" && location.pathname === "/register") {
      return <Navigate to="/" replace />;
    }
  } else {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      return <Navigate to="/login" replace />;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<GuestRoute />}>
        <Route index element={<LoginPage />} />
      </Route>

      <Route path="/register" element={<GuestRoute />}>
        <Route index element={<RegisterPage />} />
      </Route>

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreatePage />} />
          <Route path="/products/edit/:id" element={<EditProductPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/create" element={<BrandCreatePage />} />
          <Route path="/brands/edit/:id" element={<EditBrandPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
