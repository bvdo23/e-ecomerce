import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/paymentpage.css';

const PaymentPage = () => {
  const location = useLocation();
  const { amount, price, quantity } = location.state || { amount: 0, price: 0, quantity: 1 };
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    amount: amount,
    bankCode: '',
    language: 'vn'
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneNumber: false,
    address: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate phone number
    if (name === 'phoneNumber') {
      if (!/^\d{10,}$/.test(value) && submitted) {
        setFormErrors({
          ...formErrors,
          [name]: true
        });
      } else {
        setFormErrors({
          ...formErrors,
          [name]: false
        });
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = true;
    }
    if (!formData.phoneNumber.trim() || !/^\d{10,}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = true;
    }
    if (!formData.address.trim()) {
      errors.address = true;
    }

    if (Object.keys(errors).length > 0) {
      // Set error state and prevent form submission
      setFormErrors(errors);
      setSubmitted(true); // Set submitted to true upon form submission
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/payment/create_payment_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: formData.amount,
          bankCode: formData.bankCode,
          language: formData.language
        }),
      });
      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="header clearfix">
        <h3 className="text-muted">Thanh toán đơn hàng</h3>
      </div>
      <h3>Nhập thông tin thanh toán</h3>
      <div className="table-responsive">
        <form id="createOrder" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ tên</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${formErrors.name && submitted && 'error'}`}
            />
            {formErrors.name && submitted && <p className="error-message">Please enter your name</p>}
            <label>Số điện thoại</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`form-control ${formErrors.phoneNumber && submitted && 'error'}`}
            />
            {formErrors.phoneNumber && submitted && <p className="error-message">Please enter a valid phone number (at least 10 digits)</p>}
            <label>Địa chỉ</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-control ${formErrors.address && submitted && 'error'}`}
            />
            {formErrors.address && submitted && <p className="error-message">Please enter your address</p>}
            <label>Số tiền</label>
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Chọn Phương thức thanh toán:</label>
            <div className="controls">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="bankCode"
                  value=""
                  checked={formData.bankCode === ''}
                  onChange={handleChange}
                />
                Cổng thanh toán VNPAY
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="bankCode"
                  value="PalPay"
                  checked={formData.bankCode === 'PalPay'}
                  onChange={handleChange}
                />
                Cổng thanh toán PalPay
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="bankCode"
                  value="Momo"
                  checked={formData.bankCode === 'Momo'}
                  onChange={handleChange}
                />
                Cổng thanh toán Momo
              </label>
            </div>
          </div>
          <input
            type="radio"
            name="language"
            value="vn"
            checked={formData.language === 'vn'}
            style={{ display: 'none' }}
            readOnly
          />
          <button id="btnPopup" type="submit" className="btn btn-default">
            Thanh toán
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
