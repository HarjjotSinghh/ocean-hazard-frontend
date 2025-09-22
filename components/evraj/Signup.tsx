import { useState, ChangeEvent, FormEvent } from 'react';
import './Form.css';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  designation: string;
  address: string;
  mobile: string;
}

interface FormErrors {
  confirmPassword?: string;
  mobile?: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    designation: '',
    address: '',
    mobile: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear errors when user types
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Registration submitted successfully!");
      // You can add API call here
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      designation: '',
      address: '',
      mobile: ''
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <h3>User Registration</h3>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Designation:</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="citizens">Citizens</option>
          <option value="coastal_residents">Coastal Residents</option>
          <option value="volunteers">Volunteers</option>
          <option value="disaster_managers">Disaster Managers</option>
        </select>

        <label>Address:</label>
        <textarea
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobile"
          placeholder="Enter your mobile number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

        <div className="form-buttons">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

