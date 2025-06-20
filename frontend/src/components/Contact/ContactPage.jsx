import React, { useState } from 'react';
import video from "../Contact/contact.mp4"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic (like sending the data to an API)
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side: Contact Form */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Right Side: Video */}
      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="w-full h-full ">
          <video
            className="w-full h-full rounded-lg shadow-lg"
            src={video}
            autoPlay
            muted
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
