import React from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';

function Login({ onLogin }) {
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: ''
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string().required('Username or Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    }),
    onSubmit: (values) => {
      // Fetching stored users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Matching the entered credentials
      const matchedUser = existingUsers.find(user => 
        (user.username === values.emailOrUsername || user.email === values.emailOrUsername) &&
        user.password === values.password
      );

      if (matchedUser) {
        onLogin(matchedUser);  // Calling the login handler
      } else {
        alert('Invalid credentials');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="emailOrUsername" className="block text-gray-700">Email or Username:</label>
          <input
            type="text"
            name="emailOrUsername"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.emailOrUsername}
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500"
          />
          {touched.emailOrUsername && errors.emailOrUsername && (
            <p className="text-red-500 text-sm">{errors.emailOrUsername}</p>
          )}
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
          {touched.password && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button type="submit" className="w-full py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition duration-300">
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to='/signup' className="text-purple-600 hover:text-purple-700 transition duration-300">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
