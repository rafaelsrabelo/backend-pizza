import prismaClieint from "../../prisma";

interface DetailRequest {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: DetailRequest) {

    const orders = await prismaClieint.item.findMany({
      where: {
        order_id: order_id
      },
      include: {
        product: true,
        order: true
      }
    })

    return orders;
  }
}

export {DetailOrderService}