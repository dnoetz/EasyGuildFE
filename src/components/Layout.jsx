import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./slices/authSlice";


const Layout = () => {
  const dispatch = useDispatch();
  const [ display, setDisplay ] = useState('none');
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const username = useSelector(state => state.auth.userName);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setDisplay('mobile');
      } else {
        setDisplay('desktop');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
      <nav className="flex py-3 px-5 mb-5 border-b-2 border-black">
        <p className="text-4xl">EZGuild</p>
        <ul className="flex gap-5 m-3 mx-5">
            <li className="nav-link">
                <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
                <Link to="/roster">Roster</Link>
            </li>
            <li className="nav-link">
                <Link to="/guild-logs">Guild Logs</Link>
            </li>
        </ul>
        { !isLoggedIn ? (
            <ul className="flex gap-5 m-2 grow justify-end">
                <li className="">
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li className="nav-link">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        ) : (
            <ul className="flex gap-5 m-2 grow justify-end">
                <li className="">
                    <p>Hello {username}</p>
                </li>
                <li className="nav-link">
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        )}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;