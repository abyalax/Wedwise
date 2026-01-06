import { convertMetaPagination, prismaList, searchFilter } from './prisma/client';

const fieldSearchable = ['name', 'phone'];
const keySearch = 'Santoso';

const [data, meta] = await prismaList.guest
  .paginate({
    where: {
      invitationId: 1,
      ...searchFilter(fieldSearchable, keySearch),
    },
  })
  .withPages({
    page: 1,
    limit: 10,
  });

const metaPagination = convertMetaPagination(meta, 10);

console.log({ data, metaPagination });
