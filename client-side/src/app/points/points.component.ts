import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  constructor() { }
  rewards = [1,2,3,4,5,6,7,8];
  displayedColumns: string[] = ['reward', 'points', 'availability', 'button'];
  ngOnInit(): void {
  }

}
