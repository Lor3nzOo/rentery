import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class RentalService {
  constructor(private readonly prisma: PrismaService) {}

  async myRentals(req) {
    const username = req.cookies['username']

    if (username) {
      const user = await this.prisma.user.findFirst({
        where: {
          // @ts-ignore
          username
        }
      })
      if (user) {
        const rentals = await this.prisma.property.findMany({
          where: {
            authorId: user.id
          }
        })
        return {
          statusCode: 200,
          rentals
        }
      } else {
        throw new BadRequestException('No session!')
      }
    } else {
      throw new BadRequestException('No session!')
    }
  }

  async newRental(req, rental, files) {
    const session = req.cookies['session']
    let fileNames = []
    for (let i = 0; i < files.length; i++) {
      fileNames = [...fileNames, files[i].filename]
    }

    if (session) {
      const user = await this.prisma.user.findFirst({
        where: {
          // @ts-ignore
          session
        }
      })
      if (user) {
        let {name, description, price, beds, rooms, guests, area, air, smoke, pets, location, customData} = rental

        const rentalFound = await this.prisma.property.findUnique({
          where: {
            name
          }
        })
        if (rentalFound) {
          throw new BadRequestException('Rental with the same name already exists!')
        }

        customData = customData.split(",")
        const newRental = await this.prisma.property.create({
          data: {
            authorId: user.id,
            name,
            description,
            night: parseFloat(price),
            beds: parseInt(beds),
            rooms: parseInt(rooms),
            guests: parseInt(guests),
            area: parseInt(area),
            air: Boolean(air),
            smoke: Boolean(smoke),
            pets: Boolean(pets),
            location,
            customData,
            images: fileNames
          }
        })

        return {newRental}
      } else {
        throw new BadRequestException('No session!')
      }
    } else {
      throw new BadRequestException('No session!')
    }
  }

  async findRental(req) {
    const id = req.cookies['id']

    if (id) {
      const rental = await this.prisma.property.findUnique({
        where: {
          id
        }
      })

      if (rental) {
        return {
          statusCode: 200,
          rental
        }
      } else {
        throw new BadRequestException('Invalid Id!')
      }
    } else {
      throw new BadRequestException('No Id provided!')
    }
  }
}
