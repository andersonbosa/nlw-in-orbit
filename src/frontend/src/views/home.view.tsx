import { Plus, X } from 'lucide-react'

import logo from '../assets/logo-in-orbit.svg'
import letsStartIllustration from '../assets/lets-start-illustration.svg'

import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../components/ui/radio-group'

export function HomeView() {
  return (
    <Dialog>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="Logo" />
        <img src={letsStartIllustration} alt="Lets start illustration" />
        <p className="text-zinc-330 max-w-80 text-center leading-relaxed ">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora
          mesmo?
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Cadastrar meta</DialogTitle>
              <DialogClose>
                <X className="size-4" />
              </DialogClose>
            </div>

            <DialogDescription>
              Adicione atividades que{' '}
              <span className="underline">te fazem bem</span> e que você quer
              continuar praticando toda semana.
            </DialogDescription>
          </div>

          <form action="" className="flex flex-col justify-between flex-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="Meditar, correr, ler, etc..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="desiredTimes">Quantas vezes na semana?</Label>
                <RadioGroup>
                  {[
                    { value: '1', label: '1x na semana', emoji: '🥱' },
                    { value: '2', label: '2x na semana', emoji: '🙂' },
                    { value: '3', label: '3x na semana', emoji: '😎' },
                    { value: '4', label: '4x na semana', emoji: '😜' },
                    { value: '5', label: '5x na semana', emoji: '🤨' },
                    { value: '6', label: '6x na semana', emoji: '🤯' },
                    { value: '7', label: 'Todos dias da semana', emoji: '🔥' },
                  ].map(({ value, label, emoji }) => (
                    <RadioGroupItem value={value} key={value}>
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-small font-medium leading-none">
                        {label}
                      </span>
                      <span>{emoji}</span>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="flex flex-items gap-3">
              <DialogClose asChild>
                <Button variant="secondary" className="flex-1">
                  Fechar
                </Button>
              </DialogClose>
              <Button className="flex-1">Salvar</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
