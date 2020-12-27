import { Injectable } from '@angular/core';
import { Comment, UpdatedComment } from './comment.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(protected http: HttpClient) {}

  getComments(id: string) {
    return this.http.get(environment.apiBaseUrl + '/comments/' + id);
  }

  getAllComments() {
    return this.http.get(environment.apiBaseUrl + '/comments');
  }

  updateComment(updatedComment: UpdatedComment, id: string) {
    return this.http.put(
      environment.apiBaseUrl + '/comment/' + id,
      updatedComment
    );
  }

  deleteComment(id: string) {
    return this.http.delete(environment.apiBaseUrl + '/comment/' + id);
  }

  postComment(comment: Comment) {
    return this.http.post(environment.apiBaseUrl + '/comment/create', comment);
  }
}
