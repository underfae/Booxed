export class Comment{
  _id: string;
  id_user: string;
  id_book: string;
  commentText: string;
  dateOfPosting: Date;
  likes: string[];
  reports: string[];
}

export class UpdatedComment{
  commentText: string;
  likes: string[];
  reports: string[];
}
