import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.interface';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('reservations')
@UseGuards(RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @Roles('admin', 'staff')
  async findAll(
    @Query('limit') limit = '5',
    @Query('lastDoc') lastDoc?: string,
  ) {
    const data = await this.reservationsService.findAll(Number(limit), lastDoc);
    return data;
  }

  @Get(':id')
  @Roles('admin', 'staff')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() reservation: Reservation) {
    return this.reservationsService.create(reservation);
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() reservation: Reservation) {
    return this.reservationsService.update(id, reservation);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
