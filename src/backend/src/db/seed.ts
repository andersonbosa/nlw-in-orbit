import { goalCompletions, goals } from './schema'
import { db } from './index'

async function seed () {
  await db.delete(goalCompletions)
  await db.delete(goals)

  await db.insert(goals).values([
    { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
    { title: 'Correr', desiredWeeklyFrequency: 3 },
    { title: 'Treino pesado', desiredWeeklyFrequency: 2 },
  ])
}

seed()