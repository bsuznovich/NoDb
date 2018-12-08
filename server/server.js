const express = require('express')
const PORT = 4321
const controller = require('./Controllers.js')

const app = express()

app.use(express.json())

app.get('/api/list', controller.getList)

app.post(`/api/list`, controller.addToList)

app.delete(`/api/list/:id`, controller.removeFromList)

app.put(`/api/list/:id`, controller.editList)



app.listen(PORT, () => console.log(`listening on port ${PORT}`))