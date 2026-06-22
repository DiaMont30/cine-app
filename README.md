# CineApp 🎬

O **CineApp** é um aplicativo mobile desenvolvido em React Native para descobrir, buscar e organizar filmes utilizando dados da API do TMDB.

O aplicativo permite que o usuário entre com sua conta do TMDB, visualize informações detalhadas sobre filmes, salve favoritos e mantenha uma lista de filmes assistidos.

## Funcionalidades

* Autenticação com conta do TMDB
* Persistência da sessão do usuário
* Listagem de filmes populares
* Listagem de lançamentos
* Listagem dos filmes mais bem avaliados
* Busca de filmes por nome
* Visualização de detalhes dos filmes
* Adição e remoção de favoritos
* Favoritos salvos na conta do TMDB
* Lista personalizada de filmes assistidos
* Adição e remoção de filmes assistidos
* Perfil do usuário
* Tema claro e escuro
* Persistência da preferência de tema
* Navegação por Stack e Bottom Tabs
* Validação de campos e tratamento de erros

## Tecnologias utilizadas

Este projeto foi desenvolvido utilizando:

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Navigation](https://reactnavigation.org/)
* [Axios](https://axios-http.com/)
* [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
* Context API
* Expo Linear Gradient
* Expo Vector Icons
* API do [TMDB — The Movie Database](https://www.themoviedb.org/)

## Estrutura principal

```text
cine-app/
├── assets/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── domains/
│   ├── pages/
│   ├── routes/
│   └── themes/
├── App.tsx
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
└── README.md
```

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/DiaMont30/cine-app.git
```

### 2. Acesse a pasta do projeto

```bash
cd cine-app
```

### 3. Instale as dependências

Com o `package-lock.json` atualizado, utilize:

```bash
npm ci
```

Também é possível utilizar:

```bash
npm install
```

### 4. Configure o token do TMDB

Na raiz do projeto, crie um arquivo chamado:

```text
.env.local
```

Adicione o token de leitura da API do TMDB:

```env
EXPO_PUBLIC_TMDB_TOKEN=SEU_TOKEN_DE_LEITURA_DA_TMDB
```

O arquivo `.env.local` não deve ser enviado ao GitHub.

### 5. Verifique o TypeScript

```bash
npx tsc --noEmit
```

Se o terminal não apresentar mensagens, o projeto está sem erros de tipagem.

### 6. Inicie o Expo

```bash
npm start
```

Ou:

```bash
npx expo start
```

Quando o Expo solicitar autenticação, é possível selecionar:

```text
Proceed anonymously
```

Depois:

* escaneie o QR Code com o Expo Go;
* pressione `w` para abrir a versão web;
* pressione `a` para abrir no Android, caso exista um emulador configurado.

O celular e o computador devem estar conectados à mesma rede Wi-Fi para a execução pelo modo LAN.

## Scripts disponíveis

```bash
npm start
```

Inicia o servidor de desenvolvimento do Expo.

```bash
npm run android
```

Inicia o projeto para Android.

```bash
npm run ios
```

Inicia o projeto para iOS.

```bash
npm run web
```

Inicia a versão web.

## Download do APK

O APK do CineApp pode ser acessado pelo link abaixo:

https://expo.dev/accounts/leonamngr/projects/cine-app/builds/73f526eb-a824-415d-b771-52e451e9b21c

## Equipe de desenvolvimento

**Grupo 1 — Turma 34**

| Integrante            | GitHub                                               |
| :-------------------- | :--------------------------------------------------- |
| **Ana Paula Pimenta** | [@anapimenta74](https://github.com/anapimenta74)     |
| **Diana Monteiro**    | [@DiaMont30](https://github.com/DiaMont30)           |
| **Laís Ferrari**      | [@laislaferrari](https://github.com/laislaferrari)   |
| **Leonam Machado**    | [@LeonamNgr](https://github.com/LeonamNgr)           |
| **Thiago Sinesio**    | [@thiago-sinesio](https://github.com/thiago-sinesio) |

## Observação

Este projeto foi desenvolvido para fins educacionais durante a formação em Desenvolvimento de Software do Serratec.
