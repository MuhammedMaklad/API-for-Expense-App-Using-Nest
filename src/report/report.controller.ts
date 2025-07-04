import { Controller, Delete, Get, HttpStatus, ParseEnumPipe, Post, Put, Res, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReportType } from 'src/data';
import { ReportService } from './report.service';
import { getReportType } from 'src/utils/getReportType';
import { CreateReportDto, UpdateReportDto } from '../dtos/report.dtos';

@Controller('report/:type')
export class ReportController {

  constructor(private readonly ReportService: ReportService) {
  }
  @Get('test')
  test(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      message: 'Report is working'
    })
  }


  @Get()
  getReport(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Res() res: Response) {
    const reportType = getReportType(type)
    const data = this.ReportService.getAllReports(reportType);
    res.status(HttpStatus.OK).json({
      message: `Fetching all reports of type: ${reportType}`,
      data
    });
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id') id: string,
    @Res() res: Response) {

    const reportType = getReportType(type);

    const data = this.ReportService.getReportById(id);
    return res.status(HttpStatus.OK).json({
      message: `Report with ID ${id} and type ${reportType} retrieved successfully`,
      data
    });
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() req: CreateReportDto,
    @Res() res: Response) {

    const reportData = {
      source: req.source,
      amount: req.amount
    };
    const reportType = getReportType(type);

    const data = this.ReportService.createReport(reportType, reportData);
    return res.status(HttpStatus.CREATED).json({
      message: `Report of type ${reportType} created successfully`,
      data
    });
  }

  @Put(':id')
  updateReport(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateReportDto,
    @Res() res: Response) {

    const data = this.ReportService.updateReport(id, body);

    if (data === null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Report with ID ${id} not found`
      });
    }
    return res.status(HttpStatus.OK).json({
      message: `Report with ID ${id} updated successfully`,
      data
    });
  }

  @Delete(':id')
  deleteReport(
    @Param('id') id: string,
    @Res() res: Response) {
    const isDeleted = this.ReportService.deleteReport(id);
    if (!isDeleted) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Report with ID ${id} not found`
      });
    }
    return res.status(HttpStatus.OK).json({
      message: `Report with ID ${id} deleted successfully`
    });
  }
}
