import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { TicketsService } from '../ticket/ticket.service';
import { Ticket } from '../ticket/entities/ticket.entity';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('create')
  create(@Body() ticket: Ticket) {
    return this.ticketsService.create(ticket);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketsService.findOne(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    const updatedTicket = Object.assign(ticket, updateTicketDto);
    return this.ticketsService.update(id, updatedTicket);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.ticketsService.destroy(id);
  }

}
