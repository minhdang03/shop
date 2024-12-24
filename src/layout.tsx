import {Link, Outlet} from "react-router-dom";
import React, {useState} from "react";
import {useCartStore} from "./store/cart-store";
import Footer from "./components/Footer";
    
export default function Layout() {
    const cartStore = useCartStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Thêm effect để theo dõi scroll
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) { // 40px là chiều cao của phần hotline
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
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

            {/* Navigation - Thêm điều kiện cho top */}
            <nav className={`w-full fixed ${isScrolled ? 'top-0' : 'top-6'} left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 transition-all duration-200`}>
                <div className="w-full max-w-[1200px] md:max-w-none md:w-[95%] lg:w-[90%] mx-auto">
                    <div className="flex justify-between items-center py-4">
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
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 hover:bg-pink-100 focus:outline-none transition-colors hover:rounded-lg"
                            >
                                <svg className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen 
                                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    }
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="flex flex-col space-y-2 pb-4">
                            <Link to="/nuoc-hoa-nam" className="py-2 px-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 hover:rounded-lg transition duration-300">
                                Nước hoa nam
                            </Link>
                            <Link to="/nuoc-hoa-nu" className="py-2 px-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 hover:rounded-lg transition duration-300">
                                Nước hoa nữ
                            </Link>
                            <Link to="/checkout" className="py-2 px-3 text-white bg-pink-500 hover:bg-pink-600 hover:rounded-lg transition duration-300 flex items-center justify-between">
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
            <main className="w-screen mt-16">
                <div className="w-full max-w-[1200px] md:max-w-none md:w-[95%] lg:w-[90%] mx-auto px-4">
                    <Outlet/>
                </div>
            </main>
            <Footer/>       
        </div>
    );
}