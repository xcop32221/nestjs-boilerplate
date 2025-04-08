import { PageQueryDto } from '@dtos/page.query.dto'
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

const SortOrder = {
  '-1': -1,
  1: 1,
  asc: 1,
  ascending: 1,
  desc: -1,
  descending: -1,
}

export const transform = (value: any) => {
  const { pageSize = 20, current = 1, sortBy = 'createdAt', sortOrder = -1, entire, query, ...rest } = value
  const options = {
    limit: pageSize,
    offset: (current - 1) * pageSize,
    sort: {
      [sortBy]: SortOrder[sortOrder],
    },
    pagination: !entire,
    customLabels: {
      totalDocs: 'total',
      docs: 'list',
    },
    allowDiskUse: true,
  }
  return {
    options,
    query: rest,
  }
}

@Injectable()
export class ParseQueryPipe implements PipeTransform {
  transform(value: PageQueryDto & Record<string, string | number | boolean>, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'query') return value
    return transform(value)
  }
}
