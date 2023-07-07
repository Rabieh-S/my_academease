import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) { }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Post(':id/profile')
  addProfilesToDocument(
    @Param('id') documentId: string,
    @Body() body: { profileId: string }
  ) {
    return this.documentService.addProfilesToDocument(documentId, body.profileId);
  }

  @Post(':id/promotion')
  addPromotionsToDocument(
    @Param('id') documentId: string,
    @Body() body: { promotionId: string }
  ) {
    return this.documentService.addPromotionsToDocument(documentId, body.promotionId);
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.delete(id);
  }
}
