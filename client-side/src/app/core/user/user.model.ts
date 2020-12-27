import { PreviewBook } from '../books/book.model';

export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  points: number;
  liked: PreviewBook[];
  read: PreviewBook[];
  role: string;
  resetLink: string;
}

export class LoggedUser {
  username: string;
  password: string;
}
export class ModifiedUser {
  id: string;
  liked: PreviewBook[];
  read: PreviewBook[];
  points: number;
}
