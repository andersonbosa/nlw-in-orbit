import type { SummaryData } from '../@types'
import { env } from '../env'

export namespace GetSummaryQuery {
  export interface QueryOutput {
    summary: SummaryData
  }

  export async function query(): Promise<QueryOutput> {
    const { data } = await fetch(`${env.VITE_BACKEND_API_BASE_URL}/api/summary`)
      .then(response => response.json())
      .catch(console.error)
    return data
  }
}
