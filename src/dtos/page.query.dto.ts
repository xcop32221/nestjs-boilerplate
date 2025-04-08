import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'

export class PageQueryDto {
  @ApiProperty({ name: '当前页' })
  @Min(1)
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  current?: number

  @ApiProperty({ name: '分页大小' })
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  pageSize?: number

  @ApiProperty({ name: '排序字段' })
  @IsOptional()
  @IsString()
  sortBy?: string

  @ApiProperty({ name: '排序 1: 升序 -1: 降序' })
  @IsEnum([-1, 1, 'asc', 'ascending', 'desc', 'descending'])
  @IsOptional()
  sortOrder?: -1 | 1

  @ApiProperty({ name: '是否获取全部数据' })
  @Type(() => Boolean)
  @IsOptional()
  entire?: boolean

  @ApiProperty({ name: '是否删除' })
  @Type(() => Boolean)
  @IsOptional()
  isBlocked?: boolean = false

  // 此处仅作类型定义，需经过ParseQueryPipe转换
  @ApiHideProperty()
  options: {
    limit?: number
    offset?: number
    sort?: Record<string, 1 | -1>
    pagination: boolean
  }
}
