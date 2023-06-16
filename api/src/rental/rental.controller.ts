import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { diskStorage } from "multer"
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {editFileName} from "./editFileName";
import * as Jimp from 'jimp';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}
  @Get('/myRentals')
  myRentals(@Req() req) {
    return this.rentalService.myRentals(req)
  }

  @Post('new')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './upload',
      filename: editFileName
    })
  }))
  async newRental(@Req() req, @Body() rental, @UploadedFiles() files) {
    const processedFiles = [];

    for (const file of files) {
      const image = await Jimp.read(file.path);
      await image.cover(360, 240);
      await image.writeAsync(`${file.path}-resized.jpg`);

      processedFiles.push({
        ...file,
        path: `${file.path}-resized.jpg`,
      });
    }

    return this.rentalService.newRental(req, rental, processedFiles)
  }

  @Get('preview')
  findRental(@Req() req) {
    return this.rentalService.findRental(req)
  }
}
