import prismaClient from '../../prisma'

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

    const user = await prismaClient.user.create({
      data: {
        name: name,
        emaill: emaill,
        password: password
      },
      select: {
        id: true,
        emaill: true,
        name: true,
        created_at: true,
        updated_at: true
      }
      
    })

    return user;
  }
}

export { CreateUserService }