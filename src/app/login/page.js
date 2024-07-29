'use client'

import { useState } from "react";
import { useAuth } from "@/firebase/auth";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import Loader from "@/components/Loader";

function Page() {
  const { signIn, authError, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await signIn(email, password);
      setSuccessMessage('Login successful !!');
      setSuccessModalOpen(true);
      setFormData({ email: "", password: ""});
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during sign-in.');
      setErrorModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setSuccessMessage('');
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form className="mt-10" onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
            <input id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
              className="block w-full py-3 px-1 mt-2 
              text-gray-800 appearance-none 
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={formData.email}
              onChange={handleChange}
              required />

            <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
            <input id="password" type="password" name="password" placeholder="password" autoComplete="current-password"
              className="block w-full py-3 px-1 mt-2 mb-4
              text-gray-800 appearance-none 
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={formData.password}
              onChange={handleChange}
              required />

            <button type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-gray-700 hover:shadow-none"
              disabled={isLoading}>
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <a href="#" className="flex-2 underline">
                Forgot password?
              </a>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <Link href="/signup" className="flex-2 underline">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal isOpen={successModalOpen} message={successMessage} onClose={handleCloseSuccessModal} />
      <ErrorModal isOpen={errorModalOpen} message={errorMessage} onClose={handleCloseErrorModal} />
      {isLoading && <Loader />}
    </div>
  );
}

export default Page;
