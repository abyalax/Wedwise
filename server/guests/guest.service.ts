import { MetaRequest } from '~/common/types/meta';
import { Guest, Prisma } from '~/generated/prisma/client';
import { mapSorting } from '../base/mapping';
import { Service } from '../base/services';
import { GuestRepository } from './guest.repository';

class GuestService extends Service<GuestRepository> {
  constructor() {
    super(new GuestRepository());
  }

  paginateGuest(params: MetaRequest) {
    const order_by = mapSorting(
      {
        sort_by: params.sort_by,
        sort_order: params.sort_order,
      },
      ['name', 'phone', 'participant', 'email', 'reason', 'notes', 'rsvpStatus'],
    );

    return this.repository.paginate<Guest>({
      page: params.page,
      per_page: params.per_page,
      search: {
        fields: ['name', 'phone', 'email', 'reason', 'notes'],
        term: params.search,
      },
      order_by,
    });
  }

  create(data: Prisma.UserCreateInput) {
    return this.repository.create(data);
  }

  findById(id: string) {
    return this.repository.findById(id);
  }
}

export const guestService = new GuestService();
