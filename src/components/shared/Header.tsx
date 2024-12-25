export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <a href="/" className="text-xl font-bold text-pink-500">
              PINO.VN
            </a>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/nuoc-hoa-nam" className="text-gray-600 hover:text-pink-500">
              Nước hoa nam
            </a>
            <a href="/nuoc-hoa-nu" className="text-gray-600 hover:text-pink-500">
              Nước hoa nữ
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
} 