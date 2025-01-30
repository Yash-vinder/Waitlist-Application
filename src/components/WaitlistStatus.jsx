import React from 'react';
import { useWaitlist } from '../context/WaitlistContext';
import { Clock } from 'lucide-react';

export const WaitlistStatus = () => {
  const { state } = useWaitlist();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Waitlist Status</h2>
          
          <div className="space-y-4">
            {state.users.map((user, index) => (
              <div
                key={user.timestamp}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FF00BF] text-white rounded-full">
                    {user.position}
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {user.inviteCode && state.validInviteCodes.includes(user.inviteCode)
                        ? 'Priority Access'
                        : 'General Waitlist'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Estimated wait: {user.position} day{user.position !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}

            {state.users.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No one is currently in the waitlist.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};