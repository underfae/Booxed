export class Comment{
  id_user: String;
  id_book: String;
  commentText: String;
  dateOfPosting: Date;
  likes: string[];
  reports: string[];
}

export class UpdatedComment{
  commentText: String;
  likes: string[];
  reports: string[];
}
