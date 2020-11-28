import {AddedBook} from "../books/book.model";

export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  points: number;
  liked: AddedBook[];
  read: AddedBook[];
}

export class LoggedUser {
  username: string;
  password: string;
}
export class ModifiedUser{
  id: string;
  liked: AddedBook[];
  read: AddedBook[];
  points: number;
}
