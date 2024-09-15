import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import type { PendingGoalData } from '../../@types'
import { CreateGoalCompletionQuery } from '../../http/create-goal-completion'
import { GetPendingGoalsQuery } from '../../http/get-pending-goals'
import { OutlineButton } from '../ui/outline-button'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pendingGoalsQuery'],
    queryFn: GetPendingGoalsQuery.query,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoals(goalId: string) {
    await CreateGoalCompletionQuery.query(goalId)
    queryClient.invalidateQueries({ queryKey: ['summaryQuery'] })
    queryClient.invalidateQueries({ queryKey: ['pendingGoalsQuery'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data?.pendingGoals?.map((goal: PendingGoalData, index) => (
        <OutlineButton
          key={`${index}__${goal.id}`}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCompleteGoals(goal.id)}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
