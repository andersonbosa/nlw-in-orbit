import { Plus } from 'lucide-react'

import logo from './assets/logo-in-orbit.svg'
import letsStartIllustration from './assets/lets-start-illustration.svg'

export function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="Logo" />
      <img src={letsStartIllustration} alt="Lets start illustration" />
      <p className="text-zinc-330 max-w-80 text-center leading-relaxed ">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>
      <button
        type="button"
        className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-2 text-small font-medium tracking-tight hover:brightness-75"
      >
        <Plus className="size-4" />
        Cadastrar meta
      </button>
    </div>
  )
}
