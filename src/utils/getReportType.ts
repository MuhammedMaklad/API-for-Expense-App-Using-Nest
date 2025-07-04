import { ReportType } from "src/data";


export function getReportType(type: string): ReportType {
  switch (type) {
    case 'income':
      return ReportType.INCOME;
    case 'expense':
      return ReportType.EXPENSE;
    default:
      throw new Error(`Invalid report type: ${type}`);
  }
}