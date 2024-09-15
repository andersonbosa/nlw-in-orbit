export type GoalPerDayType = {
  id: string
  title: string
  completedAt: string
}

export type GoalsPerDayType = Record<string, GoalPerDayType[]>

export interface SummaryData {
  completed: number
  total: number
  goalsPerDay: GoalsPerDayType
}

export interface PendingGoalData {
  id: string
  title: string
  desiredWeeklyFrequency: number
  createdAt: Date
  completionCount: number
}
