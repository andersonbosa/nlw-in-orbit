import { DialogTrigger } from '@radix-ui/react-dialog'
import { CheckCircle2, Circle, Plus } from 'lucide-react'

import type { GoalPerDayType, SummaryData } from '../../@types'
import { InOrbitIcon } from '../in-orbit-logo'
import { Button } from '../ui/button'
import { Progress, ProgressIndicator } from '../ui/progress-bar'
import { Separator } from '../ui/separator'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from '../pending-goals'

dayjs.locale(ptBR)

const GoalItem = ({
  completed,
  title,
  completedAt,
  onUndo,
}: {
  completed: boolean
  title: string
  completedAt: string | null
  onUndo: () => void
}) => {
  const Icon = completed ? CheckCircle2 : Circle
  const completedTime = dayjs(completedAt).format('HH:mm[h]')

  return (
    <>
      <li className="flex items-center gap-2">
        <Icon className="size-4 text-pink-500 cursor-pointer" />
        <span className="text-zinc-400 text-sm">
          Você completou "<span>{title}</span>"{' '}
          {completedAt && (
            <>
              às <span>{completedTime}</span>
            </>
          )}
        </span>
        <button
          type="button"
          onClick={onUndo}
          className="text-zinc-500 text-sm underline cursor-pointer"
        >
          Desfazer
        </button>
      </li>
      {/* <li className="flex items-center gap-2">
        <CheckCircle2 className="size-4 text-pink-500 cursor-pointer" />
        <span className="text-zinc-400 text-sm">
          Você completou "<span>Acordar cedo</span>" às
          <span>08:13h</span>
        </span>
        <span className="text-zinc-500 text-sm underline cursor-pointer">
          Desfazer
        </span>
      </li> */}
    </>
  )
}

const DaySummary = ({
  date,
  goals,
  onUndo,
}: {
  date: string
  goals: GoalPerDayType[]
  onUndo: () => void
}) => {
  const weekDay = dayjs(date).format('dddd')
  const formattedDate = dayjs(date).format('D[ de ]MMMM')
  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium ">
          <span className="capitalize">{weekDay}</span>{' '}
          <span className="text-zinc-400 text-xs ">({formattedDate})</span>
        </h3>{' '}
        <ul className="flex flex-col gap-3">
          {goals.map((goal: GoalPerDayType, index) => (
            <GoalItem
              key={`${index}__${goal.id}`}
              title={goal.title}
              completedAt={goal.completedAt}
              completed={true}
              onUndo={onUndo}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

interface SummaryProps {
  summaryData: SummaryData
}

export function Summary({ summaryData }: SummaryProps) {
  if (!summaryData) {
    return null
  }

  console.log(summaryData)

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const percentageOfCompletedGoals = Math.round(
    (summaryData.completed * 100) / summaryData.total
  )

  return (
    <div className="py-10 px-5 max-w-[480px] mx-auto flex flex-col gap-6 h-screen ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-medium capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={5} max={12}>
          <ProgressIndicator
            style={{ width: `${percentageOfCompletedGoals}%` }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400 ">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summaryData.completed}</span> de{' '}
            <span className="text-zinc-100">{summaryData.total}</span> metas
            nessa semana.{' '}
          </span>
          <span>{percentageOfCompletedGoals}%</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {summaryData.completed === 0 ? (
            <>
              <div className="flex flex-col gap-4">
                <span className="text-zinc-400 ">
                  Você ainda não completou nenhuma meta essa semana.
                </span>
              </div>
            </>
          ) : (
            <>
              {Object.entries(summaryData.goalsPerDay).map((entry, index) => {
                const [date, goals] = entry
                return (
                  <DaySummary
                    key={`${index}__${date}`}
                    date={date}
                    goals={goals}
                    onUndo={console.log}
                  />
                )
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
