import dayjs from 'dayjs'

import { goalsCompletions, goals } from './schema'
import { dbOrm, dbClient } from './client'

async function seed () {
  await dbOrm.delete(goalsCompletions)
  await dbOrm.delete(goals)

  const addedGoals = await dbOrm
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Correr', desiredWeeklyFrequency: 3 },
      { title: 'Treino pesado', desiredWeeklyFrequency: 2 },
      { title: 'Beber 2L água', desiredWeeklyFrequency: 5 },
      { title: 'Meditar', desiredWeeklyFrequency: 3 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')
  await dbOrm.insert(goalsCompletions).values([
    { goalId: addedGoals[0].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goalId: addedGoals[0].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    { goalId: addedGoals[1].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    { goalId: addedGoals[1].id, createdAt: startOfWeek.add(4, 'day').toDate() },
    { goalId: addedGoals[2].id, createdAt: startOfWeek.add(4, 'day').toDate() },
    { goalId: addedGoals[2].id, createdAt: startOfWeek.add(7, 'day').toDate() },
    { goalId: addedGoals[3].id, createdAt: startOfWeek.add(7, 'day').toDate() },
    { goalId: addedGoals[4].id, createdAt: startOfWeek.add(10, 'day').toDate() },

  ])
}

seed().finally(() => {
  dbClient.end()
})
