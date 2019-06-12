/* importação das dependências */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

/* o express nos permite lidar com rotas, parametros, requisições e respoastas */
const app = express();

/* nessa parte estamos configurando nossa aplicação para que suport tanto protocolos http e websocket */
const server = require('http').Server(app);
const io = require('socket.io')(server);

/* essa bloco de código serve para conectar ao mongodb atlas na we */ 
/*
mongoose.connect('mongodb+srv://marcos_2:marcos_2@cluster0-92qbl.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});
*/

/**************************************************************************
    esse bloco de código serve para conectar ao mongo no docker
    comando para instalar o banco mongo no docker
    docker run -d --name mongo-omnistack -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=omnistack -e MONGO_INITDB_ROOT_PASSWORD=omnistack mongo
*/
 mongoose.connect(
     'mongodb://localhost:27017/omnistack?retryWrites=true&authSource=admin', 
     {
       useNewUrlParser: true,
       auth: {
         password: 'omnistack',
         user: 'omnistack'
       }
     },
     err => {
       if (err) console.log(err);
       else console.log('conectado ao mongodb.');
     }
 );

app.use((req, res, nexter) => {
    req.io = io;

    nexter();
});

/* para diferentes URLs de diferentes servidores possa ter acesso a aplicação */
app.use(cors());

/* aqui criamos uma rota para acessar arquivos staticos da aplicação */
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

/* aqui declaramos as outras rotas da aplicação */
app.use(require('./routes'));

server.listen(3333);