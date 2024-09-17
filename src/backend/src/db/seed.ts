import dayjs from 'dayjs'
import { ptBR } from 'dayjs/locale/pt-br'
dayjs.locale(ptBR)

import { faker } from '@faker-js/faker'
faker.locale = 'pt_BR'

import { goalsCompletions, goals } from './schema'
import { dbOrm, dbClient } from './client'

const getRandomMinutes = (): number => {
  return faker.number.int({ min: 10, max: 1000 })
}

async function seed() {
  await dbOrm.delete(goalsCompletions)
  await dbOrm.delete(goals)

  const addedGoals = await dbOrm
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 4 },
      { title: 'Correr', desiredWeeklyFrequency: 3 },
      { title: 'Treino pesado', desiredWeeklyFrequency: 2 },
      { title: 'Beber 2L água', desiredWeeklyFrequency: 4 },
      { title: 'Meditar', desiredWeeklyFrequency: 3 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')
  await dbOrm.insert(goalsCompletions).values([
    {
      goalId: addedGoals[0].id,
      createdAt: startOfWeek
        .add(0, 'day')
        .add(getRandomMinutes(), 'minutes')
        .toDate(),
    },
    {
      goalId: addedGoals[1].id,
      createdAt: startOfWeek
        .add(1, 'day')
        .add(getRandomMinutes(), 'minutes')
        .toDate(),
    },
    {
      goalId: addedGoals[2].id,
      createdAt: startOfWeek
        .add(2, 'day')
        .add(getRandomMinutes(), 'minutes')
        .toDate(),
    },
    {
      goalId: addedGoals[3].id,
      createdAt: startOfWeek
        .add(3, 'day')
        .add(getRandomMinutes(), 'minutes')
        .toDate(),
    },
    {
      goalId: addedGoals[4].id,
      createdAt: startOfWeek
        .add(4, 'day')
        .add(getRandomMinutes(), 'minutes')
        .toDate(),
    },
  ])
}

seed().finally(() => {
  dbClient.end()
})
