const fs = require('fs')
const http = require('http')
const data = require('./data/employees.json')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {

res.send("Hello World")

})

app.get('/employee', (req, res) => {
    
    if(!data){
        res.send("Make sure that you have accessible data")
    }else {
        res.send(data)
    }
})


app.get('/employee/:id', (req,res) =>{
    const eData = data.employees.find(function(worker){
        // console.log(worker.id)
        return parseInt(req.params.id) === worker.id
    })
if(!eData){
    res.status(404).send(`Couldn't find employee matching that ID`)
}else{
    res.send(eData)
}
})

app.post('/employee', (req, res) => {

    const eData = {
        name: req.body.name,
        id: data.employees.length + 1,
        salary: req.body.salary,
        department: req.body.department,
    }
    
    if(!eData){
        res.status(404).send(`Couldn't post new employees`)
    }else {
        data.employees.push(eData)
        res.send(eData)
        console.log(eData)
    }
return
})

app.put('/employee/:id', (req,res) =>{
    const eData = data.employees.find(function(worker){
        
        return parseInt(req.params.id) === worker.id
        
    })
    if(!eData){
        res.status(404).send(`Couldn't find employee matching that ID`)
    }else {
        eData.name = req.body.name
        eData.salary = req.body.salary
        eData.department = req.body.department

        res.send(eData)
        console.log(eData)
    }
})

app.delete('/employee/:id', (req,res) =>{
    const eData = data.employees.find(function(worker){
        
        return parseInt(req.params.id) === worker.id
    })
if(!eData){
    res.status(404).send(`Couldn't find employee matching that ID`)
}else{
    const index = data.employees.indexOf(eData)
    data.employees.splice(index, 1)

    res.send(eData)
    console.log(eData)
}
})


    
const port = 5000

app.listen(port, () =>{
    console.log(`This server is running on ${port}`)
})




// const server = http.createServer(function(req,res){

//     if(req.url == '/employee'){
//         const newData = JSON.stringify(data)
//         if(!newData){
//             res.end("Make sure that you have accessible data")
//         } else{
//             res.end(newData)
//         }
//     }
// })













// fs.readFile('cartoons.txt', {encoding: 'utf-8'}, (err, data) =>{

// if(err){
//     console.log(err)
// }else{
//     console.log(data)
// }

// } )

