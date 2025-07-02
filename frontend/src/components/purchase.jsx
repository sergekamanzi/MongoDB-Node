import { useState } from 'react';
import './purchase.css';

const Purchase = () => {
  const [formData, setFormData] = useState({
    package: '',
    checkIn: '',
    checkOut: '',
    adults: '',
    children: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Booking submitted successfully!');
        console.log('Response:', data);
        // Optional: reset form
        setFormData({
          package: '',
          checkIn: '',
          checkOut: '',
          adults: '',
          children: '',
          name: '',
          email: '',
          phone: '',
          country: '',
          city: '',
          notes: ''
        });
      } else {
        alert('❌ Failed to submit booking. Check console for errors.');
        console.error('Submission error:', data);
      }
    } catch (error) {
      alert('❌ Something went wrong. Please try again later.');
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="purchase-container">
      <h2>Booking Details</h2>
      <form onSubmit={handleSubmit} className="purchase-form">
        <label>
          Package:
          <input type="text" name="package" value={formData.package} onChange={handleChange} required />
        </label>

        <label>
          Check-in Date:
          <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
        </label>

        <label>
          Check-out Date:
          <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
        </label>

        <label>
          Number of Adults:
          <input type="number" name="adults" min="1" value={formData.adults} onChange={handleChange} required />
        </label>

        <label>
          Number of Children:
          <input type="number" name="children" min="0" value={formData.children} onChange={handleChange} />
        </label>

        <label>
          Customer Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Customer Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Customer Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Customer Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </label>

        <label>
          Customer City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>

        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
        </label>

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default Purchase;
