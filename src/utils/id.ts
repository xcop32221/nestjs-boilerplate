import { customAlphabet } from 'nanoid'
import { alphanumeric } from 'nanoid-dictionary'

export const nanoid = customAlphabet(alphanumeric, 10)
