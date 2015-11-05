import GoalCtrl from '../controllers/goal-ctrl.js';

export default function Goal(){
	 return {
	 	controller: GoalCtrl,
	 	controllerAs: 'vm',
	 	templateUrl: 'js/directives/goal.html',
	 	bindToController: true
	 }
}
