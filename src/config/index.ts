import { existsSync, readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { defaultsDeep, pick } from 'lodash'
// import { NacosConfigClient } from 'nacos'

export default async () => {
  const path = `config/${process.env.NODE_ENV}.yaml`
  if (!existsSync(path)) throw new Error('配置文件不存在')
  const config: any = yaml.load(readFileSync(path, 'utf8'))
  // const { nacos } = config
  // if (nacos) {
  //   const configClient = new NacosConfigClient(pick(nacos, ['serverAddr', 'namespace', 'identityKey', 'identityValue']))
  //   const content = await configClient.getConfig(nacos.dataId, 'DEFAULT_GROUP')
  //   console.log(defaultsDeep(yaml.load(content), config))
  //   return defaultsDeep(yaml.load(content), config)
  // }
  return config
}
