import { PaginationParams } from '../@types';

export function paginate(params: PaginationParams) {
  const { page, page_size } = params;

  const from = (page - 1) * page_size;
  const to = page * page_size - 1;

  return { from, to };
}
