import {PreviewBook} from "../books/book.model";

export class Bookshelf {
  _id: string;
  name: string;
  description: string;
  id_user: string;
  creation_date: Date;
  books: PreviewBook[];
}
