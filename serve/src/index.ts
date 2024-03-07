const {server} = require('./server.ts')
const hostname = "127.0.0.1";
const port = 3000;
server.getConnections((err, count)=> {
    console.log('connection client count is :', count)
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
