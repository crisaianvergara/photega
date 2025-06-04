import React from "react";
import logo from "../assets/img/gallery.png";


function Header () {
    return (
        <header>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex shrink-0 items-center">
                            <img className="h-8 w-auto" src={logo} alt="Photega" />
                        </div>
                        <div className="sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <a href="#" className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Sign In</a>
                                <a href="#" className="rounded-md p-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Create account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;