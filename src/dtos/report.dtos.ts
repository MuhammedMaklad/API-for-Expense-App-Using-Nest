/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { ReportType } from "src/data";


export class CreateReportDto {

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {

  @IsNumber()
  @IsPositive()
  amount?: number;

  @IsString()
  source?: string;
}

export class ReportResponseDto {

  id: string;
  source: string;
  amount: number;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }
  @Exclude()
  created_at: Date;

  @Exclude()
  update_at: Date;

  type: ReportType;
}