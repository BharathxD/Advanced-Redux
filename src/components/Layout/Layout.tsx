import { Fragment } from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
