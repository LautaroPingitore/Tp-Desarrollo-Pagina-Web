import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
        <Header></Header>
        <Navbar></Navbar>
        <Outlet> </Outlet>
        <Footer></Footer>
    </>
  );
}

export default Layout;