// src/tickets/dto/update-ticket.dto.ts

import { IsOptional, IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  @IsNotEmpty()
  requesterName?: string;

  @IsOptional()
  @IsNotEmpty()
  subject?: string;

  @IsOptional()
  @IsNotEmpty()
  assignedImage?: string;

  @IsOptional()
  @IsNotEmpty()
  priority?: string;

  @IsOptional()
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @IsDateString()
  createDate?: Date;
  
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  dueDate?: Date;
}
