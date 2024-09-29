import React from 'react';

import Routes from '../routes/Routes';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';

import Cart from '../components/Cart';

const Layout = () => {
  const cartUi = useSelector(state => state.cartUi.cartIsVisible);
  return (
    <div>
      <div>
        <Routes />
      </div>
    </div>
  );
};

export default Layout;
