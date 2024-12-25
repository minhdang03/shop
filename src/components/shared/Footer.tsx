export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Liên hệ</h3>
            <p className="text-gray-600">
              Hotline: 079.229.9471
              <br />
              Email: contact@pino.vn
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục</h3>
            <ul className="space-y-2">
              <li>
                <a href="/nuoc-hoa-nam" className="text-gray-600 hover:text-pink-500">
                  Nước hoa nam
                </a>
              </li>
              <li>
                <a href="/nuoc-hoa-nu" className="text-gray-600 hover:text-pink-500">
                  Nước hoa nữ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/pino.vn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500"
              >
                Facebook
              </a>
              <a 
                href="https://zalo.me/0792299471" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500"
              >
                Zalo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; 2024 PINO.VN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 