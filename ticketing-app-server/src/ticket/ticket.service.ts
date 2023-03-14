import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../ticket/entities/ticket.entity';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly tickets: Repository<Ticket>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> {
    return this.tickets.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.tickets.find();
  }

  async findOne(id: string): Promise<Ticket> {
    return this.tickets.findOne({where: {id}});
  }

  async update(id: string, updateTicketDto: Partial<UpdateTicketDto>): Promise<Ticket> {
    const user = await this.findOne(id);
    const updatedUser = Object.assign(user, updateTicketDto);
    return this.tickets.save(updatedUser);
  }


  async destroy(id: string): Promise<void> {
    await this.tickets.delete(id);
  }
}
