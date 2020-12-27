import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RewardService } from '../../core/points/reward/reward.service';
import { LibraryPreview, Reward } from '../../core/points/reward/reward.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddLibraryComponent } from '../../shared/components/add-library/add-library.component';
import { LibraryService } from '../../core/points/library/library.service';
import { Library } from '../../core/points/library/library.model';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
})
export class RewardsComponent implements OnInit {
  rewards: Reward[] = [];
  newRewardLibraries: LibraryPreview[] = [];
  allLibraries: Library[];
  choosedLibraries: Library[] = [];
  addedReward: Reward = new Reward();

  constructor(
    protected rewardsService: RewardService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected libraryService: LibraryService,
    protected cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rewardsService.getRewards().subscribe((result: Reward[]) => {
      this.rewards = result;
    });
    this.libraryService.getLibraries().subscribe(
      (result: Library[]) => {
        this.allLibraries = result;
      },
      () => {
        this.snackBar.open('Could not fetch the libraries', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  newReward = new FormGroup({
    name: new FormControl('', [Validators.required]),
    points: new FormControl('', [Validators.required]),
    libraries: new FormControl(''),
  });

  addLibraries() {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddLibraryComponent, {
      width: '600px',
      maxHeight: '600px',
      data: { libraries: this.allLibraries },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.choosedLibraries = result;
        this.newReward.controls.libraries.setValue(result);
      }
    });
  }

  deleteReward(reward_id: string) {
    if (reward_id) {
      this.rewardsService.deleteReward(reward_id).subscribe(
        () => {
          this.snackBar.open('Reward succesfully deleted', 'OK', {
            duration: 2000,
          });
          this.rewards.splice(
            this.rewards.findIndex(function (i) {
              return i._id === reward_id;
            }),
            1
          );
        },
        () => {
          this.snackBar.open('Could not delete reward', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }

  addReward() {
    Object.assign(this.addedReward, this.newReward.value);
    this.rewardsService.addReward(this.addedReward).subscribe(
      () => {
        this.snackBar.open('Reward succesfully added', 'OK', {
          duration: 2000,
        });
        this.rewards.push(this.addedReward);
        this.cdr.detectChanges();
      },
      () => {
        this.snackBar.open('Could not add a reward', 'OK', { duration: 2000 });
      }
    );
  }

  editReward(reward: Reward) {
    // const dialogRef = this.dialog.open(AddLibraryComponent, {
    //   width: '600px',
    //   maxHeight: '600px',
    //   data: { reward: reward },
    // });
    //
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result) {
    //     this.changedReward.libraries = result.ids;
    //     this.changedReward.points = result.points;
    //     this.changedReward.name = result.name;
    //     this.libraries = result.names;
    //   }
    // });
  }
}
