"use client"
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission securely
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission error');
      }
    } catch (error) {
      console.error('Form submission error', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-5">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="name">Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="email">Email</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="message">Message</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
