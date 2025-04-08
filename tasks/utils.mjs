import { existsSync, readFileSync } from 'node:fs'
import axios from 'axios'
import * as yaml from 'js-yaml'
import { get } from 'radash'

const path = `../config/${process.env.NODE_ENV || 'prod'}.yaml`

if (!existsSync(path)) throw new Error('配置文件不存在')

let config = yaml.load(readFileSync(path, 'utf8'))

const instance = axios.create({
  baseURL: get(config, 'service.self'),
  timeout: 10000,
  headers: {
    'x-internal-access': get(config, 'internal.secret'),
  },
})

export { config, instance as axios }
