import { CreateGoal } from '../components/create-goal'
import { Summary } from '../components/summary'
import { Dialog } from '../components/ui/dialog'

export function HomeView() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <Summary />
      <CreateGoal />
    </Dialog>
  )
}
