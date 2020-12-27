import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Reward } from './reward.model';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  constructor(protected http: HttpClient) {}

  getRewards() {
    return this.http.get(environment.apiBaseUrl + '/rewards');
  }

  deleteReward(id_reward: string) {
    return this.http.delete(environment.apiBaseUrl + '/reward/' + id_reward);
  }

  addReward(reward: Reward) {
    return this.http.post(environment.apiBaseUrl + '/reward/create', reward);
  }
}
