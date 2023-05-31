const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
const admin = require('firebase-admin');
const serviceAccount = require('./autenticacao-31624-firebase-adminsdk-vr53a-b788b00f25.json');




const projectId = 'meu-projeto-4794b';
// Configuração do Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${projectId}.firebaseio.com`
  });

  const db = getFirestore()



app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

const add = async function (data) {
    const res = await firebase.db.collection('agendamentos').doc(data.nome).set(data).then(
        console.log("adicionado")
    );
}

app.post("/cadastrar", function(req, res){
    agendamentosRef = db.collection('agendamentos')
    var res = 
        agendamentosRef.add({//no codigo do prof esta add ao inves de set
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
    console.log('Added document');
    res.redirect('/')   
    })
    
})

    app.listen(8081, function(){
        console.log("Servidor ativo!")
})
/*

app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.get("/editar/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then(function(post){
        res.render("editar", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.get("/excluir/:id", function(req, res){
    post.destroy({where: {'id': req.params.id}}).then(function(){
        res.render("primeira_pagina")
    }).catch(function(erro){
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})

app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/consulta")
    })
})

app.listen(8081, function(){
    console.log("Servidor ativo!")
})



*/
/**
 * const firebase = require("./firebase")

const add = async function (data) {
    const res = await firebase.db.collection('agendamentos').doc(data.nome).set(data).then(
        console.log("adicionado")
    );
}

const update = async function (collection, doc, data) {
    const ref = firebase.db.collection(collection).doc(doc)
    const res = await ref.update(data).then(console.log("atualizado"))
}


const deletar = async function (collection, doc) {
    const res = await firebase.db.collection(collection).doc(doc).delete().then(
        console.log("deletado")
    );
}

const read = async function (collection, doc) {
    firebase.db.collection(collection).get()
                  .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                  const dados = doc.data();
                  console.log(dados);
                  });
}).catch((error) => {
                  console.error('Erro ao ler dados da coleção:', error);
});

}
 * 
 */