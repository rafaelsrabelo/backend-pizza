import prismaClient from '../../prisma'
import { hash } from "bcryptjs"

interface UserRequest {
  name: string;
  emaill: string;
  password: string;
}

class CreateUserService{
  async execute ({ name, emaill, password }: UserRequest) {
    
    if(!emaill) {
      throw new Error("emaill incorret")
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        emaill: emaill
      }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name: name,
        emaill: emaill,
        password: passwordHash
      },
      select: {
        id: true,
        emaill: true,
        name: true,
      }
      
    })

    return user;
  }
}

export { CreateUserService }