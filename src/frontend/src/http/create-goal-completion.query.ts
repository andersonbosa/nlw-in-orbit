import { env } from '../env'

export namespace CreateGoalCompletionQuery {
  export interface QueryOutput {}

  export async function query(goalId: string): Promise<QueryOutput> {
    const { data } = await fetch(
      `${env.VITE_BACKEND_API_BASE_URL}/api/goals/get-completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goalId }),
      }
    )
      .then(response => response.json())
      .catch(console.error)
    return data
  }
}
