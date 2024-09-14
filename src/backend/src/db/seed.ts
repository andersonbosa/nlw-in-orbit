import dayjs from 'dayjs'

import { goalCompletions, goals } from './schema'
import { dbOrm, dbClient } from './client'

async function seed() {
  await dbOrm.delete(goalCompletions)
  await dbOrm.delete(goals)

  const addedGoals = await dbOrm
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Correr', desiredWeeklyFrequency: 3 },
      { title: 'Treino pesado', desiredWeeklyFrequency: 2 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')
  await dbOrm.insert(goalCompletions).values([
    { goalId: addedGoals[0].id, createdAt: startOfWeek.toDate() },
    { goalId: addedGoals[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  dbClient.end()
})
