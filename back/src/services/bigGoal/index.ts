import { BigGoal } from "../../orm/entity/BigGoal";

import { getManager } from "typeorm";

export async function getBigGoals() {
  return BigGoal.find();
}

export async function saveBigGoals(goals: string[]) {
  return getManager().transaction(async (transactionalEntityManager) => {
    const goalsToSave = goals.map((title) => {
      const newGoal = new BigGoal();
      newGoal.title = title;
      return newGoal;
    });
    return transactionalEntityManager.save(goalsToSave);
  });
}
