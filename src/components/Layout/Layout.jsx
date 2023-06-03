import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';
import css from 'components/Layout/Layout.module.css';


const Layout = () => {
   return (<>
      <header className={css.layoutHeader}>
         <nav className={css.layoutNav}>
           <NavLink to="/" className={css.layoutLink}>Home </NavLink>
           <NavLink to="/movies" className={css.layoutLink}> Movies</NavLink>
         </nav>
      </header>
      <main className={css.layoutMain}>
      <Suspense fallback={<Loader/>}>
        <Outlet />
      </Suspense>
         </main>       
  </>      
  );
};

export default Layout;