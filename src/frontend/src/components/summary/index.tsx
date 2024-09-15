import { DialogTrigger } from '@radix-ui/react-dialog'
import { CheckCircle2, Circle, Plus } from 'lucide-react'

import { Button } from '../ui/button'
import { InOrbitIcon } from '../in-orbit-logo'
import { Progress, ProgressIndicator } from '../ui/progress-bar'
import { Separator } from '../ui/separator'
import { OutlineButton } from '../ui/outline-button'
import type { SummaryData } from '../../@types'

interface SummaryProps {
  summaryData: SummaryData
}

export function Summary({ summaryData }: SummaryProps) {
  console.log(summaryData)
  const completedGoals = summaryData.completed

  return (
    <div className="py-10 px-5 max-w-[480px] mx-auto flex flex-col gap-6 h-screen ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-medium">5 a 10 de agosto</span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={15} max={15}>
          <ProgressIndicator style={{ width: '50%' }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400 ">
          <span>
            Você completou <span className="text-zinc-100">8</span> de{' '}
            <span className="text-zinc-100">15</span> metas nessa semana.{' '}
          </span>
          <span>58%</span>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Estudar' },
            { label: 'Meditar' },
            { label: 'Ler 5 páginas' },
            { label: 'Correr 2km' },
            { label: 'Estudar' },
            { label: 'Treino de perna' },
            { label: 'Treino de braço' },
            { label: 'Treino de perna' },
            { label: 'Estudar' },
            { label: 'Treino de braço' },
          ]
            .slice(0, 6)
            .map(goal => (
              <OutlineButton
                key={goal.label.concat(
                  Math.floor(Math.random() * 1e5).toString()
                )}
              >
                <Plus className="size-4 text-zinc-600" />
                {goal.label}
              </OutlineButton>
            ))}
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {completedGoals === 0 ? (
            <>
              <div className="flex flex-col gap-4">
                <span className="text-zinc-400 ">
                  Você ainda não completou nenhuma meta essa semana.
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <h3 className="font-medium">
                  Hoje{' '}
                  <span className="text-zinc-400 text-xs">(10 de Agosto)</span>
                </h3>{' '}
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-pink-500 cursor-pointer" />
                    <span className="text-zinc-400 text-sm">
                      Você completou "<span>Acordar cedo</span>" às
                      <span>08:13h</span>
                    </span>
                    <span className="text-zinc-500 text-sm underline cursor-pointer">
                      Desfazer
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-medium">
                  Ontem{' '}
                  <span className="text-zinc-400 text-xs">(9 de Agosto)</span>
                </h3>{' '}
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    <Circle className="size-4 text-pink-500 cursor-pointer" />
                    <span className="text-zinc-400 text-sm">
                      Você completou "<span>Acordar cedo</span>" às
                      <span>08:13h</span>
                    </span>
                    <span className="text-zinc-500 text-sm underline cursor-pointer">
                      Desfazer
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <Circle className="size-4 text-pink-500 cursor-pointer" />
                    <span className="text-zinc-400 text-sm">
                      Você completou "<span>Acordar cedo</span>" às
                      <span>08:13h</span>
                    </span>
                    <span className="text-zinc-500 text-sm underline cursor-pointer">
                      Desfazer
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-pink-500 cursor-pointer" />
                    <span className="text-zinc-400 text-sm">
                      Você completou "<span>Acordar cedo</span>" às
                      <span>08:13h</span>
                    </span>
                    <span className="text-zinc-500 text-sm underline cursor-pointer">
                      Desfazer
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
