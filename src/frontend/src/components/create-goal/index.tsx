import { X } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../ui/radio-group'

export function CreateGoal() {
  return (
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
  )
}