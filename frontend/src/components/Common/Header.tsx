// import logo from "../assets/img/gallery.png";
import { Link } from 'react-router'

function Header() {
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
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
