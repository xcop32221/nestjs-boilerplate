const modules = require.context('./modules', true, /^.*\.module\.ts$/)

export default modules.keys().reduce((prev, key) => prev.concat(Object.values<any>(modules(key))), [])
