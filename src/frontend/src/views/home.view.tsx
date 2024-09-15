import { useQuery } from '@tanstack/react-query'

import { CreateGoalModal } from '../components/create-goal-modal'
import { EmptyGoals } from '../components/empty-goals'
import { Summary } from '../components/summary'
import { Dialog } from '../components/ui/dialog'

import { GetSummaryQuery } from '../http/get-summary.query'

export function HomeView() {
  const { data: summaryData } = useQuery({
    queryKey: ['summaryQuery'],
    queryFn: GetSummaryQuery.query,
    staleTime: 1000 * 60,
  })

  return (
    <Dialog>
      {summaryData?.summary && summaryData?.summary?.total > 0 ? (
        <Summary summaryData={summaryData.summary} />
      ) : (
        <EmptyGoals />
      )}
      <CreateGoalModal />
    </Dialog>
  )
}
