import dayjs from 'dayjs'

import { goalCompletions, goals } from './schema'
import { db, dbClient } from './index'

async function seed () {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const addedGoals = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Correr', desiredWeeklyFrequency: 3 },
      { title: 'Treino pesado', desiredWeeklyFrequency: 2 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')
  await db.insert(goalCompletions).values([
    { goalId: addedGoals[0].id, createdAt: startOfWeek.toDate() },
    { goalId: addedGoals[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed()
  .finally(() => {
    dbClient.end()
  })
