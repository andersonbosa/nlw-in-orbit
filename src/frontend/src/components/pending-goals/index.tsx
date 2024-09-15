import { Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { OutlineButton } from '../ui/outline-button'
import { GetPendingGoalsQuery } from '../../http/get-pending-goals'
import type { PendingGoalData } from '../../@types'

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: GetPendingGoalsQuery.query,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data?.pendingGoals?.map((goal: PendingGoalData) => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
