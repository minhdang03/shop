import { useState } from 'react';
import { useCartStore } from '../store/cart-store';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/constants';
import { IoTrashOutline } from "react-icons/io5";
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  note: string;
}

export default function Checkout() {
  useDocumentTitle('Giỏ hàng', true);
  const navigate = useNavigate();
  const cartStore = useCartStore();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });

  const totalAmount = cartStore.list.reduce(
    (sum: number, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartStore.list.length === 0) {
      alert('Giỏ hàng trống');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          items: cartStore.list.map(item => ({
            product: item.product_id,
            variant: item.variant_id,
            quantity: item.quantity
          })),
          totalAmount
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Đặt hàng thành công!');
        cartStore.clearCart();
        navigate('/');
      } else {
        alert(data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi đặt hàng');
    }
  };

  if (cartStore.list.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto pt-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Giỏ hàng của bạn</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mx-auto text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
            </div>
            
            <h2 className="text-xl font-medium text-gray-600 mb-4">
              Giỏ hàng của bạn đang trống
            </h2>
            
            <p className="text-gray-500 mb-8">
              Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
            </p>

            <div className="flex justify-center gap-4">
              <Link
                to="/nuoc-hoa-nam"
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Nước hoa nam
              </Link>
              <Link
                to="/nuoc-hoa-nu"
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Nước hoa nữ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto pt-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md order-2 lg:order-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
              {cartStore.list.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm?')) {
                      cartStore.clearCart();
                    }
                  }}
                  className="text-pink-500 hover:text-pink-700 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Xóa tất cả
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {cartStore.list.map((item) => (
                <div 
                  key={`${item.product_id}-${item.variant_id}`} 
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-24 h-24 bg-white rounded-md flex-shrink-0">
                    {item.product?.variant?.image ? (
                      <img 
                        src={item.product.variant.image} 
                        alt={item.product.name}
                        className="w-full h-full object-contain rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{item.product.name}</h3>
                        {item.product.variant && (
                          <p className="text-sm text-gray-600 mt-1">
                            Size: {item.product.variant.attributes.SIZE}
                          </p>
                        )}
                      </div>
                      <p className="font-medium text-pink-500 text-lg">
                        {(item.product.price * item.quantity).toLocaleString()} VNĐ
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cartStore.decreaseQuantity(item.product_id, item.variant_id)}
                          className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
                        >
                          -
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => cartStore.increaseQuantity(item.product_id, item.variant_id)}
                          className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => cartStore.removeFromCart(item.product_id, item.variant_id)}
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t space-y-2">
              <div className="flex justify-between items-center font-bold text-xl text-pink-600">
                <span>Tổng cộng:</span>
                <span>{totalAmount.toLocaleString()} VNĐ</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md order-1 lg:order-2">
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <p className="text-yellow-800 font-medium mb-2">
                Hiện tại chúng tôi đang nâng cấp hệ thống đặt hàng online.
              </p>
              <p className="text-yellow-700">
                Quý khách vui lòng đặt hàng qua:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-yellow-700">
                <li>Hotline: <a href="tel:0792299471" className="text-pink-600">0792299471</a></li>
                <li>Zalo: <a href="https://zalo.me/0792299471" className="text-pink-600">0792299471</a></li>
                <li>Facebook: <a href="https://www.facebook.com/pinovietnam" className="text-pink-600">Pino VN</a></li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Họ tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập họ tên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ giao hàng"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ghi chú</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ghi chú thêm về đơn hàng"
                />
              </div>

              <button 
                className="w-full bg-gray-400 text-white font-medium py-3 rounded-lg opacity-50 cursor-not-allowed"
                disabled
                title="Vui lòng liên hệ qua các kênh bên trên để đặt hàng"
              >
                Đặt hàng ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}