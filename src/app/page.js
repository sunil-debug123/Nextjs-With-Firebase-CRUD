import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <nav className="bg-white shadow-lg">
          <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-800 md:text-3xl">
                Crud App
              </div>
              <div className="md:hidden">
                <button
                  type="button"
                  className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path
                      className="hidden"
                      d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                    />
                    <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row hidden md:block -mx-2">
              <Link
                href="/login"
                className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
              >
                Signup
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex bg-white" style={{ height: '600px' }}>
          <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 180 180"
                  className="icon-size"
                >
                  <mask
                    height="180"
                    id=":r8:mask0_408_134"
                    maskUnits="userSpaceOnUse"
                    width="180"
                    x="0"
                    y="0"
                    style={{ maskType: "alpha" }}
                  >
                    <circle cx="90" cy="90" fill="black" r="90"></circle>
                  </mask>
                  <g mask="url(#:r8:mask0_408_134)">
                    <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
                    <path
                      d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                      fill="url(#:r8:paint0_linear_408_134)"
                    ></path>
                    <rect fill="url(#:r8:paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect>
                  </g>
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id=":r8:paint0_linear_408_134"
                      x1="109"
                      x2="144.5"
                      y1="116.5"
                      y2="160.5"
                    >
                      <stop stopColor="white"></stop>
                      <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                    </linearGradient>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id=":r8:paint1_linear_408_134"
                      x1="121"
                      x2="120.799"
                      y1="54"
                      y2="106.875"
                    >
                      <stop stopColor="white"></stop>
                      <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <FontAwesomeIcon icon={faFire} style={{width: "36px", height: "36px"}}className="icon-size text-red-600" />
                <Link href="/" className="text-3xl font-semibold text-gray-800 md:text-4xl">
                  Firebase + Next.js
                </Link>
              </div>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Blanditiis commodi cum cupiditate ducimus, fugit harum id
                necessitatibus odio quam quasi, quibusdam rem tempora
                voluptates. Cumque debitis dignissimos id quam vel!
              </p>
              <div className="flex justify-center lg:justify-start mt-6">
                <Link
                  className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                  href="/dashboard"
                >
                  Get Started
                </Link>
                <Link
                  className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                  href="/signup"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div
            className="hidden lg:block lg:w-1/2"
            style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}
          >
            <div
              className="h-full object-cover"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)',
              }}
            >
              <div className="h-full bg-black opacity-25"></div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6 w-full">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="mb-4">&copy; 2024 sunil_debug123. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
