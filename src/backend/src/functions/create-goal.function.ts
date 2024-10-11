import { dbOrm } from '../db/client'
import { goals } from '../db/schema'

interface CreateGoalInput {
  userId: string
  title: string
  desiredWeeklyFrequency: number
}
interface CreateGoalOutput {}

export async function createGoalFunction(input: CreateGoalInput) {
  const { userId, title, desiredWeeklyFrequency } = input

  const insertResult = await dbOrm
    .insert(goals)
    .values({
      userId,
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = insertResult[0]

  return {
    goal,
  }
}
