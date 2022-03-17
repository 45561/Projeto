const conexao = require("../config/database"); //recebe a conexão do banco de dados

var UsuarioSchema = conexao.Schema({
  //modelo de criação do usuario(como serão salvos no banco de dados)
  nome: { type: "String" },
  email: { type: "String" },
  foto: { type: "String" },
  senha: { type: "String" },
});

module.exports = conexao.model("Usuario", UsuarioSchema); //usar Schema, pois ira ajudar quando formos exportar
