import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
dayjs.locale(ptBR)

import { faker } from '@faker-js/faker'

import { goalsCompletions, goals, users } from './schema'
import { dbOrm, dbClient } from './client'
import { hashPassword } from '../utils/hash-password.util'

const getRandomMinutes = (): number => {
  return faker.number.int({ min: 10, max: 1000 })
}

async function seed() {
  console.time('TIME_TO_SEED')
  await dbOrm.delete(goalsCompletions)
  await dbOrm.delete(goals)
  await dbOrm.delete(users)

  const usersAdded = await dbOrm
    .insert(users)
    .values({
      username: 'admin',
      email: 'admin@localhost.com',
      passwordHash: await hashPassword('admin'),
    })
    .returning()

  const addedGoals = await dbOrm
    .insert(goals)
    .values([
      {
        userId: usersAdded[0].id,
        title: 'Acordar cedo',
        desiredWeeklyFrequency: 4,
      },
      { userId: usersAdded[0].id, title: 'Correr', desiredWeeklyFrequency: 3 },
      {
        userId: usersAdded[0].id,
        title: 'Treino pesado',
        desiredWeeklyFrequency: 2,
      },
      {
        userId: usersAdded[0].id,
        title: 'Beber 2L água',
        desiredWeeklyFrequency: 4,
      },
      { userId: usersAdded[0].id, title: 'Meditar', desiredWeeklyFrequency: 3 },
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
  console.timeEnd('TIME_TO_SEED')
}

seed().finally(() => {
  dbClient.end()
})
