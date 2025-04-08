import { scheduleJob } from 'node-schedule'

const { axios } = await import('./utils.mjs')

scheduleJob('* * * * * *', async () => {
  axios.get('/').catch(console.log)
})
