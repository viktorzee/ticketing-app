// src/tickets/dto/create-ticket.dto.ts

import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  requesterName: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  assignedImage: string;

  @IsNotEmpty()
  priority: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsDateString()
  createDate: Date;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;
}
