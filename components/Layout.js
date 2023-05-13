import NavHeader from "./NavHeader";
import { Shantell_Sans } from "next/font/google";


const shantell = Shantell_Sans({ subsets: ["latin"], weight: "400" });

const Layout = ({ children }) => {
  return (
    <div className={shantell.className}>
      <NavHeader />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
