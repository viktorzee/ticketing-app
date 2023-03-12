import { Module } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { TicketsController } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  exports: [TypeOrmModule, TicketsService],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketModule {}
