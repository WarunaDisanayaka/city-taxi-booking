import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import ServiceDetails from '../pages/ServiceDetails';
import CarRental from '../pages/CarRental';
import CarBooking from '../pages/CarBooking';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import Blogs from '../pages/Blogs';
import BlogDetails from '../pages/BlogDetails';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import CarBookingView from '../pages/CarBooking';
import BookingDetails from '../pages/BookingDetails';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer
import Dashboard from '../components/Admin/dashboard';
import ProtectedRoute from '../components/ProtectedRoute';


const RoutesConfig = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Navigate to="/home" />
            <Footer />
          </>
        }
      />
      <Route
        path="/home"
        element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <Header />
            <About />
            <Footer />
          </>
        }
      />
      <Route
        path="/services"
        element={
          <>
            <Header />
            <Services />
            <Footer />
          </>
        }
      />
      <Route
        path="/service-details/:id"
        element={
          <>
            <Header />
            <ServiceDetails />
            <Footer />
          </>
        }
      />
      <Route
        path="/car-listing"
        element={
          <>
            <Header />
            <CarRental />
            <Footer />
          </>
        }
      />
      <Route
        path="/car-details/:id"
        element={
          <>
            <Header />
            <CarBooking />
            <Footer />
          </>
        }
      />
      <Route
        path="/booking/:id"
        element={
          <ProtectedRoute>
            <>
              <Header />
              <CarBookingView />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <>
            <Header />
            <Products />
            <Footer />
          </>
        }
      />
      <Route
        path="/product-details/:id"
        element={
          <>
            <Header />
            <ProductDetails />
            <Footer />
          </>
        }
      />
      <Route
        path="/booking-details"
        element={
          <>
            <Header />
            <BookingDetails />
            <Footer />
          </>
        }
      />
      <Route
        path="/checkout"
        element={
          <>
            <Header />
            <Checkout />
            <Footer />
          </>
        }
      />
      <Route
        path="/blogs"
        element={
          <>
            <Header />
            <Blogs />
            <Footer />
          </>
        }
      />
      <Route
        path="/blog-details/:id"
        element={
          <>
            <Header />
            <BlogDetails />
            <Footer />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <Header />
            <SignIn />
            <Footer />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Header />
            <SignUp />
            <Footer />
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <Header />
            <Contact />
            <Footer />
          </>
        }
      />
      <Route
        path="/admin"
        element={
          <>
            <Dashboard />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <Header />
            <NotFound />
            <Footer />
          </>
        }
      />

      <Route
        path="*"
        element={
          <>
            <Header />
            <NotFound />
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

export default RoutesConfig;
