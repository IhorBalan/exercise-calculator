export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  weight?: number;
  height?: number;
  birthday?: string;
};
