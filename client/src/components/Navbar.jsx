import { Link, useNavigate } from 'react-router-dom';
import {logout} from '../features/auth/authSlice'
import { useDispatch } from 'react-redux';

const Navbar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userToken = !!localStorage.getItem('userToken');

  const handleSignOut = () => {
    // localStorage.removeItem('userToken');
    dispatch(logout());
    window.location.reload();
    navigate('/login');

  }

  return (
    <nav className="bg-gray-800 shadow sticky top-0 z-10">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={userToken ? '/dashboard' : '/'} className="text-white text-xl font-semibold">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center">
            {
              userToken ? (
                <>
                  <Link to={'/profile'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                  <li className='list-none text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' >
                    <button onClick={handleSignOut}>Sign Out</button>
                    {/* <button onClick={}>Sign Out</button> */}
                  </li>

                </>
              ) :
                (
                  <>
                    <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                    <Link to="/sign-up" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                  </>
                )
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;