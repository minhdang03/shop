import { useState } from 'react';
import { useCartStore } from '../store/cart-store';
import { useNavigate } from 'react-router-dom';
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
  useDocumentTitle('Giỏ hàng');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md order-2 lg:order-1">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Thông tin đơn hàng</h2>
            
            <div className="max-h-[400px] overflow-y-auto mb-6 pr-2">
              {cartStore.list.map((item) => (
                <div key={`${item.product_id}-${item.variant_id}`} 
                     className="flex items-center gap-4 py-4 border-b last:border-b-0 hover:bg-gray-50 rounded-lg p-3">
                  <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0">
                    {item.product?.variant?.image ? (
                      <img 
                        src={item.product.variant.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <img 
                        src="/images/Unknown.jpg"
                        alt="Default product image"
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium text-lg">{item.product.name}</h3>
                      <p className="font-medium text-blue-600">
                        {(item.product.price * item.quantity).toLocaleString()} VNĐ
                      </p>
                    </div>
                    
                    {item.product.variant && (
                      <p className="text-sm text-gray-600 mt-1">
                        Phân loại: {item.product.variant.attributes.SIZE}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border rounded-md bg-white">
                        <button
                          onClick={() => cartStore.updateQuantity({
                            product_id: item.product_id,
                            variant_id: item.variant_id,
                            quantity: item.quantity - 1
                          })}
                          className="px-3 py-1 hover:bg-gray-100 rounded-l-md"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => cartStore.updateQuantity({
                            product_id: item.product_id,
                            variant_id: item.variant_id,
                            quantity: item.quantity + 1
                          })}
                          className="px-3 py-1 hover:bg-gray-100 rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => cartStore.delete({
                          product_id: item.product_id,
                          variant_id: item.variant_id
                        })}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <IoTrashOutline size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between items-center text-lg">
                <span>Tạm tính:</span>
                <span>{totalAmount.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex justify-between items-center font-bold text-xl text-blue-600">
                <span>Tổng cộng:</span>
                <span>{totalAmount.toLocaleString()} VNĐ</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md order-1 lg:order-2">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Thông tin giao hàng</h2>
            
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
                type="submit"
                disabled={!formData.phone || cartStore.list.length === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-lg mt-6"
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