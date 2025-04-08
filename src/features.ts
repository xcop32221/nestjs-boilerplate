import { Severity, buildSchema } from '@typegoose/typegoose'

const schemas = require.context('./entities', true, /^\.\/(?!(base|index)).+\.entity\.ts$/)

const features = []

schemas.keys().forEach((key) => {
  const model = schemas(key)
  const keys = Object.keys(model)
  for (const key of keys) {
    const cl = model[key]
    const schema = buildSchema(cl, { schemaOptions: cl.options, options: { allowMixed: Severity.ALLOW } })
    features.push({ name: cl.name, schema })
  }
})

export default features
