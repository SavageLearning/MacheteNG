/* eslint-disable brace-style */
/**
 * Created by jcii on 5/31/17.
 */
import { Record } from './record';
export class WorkAssignment extends Record<WorkAssignment> {
  skillId: number;
  skill: string;
  hours: number;
  description: string;
  requiresHeavyLifting = false;
  hourlyWage: number;
  transportCost: number;
  days: number;

  static sort(a: WorkAssignment, b: WorkAssignment) {
    if (a.id < b.id) { return -1; }
    if (a.id > b.id) { return 1; }
    return 0;
  }
}
