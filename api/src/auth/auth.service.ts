import {Injectable, BadRequestException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import * as b from 'bcrypt'
import * as c from 'crypto'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async usernameExists(user) {
    const { username } = user
    const exists = await this.prisma.user.findUnique({
      where: {
        username
      }
    })
    if (exists) {
      return true
    } else {
      return false
    }
  }

  async emailExists(user) {
    const { email } = user
    const exists = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (exists) {
      return true
    } else {
      return false
    }
  }

  async register (user) {
    const { username, email, password } = user

    const userFound = await this.prisma.user.findUnique({
      where: {
        username
      }
    })
    if (userFound) {
      throw new BadRequestException('Error occurred!')
    }

    const hash = await b.hash(password, 10)
    const created = await this.prisma.user.create({
      data: {
        username,
        email,
        hash,
        session: c.randomUUID()
      }
    })

    if (created) {
      return 'User created!'
    } else {
      throw new BadRequestException('Error occurred while creating user!')
    }
  }

  async login (user, res) {
    const { email, password } = user

    const userFound = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!userFound) {
      throw new BadRequestException('Error occurred!')
    }
    if (await b.compare(password, userFound.hash)) {
      const session = c.randomUUID()
      await this.prisma.user.update({
        where: {
          email
        },
        data: {
          session
        }
      })
      res.cookie('session', session)
      res.send('Successfully logged in!')
    } else {
      throw new BadRequestException('Invalid credentials!')
    }
  }

  async session(req) {
    const session = req.cookies['session']

    if (session) {
      const user = await this.prisma.user.findFirst({
        where: {
          // @ts-ignore
          session
        }
      })
      if (user) {
        return {
          username: user.username,
          email: user.email,
          statusCode: 200
        }
      } else {
        throw new BadRequestException('No session!')
      }
    } else {
      throw new BadRequestException('No session!')
    }
  }
}
