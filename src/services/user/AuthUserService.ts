import prismaClieint from "../../prisma";
import { compare } from "bcryptjs";

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

    return { ok: true }
  }
}

export { AuthUserService }