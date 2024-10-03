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
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';
import Index from '../pages/Admin/Index';
import Driver from '../pages/Driver/Driver';
import Bookings from '../pages/Driver/Bookings';
import SignInDriver from '../pages/SignInDriver';
import MyBookings from '../pages/MyBookings';
import AddPassenger from '../pages/Admin/AddPassenger';
import AddBooking from '../pages/Admin/AddBooking';
import DriverSelect from '../pages/Admin/DriverSelect';
import AdminCarBooking from '../pages/Admin/AdminCarBooking';
import AdminBookingForm from '../components/AdminBookingForm';
import AdminBookingDetails from '../pages/Admin/AdminBookingDetails';


const RoutesConfig = () => {
  return (
    <Routes>
      {/* Redirect root to home */}
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

      {/* Public Routes */}
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
        path="/signindriver"
        element={
          <>
            <Header />
            <SignInDriver />
            <Footer />
          </>
        }
      />

      {/* Protected Routes */}
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
        path="/bookings"
        element={
          <ProtectedRoute>
            <>
              <Bookings />
            </>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <>
            <Index />
          </>
        }
      />
      <Route
        path="/add-passenger"
        element={
          <>
            <AddPassenger />
          </>
        }
      />
      <Route
        path="/add-booking"
        element={
          <>
            <AddBooking />
          </>
        }
      />
      <Route
        path="/book/:id"
        element={
          <>
            <DriverSelect />
          </>
        }
      />
      <Route
        path="/admin-book/:id"
        element={
          <>
            <AdminCarBooking />
          </>
        }
      />
      <Route
        path="/admin-booking-details"
        element={
          <>
            <AdminBookingDetails />
          </>
        }
      />
      <Route
        path="/admin-booking-data"
        element={
          <>
            <AdminBookingForm />
          </>
        }
      />

      {/* Catch-all NotFound Route */}
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
