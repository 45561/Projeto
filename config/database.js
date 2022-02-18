const mongoose = require("mongoose");

const uri=
"mongodb://StefanyBarcellos:10211021@cluster0-shard-00-00.xgljo.mongodb.net:27017,cluster0-shard-00-01.xgljo.mongodb.net:27017,cluster0-shard-00-02.xgljo.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-k0fqzi-shard-0&authSource=admin&retryWrites=true&w=majority"; //banco de dados online

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose; //Sempre exportar para ser utilizada, entao sempre vai ter essa linha 5s 