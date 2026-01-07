/** biome-ignore-all lint/suspicious/noExplicitAny: <generic repositories> */
import { MetaResponse } from '~/common/types/meta';
import { SortOrderInput } from '~/generated/prisma/commonInputTypes';

export type GenericOrderBy = {
  [key: string]: 'ASC' | 'DESC';
};

export type PaginateOptions<Where, OrderBy, Entity> = {
  page: string | number;
  per_page: string | number;
  search?: {
    term?: string;
    fields: (keyof Entity)[];
  };
  where?: Where;
  order_by?: OrderBy | GenericOrderBy | SortOrderInput;
};

export class Repository<
  ModelDelegate extends {
    aggregate: any;
    groupBy: any;
    count: any;

    create: any;
    createMany: any;
    createManyAndReturn: any;

    delete: any;
    deleteMany: any;

    findFirst: any;
    findFirstOrThrow: any;
    findMany: any;
    findUnique: any;
    findUniqueOrThrow: any;

    update: any;
    updateMany: any;
    upsert: any;
    fields: any;
  },
  Where,
  OrderBy,
> {
  protected model: ModelDelegate;

  constructor(model: ModelDelegate) {
    this.model = model;
  }

  _getModel() {
    return this.model;
  }

  async create(data: any) {
    return this.model.create({ data });
  }

  async createMany(data: any[]) {
    return this.model.createMany({ data });
  }

  async update<E = any>(id: string | number, data: any): Promise<E> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string | number) {
    return this.model.delete({ where: { id } });
  }

  async paginate<T>(options: PaginateOptions<Where, OrderBy, T>): Promise<{ items: T[]; meta: MetaResponse }> {
    const page = Number(options.page) || 1;
    const per_page = Number(options.per_page) || 10;
    const search = options.search;
    const orderBy = {};
    let where = options.where ?? {};

    // --- Advanced Search Across Fields ---
    if (search?.term && search.fields?.length) {
      const searchFilter = {
        OR: search.fields.map((field) => ({
          [field]: { contains: search.term, mode: 'insensitive' },
        })),
      };

      where = {
        AND: [where, searchFilter],
      };
    }

    const total_count = await this.model.count({
      where,
    });

    for (const [key, value] of Object.entries(options.order_by || {})) {
      if (!key || key === 'undefined' || key === 'null') continue;
      if (value !== 'ASC' && value !== 'DESC') continue;
      Object.assign(orderBy, { [key]: value });
    }

    const items: T[] = await this.model.findMany({
      orderBy,
      where,
      skip: (page - 1) * per_page,
      take: per_page,
    });

    const total_pages = Math.ceil(total_count / per_page);

    return {
      // TODO:
      items: [...items, ...items],
      meta: {
        page,
        per_page,
        total_count,
        total_pages,
      },
    };
  }
}
