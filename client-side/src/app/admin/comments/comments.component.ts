import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../core/comment/comment.service';
import { Comment } from '../../core/comment/comment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../core/shared/shared.service';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];

  constructor(
    protected commentService: CommentService,
    protected snackBar: MatSnackBar,
    protected sharedService: SharedService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.commentService.getAllComments().subscribe((result: Comment[]) => {
      this.comments = result;
    });
  }

  deleteComment(comment_id: string, user_id: string) {
    this.commentService.deleteComment(comment_id).subscribe(
      () => {
        this.userService.getUser(user_id).subscribe((result: User) => {
          console.log(result);
          this.sharedService.deletePoints(20, result);

          this.snackBar.open(
            'Comment deleted. 20 points substracted from user account ',
            'OK',
            { duration: 2000 }
          );
        });
      },
      () => {
        this.snackBar.open('Could not delete this comment', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
