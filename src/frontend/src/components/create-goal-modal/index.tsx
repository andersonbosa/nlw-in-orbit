import { X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

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

import { CreateGoalQuery } from '../../http/create-goal.query'

const createGoalFormSchema = z.object({
  title: z.string().min(1, 'Informa a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalModalForm = z.infer<typeof createGoalFormSchema>

export function CreateGoalModal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalModalForm>({
      resolver: zodResolver(createGoalFormSchema),
    })

  async function handleCreateGoal(data: CreateGoalModalForm) {
    await CreateGoalQuery.query(data)

    queryClient.invalidateQueries({ queryKey: ['summaryQuery'] })
    queryClient.invalidateQueries({ queryKey: ['pendingGoalsQuery'] })

    reset()
  }

  const avaiableWeekOptions = [
    { value: '1', label: '1x na semana', emoji: '🥱' },
    { value: '2', label: '2x na semana', emoji: '🙂' },
    { value: '3', label: '3x na semana', emoji: '😎' },
    { value: '4', label: '4x na semana', emoji: '😜' },
    { value: '5', label: '5x na semana', emoji: '🤨' },
    { value: '6', label: '6x na semana', emoji: '🤯' },
    { value: '7', label: 'Todos dias da semana', emoji: '🔥' },
  ]

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full overflow-y-auto px-4">
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

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Meditar, correr, ler, etc..."
                {...register('title')}
              />
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredTimes">Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={0}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      {avaiableWeekOptions.map(({ value, label, emoji }) => (
                        <RadioGroupItem value={value} key={value}>
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-small font-medium leading-none">
                            {label}
                          </span>
                          <span>{emoji}</span>
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </>
                )}
              />
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
