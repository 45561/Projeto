var express = require("express");
var app = express();
var Usuario = require("./model/Usuario");
var path = require("path"); //acessa as pastas do servidor dentro da pasta principal
var upload = require("./config/multer");
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); //transforma os dados do post, em dados que o usuario possa visualizar.

app.get("/add", function (req, res) {
  res.render("index.ejs", {});
});

app.post("/add", upload.single("foto"), function (req, res) {
  var usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.file.filename,
  });

  usuario.save(function (err, docs) {
    if (err) {
      res.send(" Aconteceu o erro: " + err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/", function (req, res) {
  //vai buscar todos os dados
  Usuario.find({}).then(function (docs) {
    //chaves vazias significa pegar (pesquisar) todos, se eu por nome, eu pegarei penas aquele nome.Imprime os dados
    res.render("list.ejs", { Usuarios: docs }); //res.send(docs) fica em formato de packagejson
  });
});

app.post("/", function (req, res) {
  if (req.body.tipo == "nome") {
    Usuario.find({ nome: new RegExp(req.body.pesquisa, "i") }).then(function (
      docs
    ) {
      res.render("list.ejs", { Usuarios: docs });
    });
  } else {
    Usuario.find({ email: new RegExp(req.body.pesquisa, "i") }).then(function (
      docs
    ) {
      res.render("list.ejs", { Usuarios: docs });
    });
  }
});

app.get("/edt/:id", function (req, res) {
  Usuario.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("edit.ejs", { Usuario: docs });
  });
});

app.post("/edt/:id", function (req, res) {
  Usuario.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      foto: req.body.foto,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu um erro:" + err);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/del/:id", function (req, res) {
  Usuario.findByIdAndDelete(req.params.id, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen("3000", function () {
  //Escuta as coisas, espera (Cannot GET /)
  console.log("Servidor iniciando!"); //Função call beck
});
