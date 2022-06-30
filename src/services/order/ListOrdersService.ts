import prismaClieint from "../../prisma";

class ListOrdersService {
  async execute () {
    const orders = await prismaClieint.order.findMany({
      where: {
        draft: false,
        status: false
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    return orders;
  }
}

export { ListOrdersService }