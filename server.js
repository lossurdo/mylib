const express = require('express')
const app = express()
const port = 9000

app.use(express.static('static'));
app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
    res.send('Olá mundo!')
})

app.listen(port, () => {
    console.log(`Porta: ${port}`)
})