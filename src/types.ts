export interface WaitlistUser {
  name: string;
  inviteCode: string | null;
  position: number;
  timestamp: number;
}

export interface WaitlistState {
  users: WaitlistUser[];
  validInviteCodes: string[];
}

export interface WaitlistContextType {
  state: WaitlistState;
  addUser: (name: string, inviteCode: string | null) => void;
}