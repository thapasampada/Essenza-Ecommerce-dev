import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from './pages/HomePage';
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Search from "./pages/Search";
import CartPage from "./pages/CartPage";
import QuizPage from "./pages/QuizPage";
import CheckoutPage from "./pages/CheckoutPage";
import FakeEsewa from "./pages/FakeEsewa";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

// User Dashboard
import Dashboard from "./pages/user/Dashboard";
import UserOrders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

// Admin Dashboard
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Products from './pages/Admin/Products';
import Users from "./pages/Admin/Users";
import AdminOrders from "./pages/Admin/AdminOrders";

// Route Guards
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/category/:slug' element={<CategoryProduct />} />
      <Route path='/search' element={<Search />} />
      <Route path='/quiz' element={<QuizPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />

      {/* Payment Pages */}
      <Route path="/fake-esewa" element={<FakeEsewa />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failure" element={<PaymentFailure />} />

      {/* Auth Pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Info Pages */}
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/policy' element={<Policy />} />

      {/* User Dashboard */}
      <Route path='/dashboard' element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<UserOrders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>

      {/* Admin Dashboard */}
      <Route path='/dashboard' element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>

      {/* 404 */}
      <Route path='*' element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;
