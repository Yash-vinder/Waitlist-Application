import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  users: [],
  validInviteCodes: ['austin234', 'alvin145', 'karthik321']
};

const waitlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      const { name, inviteCode } = action.payload;
      const isValidInvite = inviteCode && state.validInviteCodes.includes(inviteCode);
      
      // Separate users with and without valid invite codes
      const inviteUsers = state.users.filter(u => u.inviteCode && state.validInviteCodes.includes(u.inviteCode));
      const generalUsers = state.users.filter(u => !u.inviteCode || !state.validInviteCodes.includes(u.inviteCode));
      
      const newUser = {
        name,
        inviteCode,
        position: 0, // Will be calculated
        timestamp: Date.now()
      };

      let updatedUsers;
      if (isValidInvite) {
        // Add to the end of invite users, but before general users
        updatedUsers = [...inviteUsers, newUser, ...generalUsers];
      } else {
        // Add to the very end
        updatedUsers = [...inviteUsers, ...generalUsers, newUser];
      }

      // Update positions
      updatedUsers = updatedUsers.map((user, index) => ({
        ...user,
        position: index + 1
      }));

      return {
        ...state,
        users: updatedUsers
      };
    }
    default:
      return state;
  }
};

const WaitlistContext = createContext();

export const WaitlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(waitlistReducer, initialState);

  const addUser = (name, inviteCode) => {
    dispatch({ type: 'ADD_USER', payload: { name, inviteCode } });
  };

  return (
    <WaitlistContext.Provider value={{ state, addUser }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
};