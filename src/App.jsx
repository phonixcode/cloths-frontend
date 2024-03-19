import React from "react";
import LandingPage from "./view/LandingPage";
import CartPage from "./view/CartPage";
import Login from "./view/Login";
import Register from "./view/Register";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter, Route } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
