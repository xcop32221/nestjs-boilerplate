import { mapKeys, pick } from 'lodash'
import * as XLSX from 'xlsx'

export const parsing = (file: Express.Multer.File, headers: Record<string, string>) => {
  const workbook = XLSX.read(file.buffer, { type: 'buffer' })
  const result: Record<string, string>[] = []
  const sheets = workbook.SheetNames.map((name) => workbook.Sheets[name])
  for (const sheet of sheets) {
    const list = XLSX.utils.sheet_to_json(sheet)
    for (const item of list) {
      result.push(mapKeys(pick(item, Object.keys(headers)), (_, key) => headers[key]))
    }
  }
  return result
}
