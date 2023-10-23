import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CustomNav from "./components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/users/Dashboard";
import Home from "./pages/users/Home";
import UserProvider from "./context/UserProvider";
import Order from "./pages/users/Order";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import Profile from "./pages/users/Profile";
import AddCategory from "./pages/admin/AddCategory";
import ViewProducts from "./pages/admin/ViewProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import ViewCategories from "./pages/admin/ViewCategories";
import PageStore from './pages/users/StorePage';
import ProductView from "./pages/users/ProductView";
import CategoryStorePage from "./pages/users/CategoryStorePage";
import CartProvider from "./context/CartProvider";
import Loading from "./components/Loading";
import useLoader from "./hooks/useLoader";

function App() {

  const loading = useLoader()

  return (
    <UserProvider>
      <CartProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-center" theme="dark" />
        <CustomNav />
        <Loading show={loading}/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/store" element={<PageStore/>}></Route>
          <Route path="store/product/:productId" element={<ProductView/>}/>
          <Route path="store/:categoryId/:categoryTitle" element={<CategoryStorePage/>}/>

          {/* User Specific Route */}
          <Route path="/users" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile/>}/>
            <Route path="about" element={<About />} />
            <Route path="orders" element={<Order />} />
          </Route>

            {/* Admin Specific Route */}
          <Route path="/admin" element={<AdminDashboard/>}>
             <Route path="home" element={<AdminHome />} />
             <Route path="add-product" element={<AddProduct />} />
             <Route path="add-category" element={<AddCategory />} />
             <Route path="categories" element={<ViewCategories />} />
             <Route path="products" element={<ViewProducts />} />
             <Route path="orders" element={<AdminOrders />} />
             <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
      </UserProvider>
  );
}

export default App;
