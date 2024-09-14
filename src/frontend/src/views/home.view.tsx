import { CreateGoalModal } from '../components/create-goal-modal'
import { EmptyGoals } from '../components/empty-goals'
import { Summary } from '../components/summary'
import { Dialog } from '../components/ui/dialog'

export function HomeView() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <Summary />
      <CreateGoalModal />
    </Dialog>
  )
}
