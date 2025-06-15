// import logo from "../assets/img/gallery.png";
import { Link, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { logout } from '../../features/auth/AuthThunk'
import toast from 'react-hot-toast'

function Header() {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout()).then((action) => {
            if (logout.fulfilled.match(action)) {
                localStorage.removeItem('accessToken')
                toast.success('Logged out successfully.')
                navigate('/login')
            } else {
                toast.error('Logout failed. Please try again.')
            }
        })
    }

    return (
        <header>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex shrink-0 items-center">
                            {/* <img className="h-8 w-auto" src={logo} alt="Photega" /> */}
                            <Link to="/">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Photega"
                                />
                            </Link>
                        </div>
                        <div className="sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {auth.user ? (
                                    <>
                                        <button
                                            type="submit"
                                            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                        >
                                            Create account
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
