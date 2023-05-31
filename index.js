
const express = require('express');
const { google } = require('googleapis');
const admin = require('firebase-admin');

const app = express();
app.use(express.urlencoded({ extended: false }));

const serviceAccount = require('./autenticacao-31624-firebase-adminsdk-vr53a-b788b00f25.json');


const projectId = 'meu-projeto-4794b';
// Configuração do Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${projectId}.firebaseio.com`
  });

const auth = admin.auth();

// Configurações do cliente OAuth 2.0 do Google
const client = new google.auth.OAuth2(
    '666832417111-76j5uju8i24nt9s3br3l4cu0of5562ub.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/callback'
);

// Registrar um novo usuário
const email = 'psilvawps@gmail.com';
const password = 'senha123';

admin.auth().createUser({
  email: email,
  password: password
})
  .then((userRecord) => {
    // Usuário registrado com sucesso
    console.log('Usuário registrado:', userRecord.toJSON());
  })
  .catch((error) => {
    // Ocorreu um erro ao registrar o usuário
    console.error('Erro ao registrar o usuário:', error);
  });

// Rota de autenticação com o Google
app.get('/login', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/userinfo.email'];
  const authUrl = client.generateAuthUrl({ scope: scopes });

  res.redirect(authUrl);
});

// Rota de callback após a autenticação com o Google
app.get('/callback', (req, res) => {
  const { code } = req.query;

  client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Erro durante a autenticação:', err);
      return res.send('Erro durante a autenticação.');
    }

    client.setCredentials(tokens);
    const oauth2 = google.oauth2({ auth: client, version: 'v2' });

    oauth2.userinfo.get((err, response) => {
      if (err) {
        console.error('Erro ao obter informações do usuário:', err);
        return res.send('Erro ao obter informações do usuário.');
      }

      const { email } = response.data;

      auth.getUserByEmail(email)
        .then((userRecord) => {
          // Verifica se o usuário existe
          if (!userRecord) {
            console.error('Usuário não encontrado no Firebase.');
            return res.send('Usuário não encontrado.');
          }

          // Obtendo a UID do usuário
          const uid = userRecord.uid;

          // Autenticação bem-sucedida, você pode acessar o usuário autenticado usando userRecord
          console.log('Usuário autenticado:', userRecord.toJSON());
          console.log('UID do usuário:', uid);
          res.send('Autenticação bem-sucedida!');
        })
        .catch((error) => {
          console.error('Erro durante a autenticação:', error);
          res.send('Erro durante a autenticação.');
        });
    });
  });
});

// Inicialização do servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
