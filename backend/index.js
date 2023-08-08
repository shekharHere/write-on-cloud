const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors({
  origin: '*'
}));
app.use(express.json()); // this is a middleware used to access req body of any request

// app.get('/', (req, res) => {
//   res.send('Hello Himanshu!')
// })

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
