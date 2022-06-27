import prismaClieint from "../../prisma";

class DetailUserService{
  async execute (user_id: string) {
    const user = await prismaClieint.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        name: true,
        emaill: true
      }
    })

    return user;
  }
}

export { DetailUserService }