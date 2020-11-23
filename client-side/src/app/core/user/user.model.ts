export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  points: number;
  liked: number;
  read: number;
}

export class LoggedUser {
  username: string;
  password: string;
}
