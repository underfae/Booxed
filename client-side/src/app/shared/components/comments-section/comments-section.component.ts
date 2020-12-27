import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment, UpdatedComment } from '../../../core/comment/comment.model';
import { CommentService } from '../../../core/comment/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/user/user.service';
import { ModifiedUser, User } from '../../../core/user/user.model';
import { SharedService } from '../../../core/shared/shared.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
})
export class CommentsSectionComponent implements OnInit {
  @Input() id_book: string;
  @Input() user: User;

  comments = [];

  constructor(
    protected commentService: CommentService,
    protected snackBar: MatSnackBar,
    protected cdr: ChangeDetectorRef,
    protected sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.commentService.getComments(this.id_book).subscribe((result: any) => {
      this.comments = result;
    });
  }

  newComment = new FormGroup({
    commentText: new FormControl('', [Validators.maxLength(500)]),
  });

  addComment() {
    const comment = new Comment();
    comment.commentText = this.newComment.value.commentText;
    comment.id_book = this.id_book;
    comment.id_user = this.user._id;
    comment.dateOfPosting = new Date();
    comment.likes = [];
    comment.reports = [];
    this.commentService.postComment(comment).subscribe(
      (result: any) => {
        this.snackBar.open('Comment added succesfully', 'OK', {
          duration: 2000,
        });
        this.comments.push(result);
        this.cdr.detectChanges();
        this.newComment.reset();
        this.sharedService.addPoints(5, this.user);
      },
      () => {
        this.snackBar.open('Could not add a comment', 'OK', { duration: 4000 });
      }
    );
  }

  reportUnreportComment(comment: Comment, action: string) {
    let modifiedComment = new UpdatedComment();
    modifiedComment.likes = comment.likes;
    modifiedComment.commentText = comment.commentText;
    modifiedComment.reports = comment.reports;

    if (action === 'unreport') {
      let index = modifiedComment.reports.indexOf(this.user._id);
      modifiedComment.reports.splice(index, 1);
    } else if (action === 'report') {
      modifiedComment.reports.push(this.user._id);
    }

    this.commentService.updateComment(modifiedComment, comment._id).subscribe(
      () => {
        this.snackBar.open('Action completed', 'OK', { duration: 2000 });
      },
      () => {
        this.snackBar.open('Could not complete action', 'OK', {
          duration: 4000,
        });
      }
    );
  }

  likeUnlikeComment(comment: Comment, action: string) {
    let modifiedComment = new UpdatedComment();
    modifiedComment.reports = comment?.reports;
    modifiedComment.commentText = comment?.commentText;
    modifiedComment.likes = comment?.likes;
    if (action === 'unlike') {
      let index = modifiedComment.likes.indexOf(this.user._id);
      modifiedComment.likes.splice(index, 1);
      this.sharedService.deletePoints(1, this.user);
    } else if (action === 'like') {
      modifiedComment.likes.push(this.user._id);
      this.sharedService.addPoints(1, this.user);
    }

    this.commentService.updateComment(modifiedComment, comment?._id).subscribe(
      () => {
        this.snackBar.open('Action completed', 'OK', { duration: 2000 });
      },
      () => {
        this.snackBar.open('Could not complete action', 'OK', {
          duration: 4000,
        });
      }
    );
  }

  checkIfReportedOrLiked(comment: Comment, action: string) {
    if (comment) {
      if (action === 'reported') {
        return comment.reports.find((x) => x === this.user._id);
      } else if (action === 'liked') {
        return comment.likes.find((x) => x === this.user._id);
      }
    }
  }

  deleteComment(id: string) {
    if (id) {
      this.commentService.deleteComment(id).subscribe(
        () => {
          this.snackBar.open('Comment successfully deleted', 'OK', {
            duration: 2000,
          });
          this.sharedService.deletePoints(5, this.user);
        },
        () => {
          this.snackBar.open('Comment could not be deleted', 'OK', {
            duration: 4000,
          });
        },
        () => {
          this.comments.splice(
            this.comments.findIndex(function (i) {
              return i.id === id;
            }),
            1
          );
        }
      );
    }
  }
}
