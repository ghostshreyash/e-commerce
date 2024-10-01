import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

function Signup() {
  const [usernameTaken, setUsernameTaken] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: (values) => {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Check if the username is already taken
      const isUsernameTaken = existingUsers.some(user => user.username === values.username);

      if (isUsernameTaken) {
        setUsernameTaken(true);
      } else {
        const newUser = {
          username: values.username,
          email: values.email,
          password: values.password
        };

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        alert('Sign up successful! You can now log in.');

        // Navigate to login page after successful sign up
        navigate('/login');
      }
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500"
          />
          {touched.username && errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          {usernameTaken && <p className="text-red-500 text-sm">Username is already taken</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500"
          />
          {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500"
          />
          {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition duration-300">
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-700 transition duration-300">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
