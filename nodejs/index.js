import express from 'express';
import cors from 'cors'
import webListRouter from './router/webListRouter.js'
import $ from 'jquery';

const app = express()
const port = 8088

console.log(123)
console.log($.ajax);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))




app.use('/weblist', webListRouter)



app.listen(port, () => {
  console.log(`express server running at http://127.0.0.1:${port}`);
})




