import prismaClieint from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface AuthRequest {
  emaill: string;
  password: string;
}

class AuthUserService {
  async execute({ emaill, password}: AuthRequest) {
    const user = await prismaClieint.user.findFirst({
      where: {
        emaill: emaill
      }
    })

    if(!user) {
      throw new Error("User/password incorrect")
    }

    const passwordMath = await compare(password, user.password)

    if(!passwordMath) {
      throw new Error("User/password incorrect")
    }

    const token = sign(
      {
        name: user.name,
        emaill: user.emaill,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )
      
    return {
      id: user.id,
      name: user.name,
      emaill: user.emaill,
      token: token
    }
  }
}

export { AuthUserService }