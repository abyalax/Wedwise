import { prisma } from '~/db/prisma/client';
import { Prisma } from '~/generated/prisma/client';
import { Repository } from '../base/repositories';

export class GuestRepository extends Repository<Prisma.GuestDelegate, Prisma.GuestWhereInput, Prisma.GuestOrderByWithRelationInput> {
  constructor() {
    super(prisma.guest);
  }

  _getModel() {
    return this.model;
  }

  findById(id: string) {
    return this.model.findFirstOrThrow({
      where: {
        id: Number(id),
      },
    });
  }
}
