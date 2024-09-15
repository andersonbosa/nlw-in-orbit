import { env } from '../env'

export namespace CreateGoalQuery {
  export interface QueryInput {
    title: string
    desiredWeeklyFrequency: number
  }

  export interface QueryOutput {}

  export async function query(input: QueryInput): Promise<QueryOutput> {
    const { data } = await fetch(
      `${env.VITE_BACKEND_API_BASE_URL}/api/goals/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    )
      .then(response => response.json())
      .catch(console.error)
    return data
  }
}
