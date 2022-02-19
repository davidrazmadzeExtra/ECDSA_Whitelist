const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer(function(req, res){
    res.writeHead(200, {'content-Type': 'text/html'})
    fs.readFile('index.html',function(error, data){
        if(error){
            res.wroteHead(404)
            res.write('Error 404: File Not Found')
        }else {
            res.write(data)
        }
        res.end()
    })    
})

server.listen(port, function(error){
    if(error){
        console.log('Something went wrong', error)
    }else {
        console.log('Server is listening to port: ' + port)
    }
})

/* type `node app.js` in terminal and open 'http://localhost:3000'*/

//x = await SignHelper.getSign('<contractAddress>',1,<id>,'<name>')
//x.signature
//x.stampcolor
//x.background