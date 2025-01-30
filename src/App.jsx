import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WaitlistProvider } from './context/WaitlistContext';
import { RegistrationForm } from './components/RegistrationForm';
import { WaitlistStatus } from './components/WaitlistStatus';
import { Car } from 'lucide-react';

function App() {
  return (
    <WaitlistProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Car className="h-8 w-8 text-[#FF00BF]" />
                  <span className="ml-2 text-xl font-bold text-[#FF00BF]">Waitlist App</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-[#FF00BF] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                  <Link
                    to="/status"
                    className="text-gray-700 hover:text-[#FF00BF] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Status
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={
                <div className="px-4 py-6 sm:px-0">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Waitlist</h1>
                    <p className="text-lg text-gray-600">
                      Get early access to our exclusive service
                    </p>
                  </div>
                  <RegistrationForm />
                </div>
              } />
              <Route path="/status" element={<WaitlistStatus />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WaitlistProvider>
  );
}

export default App;