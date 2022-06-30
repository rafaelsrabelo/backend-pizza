import { Order } from "@prisma/client";
import prismaClieint from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class RemoveOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = prismaClieint.order.delete({
      where: {
        id: order_id
      }
    })

    return order;
  }
}

export { RemoveOrderService }