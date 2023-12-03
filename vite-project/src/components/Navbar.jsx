import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'

function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-gray-300 flex justify-between py-5 px-10 rounded-sm  ">

            <Link to={
                isAuthenticated ? "/products" : "/"
            }>
                <img src={logo} alt="Product Manager Logo" className="w-auto h-10" />
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>Welcome {user.username} </li>
                        <li>
                            <Link to='/add-products'
                            className="bg-blue-500 px-3 py-2 rounded-lg "
                            >Add Product</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() => {
                                logout();
                            }}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'
                            className="bg-indigo-200 px-4 py-1 rounded-sm"
                            >Login</Link>
                        </li>
                        <li>
                            <Link to='/register'
                            className="bg-indigo-300 px-4 py-1 rounded-sm"
                            >Register</Link>
                        </li>
                    </>
                )}
            </ul>

        </nav>
    )
}

export default Navbar;