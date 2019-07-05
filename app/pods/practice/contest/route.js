import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class ContestRoute extends Route {
  @service store

  async model(params) {
    const practice = await this.store.findRecord('practice', params.practice_id)
    const contest = await practice.contest
    const levels = this.store.query('user_level', {
      filter: {
        contestId: contest.get('id')
      }
    })
    return RSVP.hash({
      practice,
      contest,
      levels
    })
  }
}
