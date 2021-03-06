import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  @service store

  model(params) {
    const contest = this.modelFor('practice.contest').practice.contest
    const problem = this.store.queryRecord('problem', {
      custom: {
        ext: 'url',
        url: `${params.problem_id}`
      },
      contest_id: contest.get('id'),
      include: 'solution_stubs',
      reload: true
    })

    return RSVP.hash({
      contest,
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('problem', model.problem)
  }
}
