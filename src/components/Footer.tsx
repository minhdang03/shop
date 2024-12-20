import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-screen bg-white/80 backdrop-blur-md shadow-sm mt-20">
            <div className="w-full max-w-[1200px] md:max-w-none md:w-[95%] lg:w-[90%] mx-auto px-4 py-2">
                <div className="py-4 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <div className="mb-2 md:mb-0">
                        <h3 className="text-lg md:text-xl font-bold text-pink-600 mb-2 md:mb-4">PINO.VN</h3>
                        <p className="text-sm md:text-base text-gray-600">
                            Chuyên cung cấp nước hoa chính hãng với mức giá tốt nhất thị trường
                        </p>
                    </div>

                    <div>
                        <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">Liên kết nhanh</h3>
                        <div className="flex flex-col space-y-1 md:space-y-2">
                            <Link to="/nuoc-hoa-nam" className="text-gray-600 hover:text-pink-500 transition-colors">
                                Nước hoa nam
                            </Link>
                            <Link to="/nuoc-hoa-nu" className="text-gray-600 hover:text-pink-500 transition-colors">
                                Nước hoa nữ
                            </Link>
                            <Link to="/checkout" className="text-gray-600 hover:text-pink-500 transition-colors">
                                Giỏ hàng
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">Thông tin liên hệ</h3>
                        <div className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-600">
                            <p>Hotline: 0792299471</p>
                            <p>Email: hello@pino.vn</p>
                            <p>Chủ shop đang kiếm thuê mặt bằng mới, chưa có địa chỉ, nhưng chúng tôi có thể ship cho bạn ở Bến Tre, Mỹ Tho, TP.HCM, còn mấy chỗ khác thì Viettel Post he.</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">© 2025 PINO.VN - Tất cả quyền được bảo lưu</p>
                    <div className="flex space-x-4 md:space-x-6">
                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                            <i className="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                            <i className="fab fa-youtube text-xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                            <i className="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
