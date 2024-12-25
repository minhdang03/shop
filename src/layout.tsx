import {Link, Outlet} from "react-router-dom";
import React, {useState, useRef, useEffect} from "react";
import {useCartStore} from "./store/cart-store";
import Footer from "./components/Footer";

export default function Layout() {
    const cartStore = useCartStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isMenuOpen && 
                menuRef.current && 
                buttonRef.current && 
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen w-full">
            {/* Hotline */}
            <div className="w-full bg-gradient-to-r from-pink-400 to-pink-500">
                <div className="w-full max-w-[1200px] md:max-w-none md:w-[95%] lg:w-[90%] mx-auto">
                    <div className="w-full flex justify-end px-8 py-1 text-sm text-white">
                        Hotline: 0792299471
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={`w-full fixed ${isScrolled ? 'top-0' : 'top-6'} left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 transition-all duration-200`}>
                <div className="w-full max-w-[1200px] md:max-w-none md:w-[95%] lg:w-[90%] mx-auto">
                    <div className="flex justify-between items-center py-3">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
                                PINO.VN
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/nuoc-hoa-nam" className="py-2 px-3 text-gray-700 hover:text-pink-500 transition duration-300">
                                Nước hoa nam
                            </Link>
                            <Link to="/nuoc-hoa-nu" className="py-2 px-3 text-gray-700 hover:text-pink-500 transition duration-300">
                                Nước hoa nữ
                            </Link>
                            <Link to="/checkout" className="py-2 px-4 text-white bg-pink-500 hover:bg-pink-600 transition duration-300 hover:rounded-lg flex items-center">
                                Giỏ hàng 
                                <span className="ml-2 bg-white text-pink-500 px-2 py-1 text-xs font-medium hover:rounded-lg">
                                    {cartStore.getTotalItems()}
                                </span>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button 
                            ref={buttonRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-pink-100 focus:outline-none transition-colors hover:rounded-lg"
                        >
                            <svg className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen 
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div 
                        ref={menuRef}
                        className={`md:hidden absolute w-full left-0 bg-white shadow-lg transition-all duration-200 ease-in-out ${
                            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                    >
                        <div className="flex flex-col space-y-1 p-3">
                            <Link 
                                to="/nuoc-hoa-nam" 
                                className="py-2 px-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 hover:rounded-lg transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Nước hoa nam
                            </Link>
                            <Link 
                                to="/nuoc-hoa-nu" 
                                className="py-2 px-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 hover:rounded-lg transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Nước hoa nữ
                            </Link>
                            <Link 
                                to="/checkout" 
                                className="py-2 px-3 text-white bg-pink-500 hover:bg-pink-600 hover:rounded-lg transition duration-300 flex items-center justify-between"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Giỏ hàng 
                                <span className="bg-white text-pink-500 px-2 py-1 text-xs font-medium hover:rounded-lg">
                                    {cartStore.getTotalItems()}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="w-screen mt-14 bg-gradient-to-b from-pink-50/50 to-white">
                <div className="w-full max-w-[1200px] md:max-w-none md:w-[95%] lg:w-[90%] mx-auto px-4">
                    <Outlet/>
                </div>
            </main>
            <Footer/>       
        </div>
    );
}