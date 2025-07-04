import { Injectable } from '@nestjs/common';
import { data, Report, ReportType } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dtos';
import { v4 as uuid } from 'uuid';

interface CreateReport {
  amount: number;
  source: string;
}
interface UpdateReport {
  amount?: number;
  source?: string;
}
@Injectable()
export class ReportService {

  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.filter(report => report.type === type)
      .map(report => new ReportResponseDto(report));
  }

  getReportById(id: string): ReportResponseDto | null {
    const report = data.find(report => report.id === id);
    if (!report) {
      return null;
    }
    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, report: CreateReport): ReportResponseDto {
    const newReport: Report = {
      id: uuid(),
      source: report.source,
      amount: report.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.push(newReport);
    return new ReportResponseDto(newReport);
  }
  updateReport(id: string, updateData: UpdateReport): ReportResponseDto | null {
    const reportIndex = data.findIndex(report => report.id === id);
    if (reportIndex === -1) {
      return null;
    }

    const report = data[reportIndex] = {
      ...data[reportIndex],
      ...updateData,
      updated_at: new Date(),
    }
    return new ReportResponseDto(report);
  }

  deleteReport(id: string): boolean {
    const reportIndex = data.findIndex(report => report.id === id);
    if (reportIndex === -1) {
      return false;
    }
    data.splice(reportIndex, 1);
    return true;
  }
}
