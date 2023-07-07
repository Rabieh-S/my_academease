import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) { }

  @Get()
  findAll() {
    return this.centerService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('profileId') profileId: string,
    @Param('promotionId') promotionId: string
  ) {
    return this.centerService.findOne(profileId, promotionId);
  }

  @Post(':id/profile')
  addProfileToCenter(
    @Param('centerId') centerId: string,
    @Body() body: { profileId: string }
  ) {
    return this.centerService.addProfileToCenter(centerId, body.profileId);
  }
  @Post(':id/promotion')
  addPromotionsToCenter(
    @Param('centerId') centerId: string,
    @Body() body: { promotionId: string }
  ) {
    return this.centerService.addPromotionsToCenter(centerId, body.promotionId);
  }

  @Post()
  create(@Body() createCenterDto: CreateCenterDto) {
    return this.centerService.create(createCenterDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCenterDto: UpdateCenterDto) {
    return this.centerService.update(id, updateCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centerService.delete(id);
  }
}
