import { prisma } from "@prisma/client";
import prismaClieint from "../../prisma";

class ListCategoryService {
  async execute() {
    const category = await prismaClieint.category.findMany({
      select: {
        id: true,
        name: true
      }
    })

    return category
  }
}

export { ListCategoryService}