import { CreateGoal } from '../components/create-goal'
import { EmptyGoals } from '../components/empty-goals'
import { Dialog } from '../components/ui/dialog'

export function HomeView() {
  return (
    <Dialog>
      <EmptyGoals />
      <CreateGoal />
    </Dialog>
  )
}
