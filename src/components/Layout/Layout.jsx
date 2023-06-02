import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
   return (<>
      <header>
         <nav>
           <NavLink to="/">Home </NavLink>
           <NavLink to="/movies"> Movies</NavLink>
         </nav>
      </header>
      <main>
         <Outlet/>
         </main>       
  </>      
  );
};

export default Layout;