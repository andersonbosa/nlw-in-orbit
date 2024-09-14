import { Plus } from 'lucide-react'

import letsStartIllustration from '../../assets/lets-start-illustration.svg'
import logo from '#src/assets/logo-in-orbit.svg'

import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="Logo" />
      <img src={letsStartIllustration} alt="Lets start illustration" />
      <p className="text-zinc-330 max-w-80 text-center leading-relaxed ">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
