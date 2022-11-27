import express from 'express'
import connection from '../db/index.js'

const router = express.Router()

//根据type和num获取weblist
router.get('/?type=:type&num=:num', (req, res) => {
  console.log(req.query);
  const sql = `select * from weblist where type = ${req.query.type} and num = ${req.query.num}`

  connection.query(sql, (err, results) => {
    if(err) return res.send(err)
    res.send({
      message: "获取指定list成功",
      data: results
    })
  })
  
})

//获取全部weblist
router.get('/', (req, res) => {
  console.log(req);
  const sql = `select * from weblist`

  connection.query(sql, (err, results) => {
    if(err) return res.send(err)
    res.send({
      message: "获取全部list成功",
      data: results
    })
  })
  
})


//收藏
router.put('/:webId', (req, res) => {
  // console.log(req.params);
  const sqls = [
    `update weblist set ${req.body.type} = ${req.body.type} + ${req.body.num} where id = ${req.params.webId}`,
    `select ${req.body.type} from weblist where id = ${req.params.webId}`
  ]

  new Promise((resolve, reject) => {
    connection.query(sqls[0], (err, results) => {
      if(err) reject(err)
      resolve(results)
    })
  }).then(value => {
    return new Promise((resolve, reject) => {
      connection.query(sqls[1], (err, results) => {
        if(err) reject(err)
        resolve(results)
      })
    })
  }).then(value => {
    res.send({
      message:"收藏成功",
      num: value[0]
    })
  })



})




















export default router