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
app.get("/atualizar", function(req, res){
    res.render("atualizar")
})



app.post("/cadastrar", function(req, res){
    agendamentosRef = db.collection('agendamentos')
    var res1 = 
        agendamentosRef.doc("colecao").set({//no codigo do prof esta add ao inves de set nao eh possivel usar add setando a colecao doc que eh necessaria para usar update
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



app.get("/consulta", function(req, res){
    agendamentosRef = db.collection('agendamentos')
    var res4 =
    agendamentosRef.get()
    .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    const dados = doc.data();
    console.log(dados);
    });
}).catch((error) => {
    console.error('Erro ao ler dados da coleção:', error);
});
})
app.post('/deletar', function(req, res) {
    agendamentosRef = db.collection('agendamentos');
    var res5 = agendamentosRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
            res.redirect("/");
        })
        .catch((erro) => {
            console.log("Erro ao excluir ou encontrar os dados do banco: " + erro);
        });
});

app.post("/atualizar", function(req, res){
    agendamentosRef = db.collection('agendamentos')
    var res2 = 
    agendamentosRef.doc("colecao").update({  //req.body.id
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    })
})

app.listen(8081, function(){
    console.log("Servidor ativo!")
})

/*app.post("/atualizar", function(req, res) {
    agendamentosRef = db.collection('agendamentos');
    agendamentosRef
        .doc(req.body.id)
        .update({
            nome: req.body.nome,
            telefone: req.body.telefone,
            origem: req.body.origem,
            data_contato: req.body.data_contato,
            observacao: req.body.observacao
        })
        .then(function() {
            res.redirect("/consulta");
        })
        .catch(function(erro) {
            console.log("Erro ao atualizar os dados no banco: " + erro);
            res.status(500).send("Ocorreu um erro ao atualizar os dados no banco.");
        });
});





/*const deletar = async function (collection, doc) {
    const res = await firebase.db.collection(collection).doc(doc).delete().then(
        console.log("deletado")
    );
}
*/
/*
app.post('/delete', async (req, res) => {
    const { name } = req.body.name
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.delete({
        [name]: FieldValue

    })


app.post("/atualizar", function(req, res){
    agendamentosRef = db.collection('agendamentos')
    var res2 = 
    agendamentosRef.update({
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



/*
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







/*
    app.listen(8081, function(){
        console.log("Servidor ativo!")
})


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
/*
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