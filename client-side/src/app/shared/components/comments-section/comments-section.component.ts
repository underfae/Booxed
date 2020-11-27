import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Comment, UpdatedComment} from "../../../core/comment/comment.model";
import {CommentService} from "../../../core/comment/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
  @Input() id_book: string;
  @Input() id_user: string;

  comments = [];
  comment = new Comment;

  constructor(protected commentService: CommentService,
              protected snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.commentService.getComments(this.id_book).subscribe((result: any) => {
      console.log(result)
      this.comments = result
    })

  }

  newComment = new FormGroup({
    commentText: new FormControl('', [Validators.required, Validators.maxLength(500)])
  })

  addComment() {
    this.comment.commentText = this.newComment.value.commentText;
    this.comment.id_book = this.id_book;
    this.comment.id_user = this.id_user;
    this.comment.dateOfPosting = new Date();
    this.comment.likes = [];
    this.comment.reports = [];
    this.commentService.postComment(this.comment).subscribe((result: any) => {
        this.snackBar.open('Comment added succesfully', 'OK', {duration: 2000});
      },
      () => {
        this.snackBar.open('Could not add a comment', 'OK', {duration: 4000});
      })

  }

  reportUnreportComment(comment: Comment, action: string) {
    let modifiedComment = new UpdatedComment;
    modifiedComment.likes = comment.likes;
    modifiedComment.commentText = comment.commentText;
    modifiedComment.reports = comment.reports;

    if (action === 'unreport') {
      let index = modifiedComment.reports.indexOf(this.id_user);
      modifiedComment.reports.splice(index, 1);
    } else if (action === 'report') {
      modifiedComment.reports.push(this.id_user);
    }

    this.commentService.updateComment(modifiedComment, comment._id).subscribe(
      () => {
        this.snackBar.open('Action completed', 'OK', {duration: 2000});
      },
      () => {
        this.snackBar.open('Could not complete action', 'OK', {duration: 4000});
      }
    )
  }

  likeUnlikeComment(comment: Comment, action: string) {
    let modifiedComment = new UpdatedComment;
    modifiedComment.reports = comment?.reports;
    modifiedComment.commentText = comment?.commentText;
    modifiedComment.likes = comment?.likes;
    if (action === 'unlike') {
      let index = modifiedComment.likes.indexOf(this.id_user);
      modifiedComment.likes.splice(index, 1);
    } else if (action === 'like') {
      modifiedComment.likes.push(this.id_user)
    }
    this.commentService.updateComment(modifiedComment, comment?._id).subscribe(
      () => {
        this.snackBar.open('Action completed', 'OK', {duration: 2000});
      },
      () => {
        this.snackBar.open('Could not complete action', 'OK', {duration: 4000});
      }
    )
  }


  checkIfReportedOrLiked(comment: Comment, action: string) {
    if (comment) {
      if (action === 'reported') {
        return comment.reports.find(x => x === this.id_user)
      } else if (action === 'liked') {
        return comment.likes.find(x => x === this.id_user)
      }
    }
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe(
      () => {
        this.snackBar.open('Comment successfully deleted', 'OK', {duration: 2000});
      },
      () => {
        this.snackBar.open('Comment could not be deleted', 'OK', {duration: 4000});
      })
  }

}
