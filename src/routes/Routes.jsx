import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import CarRental from '../pages/CarRental';
import CarBooking from '../pages/CarBooking';
import Blogs from '../pages/Blogs';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import CarBookingView from '../pages/CarBooking';
import BookingDetails from '../pages/BookingDetails';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer
import ProtectedRoute from '../components/ProtectedRoute';
import Index from '../pages/Admin/Index';
import Driver from '../pages/Driver/Driver';
import Bookings from '../pages/Driver/Bookings';
import SignInDriver from '../pages/SignInDriver';
import MyBookings from '../pages/MyBookings';


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
        path="/booking-details"
        element={
          <ProtectedRoute>

            <>
              <Header />
              <BookingDetails />
              <Footer />
            </>
          </ProtectedRoute>
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
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <>
              <Header />
              <MyBookings />
              <Footer />
            </>
          </ProtectedRoute>

        }
      />
      <Route
        path="/admin"
        element={
          <>
            <Index />
          </>
        }
      />

      <Route
        path="/driver"
        element={
          <ProtectedRoute>
            <>
              <Driver />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/signindriver"
        element={
          <>
            <Header />
            <SignInDriver />
            <Footer />
          </>
        }
      />
      <Route
        path="/bookings"
        element={
          <>
            <Bookings />
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
