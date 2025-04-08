# 更新日志

## [2.0.0] - 2024-10-21

### feature

- 移除 `@nestjs/swagger CLI Plugin`
- 引入swc 优化打包速度
- 优化代码结构
- 引入 `mongoose-aggregate-paginate-v2` 聚合分页插件

## [1.0.5] - 2023-07-27

### feature

- 引入 `mongoose-paginate-v2` 分页插件

## [1.0.4] - 2023-07-18

### fix

- 修复不能断点调试问题

## [1.0.3] - 2023-05-10

### feature

- 优化报错信息

## [1.0.2] - 2023-05-09

### feature

- 独立任务服务
- 添加 `swagger` 生成文档

## [1.0.1] - 2022-10-25

### chore

- 更新依赖

### feature

- 自动导入 `entities` ,不再需要手动调用 `buildSchema` 创建 schema
- 自动导入 `modules` 中模块
