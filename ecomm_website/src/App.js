import React, { useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./Page/Home";
import Cart from "./Page/Cart";
import Navbar from './components/Navbar';
import Category from './components/Category';
import { CartProvider } from './context/CartContext';
import ProductDetails from "./Page/ProductDetails";
import Payment from "./Page/Payment";
import Userroute from "./components/Userroute";
import Adminroute from "./pages/Adminroute";
import { Adminauth } from "./pages/Adminauth";
import Adminlogin from "./pages/Adminlogin";

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log("Current Path:", location.pathname);  // Debugging current path

    const adminStylesheet = "/css/bootstrap.min.css";
    const customerStylesheet = "/css/plugins.min.css";
    const adminMainStyle = "/css/kaiadmin.min.css";
    const adminDemoStyle = "/css/demo.css";

    const removeStyles = () => {
      const existingAdminStyles = document.getElementById("admin-style");
      const existingCustomerStyles = document.getElementById("customer-style");
      const existingAdminMainStyle = document.getElementById("admin-main-style");
      const existingAdminDemoStyle = document.getElementById("admin-demo-style");

      if (existingAdminStyles) existingAdminStyles.remove();
      if (existingCustomerStyles) existingCustomerStyles.remove();
      if (existingAdminMainStyle) existingAdminMainStyle.remove();
      if (existingAdminDemoStyle) existingAdminDemoStyle.remove();
    };

    // If the user is on an admin route
    if (location.pathname.startsWith("/admin")) {
      console.log("Loading Admin Styles");  // Debugging when admin styles are being loaded

      // Add the necessary stylesheets for the admin route
      if (!document.getElementById("admin-style")) {
        const linkAdminStyle = document.createElement("link");
        linkAdminStyle.id = "admin-style";
        linkAdminStyle.rel = "stylesheet";
        linkAdminStyle.href = adminStylesheet;
        document.head.appendChild(linkAdminStyle);
      }

      if (!document.getElementById("customer-style")) {
        const linkCustomerStyle = document.createElement("link");
        linkCustomerStyle.id = "customer-style";
        linkCustomerStyle.rel = "stylesheet";
        linkCustomerStyle.href = customerStylesheet;
        document.head.appendChild(linkCustomerStyle);
      }

      if (!document.getElementById("admin-main-style")) {
        const linkAdminMain = document.createElement("link");
        linkAdminMain.id = "admin-main-style";
        linkAdminMain.rel = "stylesheet";
        linkAdminMain.href = adminMainStyle;
        document.head.appendChild(linkAdminMain);
      }

      if (!document.getElementById("admin-demo-style")) {
        const linkAdminDemo = document.createElement("link");
        linkAdminDemo.id = "admin-demo-style";
        linkAdminDemo.rel = "stylesheet";
        linkAdminDemo.href = adminDemoStyle;
        document.head.appendChild(linkAdminDemo);
      }

    } else {
      console.log("Removing Admin Styles");  // Debugging when admin styles are removed
      removeStyles();
    }

    return () => {
      console.log("Cleaning up styles");  // Debugging cleanup
      removeStyles();
    };
  }, [location.pathname]);

  return (
    <CartProvider>
      <Routes>
        <Route path="/*" element={<Userroute />} />
        <Route path="/admin/*" element={
          <Adminauth>
          <Adminroute />
          </Adminauth>
          } />
        <Route path="/admin/login" element={<Adminlogin/>}/>
      </Routes>
    </CartProvider>
  );
}

export default App;
