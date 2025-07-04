export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
export interface Report {
  id: string;
  source: string;
  type: ReportType;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

export const data: Report[] = [
  {
    id: 'uuid1',
    source: 'Salary',
    amount: 7500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.INCOME,
  },
  {
    id: 'uuid2',
    source: 'YouTube',
    amount: 2500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.INCOME,
  },
  {
    id: 'uuid3',
    source: 'Food',
    amount: 500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.EXPENSE,
  },
]