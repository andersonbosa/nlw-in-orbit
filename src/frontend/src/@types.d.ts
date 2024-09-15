export type GoalsPerDayType = Record<
  string,
  {
    id: string
    title: string
    completedAt: string
  }[]
>

export interface SummaryData {
  completed: number
  total: number
  goalsPerDay: GoalsPerDayType
}
