import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import NavBar from '../../components/navBar/NavBar';


import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
        <Header></Header>
        <NavBar></NavBar>
        <Outlet />
    </>
  );
}

export default Layout;


