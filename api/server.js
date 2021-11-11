const express = require("express");
const accountsRouter = require("./accounts/accounts-router")
const {logger} = require('./accounts/accounts-middleware');
const server = express();

server.use(express.json());
server.use("/api/accounts",accountsRouter);
server.use(logger);

server.get('/',(req,res) => {
    res.status(200).send(
        `<h2>Project 1 Databases</h2>`
    )
})

server.use('*', (req,res)=> {
    res.status(500).json({
        message: "Incorrect path"
    })
})


module.exports = server;
