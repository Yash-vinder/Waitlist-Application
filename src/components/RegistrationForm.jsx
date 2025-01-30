import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWaitlist } from '../context/WaitlistContext';
import { Loader } from 'lucide-react';

export const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { addUser, state } = useWaitlist();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name.trim()) {
      setError('Please enter your name');
      setIsLoading(false);
      return;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const trimmedCode = inviteCode.trim();
    const isValidCode = state.validInviteCodes.includes(trimmedCode);
    
    addUser(name.trim(), trimmedCode || null);
    
    if (trimmedCode && !isValidCode) {
      setError('Invalid invite code. You have been placed in the general waitlist.');
    }

    setIsLoading(false);
    navigate('/status');
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF00BF] focus:ring focus:ring-[#FF00BF] focus:ring-opacity-50"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
            Invite Code (Optional)
          </label>
          <input
            type="text"
            id="inviteCode"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF00BF] focus:ring focus:ring-[#FF00BF] focus:ring-opacity-50"
            placeholder="Enter invite code if you have one"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF00BF] hover:bg-[#D100A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF00BF] disabled:opacity-50"
        >
          {isLoading ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            'Join Waitlist'
          )}
        </button>
      </form>
    </div>
  );
};