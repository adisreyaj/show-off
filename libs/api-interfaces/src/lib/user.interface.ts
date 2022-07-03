export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  username: string;
  lastName?: string;
}

export interface User extends BaseUser {
  image?: string;
}
