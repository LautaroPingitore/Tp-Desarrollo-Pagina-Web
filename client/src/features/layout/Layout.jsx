import Header from '../componennts/header/Header';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navBar/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
        <Header></Header>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
  );
}

export default Layout;