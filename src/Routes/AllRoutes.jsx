import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";
import forum from "../pages/forum";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/forum"
        element={
          <PrivateRoute>
            <forum />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
