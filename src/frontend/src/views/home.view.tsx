import { useEffect, useState } from 'react'

import { CreateGoalModal } from '../components/create-goal-modal'
import { EmptyGoals } from '../components/empty-goals'
import { Summary } from '../components/summary'
import { Dialog } from '../components/ui/dialog'
import { env } from '../env'

type GoalsPerDayType = Record<
  string,
  {
    id: string
    title: string
    completedAt: string
  }[]
>

interface GetWeekSummaryFunctionResponse {
  summary: {
    completed: number
    total: number
    goalsPerDay: GoalsPerDayType
  }
}

export function HomeView() {
  const [summaryData, setSummaryData] =
    useState<GetWeekSummaryFunctionResponse | null>(null)

  function setupSummaryData() {
    fetch(`${env.VITE_BACKEND_API_BASE_URL}/api/summary`)
      .then(response => response.json())
      .then(response => response?.data && setSummaryData(response?.data))
      .catch(console.error)

    return () => {}
  }

  useEffect(setupSummaryData, [])

  console.log(summaryData)

  return (
    <Dialog>
      {summaryData?.summary && summaryData?.summary?.total > 0 ? (
        <Summary />
      ) : (
        <EmptyGoals />
      )}
      <CreateGoalModal />
    </Dialog>
  )
}
