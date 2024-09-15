import type { PendingGoalData } from '../@types'
import { env } from '../env'

export namespace GetPendingGoalsQuery {
  export interface QueryOutput {
    pendingGoals: PendingGoalData[]
  }

  export async function query(): Promise<QueryOutput> {
    const { data } = await fetch(
      `${env.VITE_BACKEND_API_BASE_URL}/api/goals/get-pendings`
    )
      .then(response => response.json())
      .catch(console.error)
    return data
  }
}
