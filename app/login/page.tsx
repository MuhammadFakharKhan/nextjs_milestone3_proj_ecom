import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className='bg-white text-black max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-md'>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required 
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        <div className="mt-4 flex justify-between items-center">
          <Link href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
          <Link href="/register" className="text-sm text-blue-500 hover:underline">SignUp</Link>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500 text-sm">or sign in with</span>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-4">
          <button 
            type="button" 
            className="bg-white border border-gray-300 text-gray-500 py-2 px-4 rounded hover:bg-gray-50 transition duration-200 flex items-center gap-2"
          >
            <Image src="/google.png" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button 
            type="button" 
            className="bg-white border border-gray-300 text-gray-500 py-2 px-4 rounded hover:bg-gray-50 transition duration-200 flex items-center gap-2"
          >
            <Image src="/facebook.png" alt="Facebook" className="w-5 h-5" />
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

