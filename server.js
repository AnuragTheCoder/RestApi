const http=require('http');
const app=require('./app');

const server=http.createServer(app);
const port=process.env.PORT ||4000
app.listen(port,console.log("App is Listening on "+port))