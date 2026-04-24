# Sistema Minimalista de Notícias (React Native + Node.js)

Este é um projeto full-stack para gerenciamento de notícias contendo uma API em Node.js (com Drizzle ORM e SQLite) e um App em React Native (Expo).

## 🛠 Tecnologias
- **Backend:** Node.js, Express, TypeScript, SQLite, Drizzle ORM
- **Frontend:** React Native (Expo), TypeScript, Axios

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:
- [Node.js](https://nodejs.org/en/)
- Aplicativo **Expo Go** instalado no seu celular (iOS ou Android) ou um emulador configurado.

## 🚀 Passo a Passo de Execução

### 1. Rodando o Back-end
Abra o terminal na pasta raiz do servidor (`backend-noticias`).

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Gere as Migrations e crie o Banco de Dados (Drizzle):**
   ```bash
   npx drizzle-kit push
   ```

3. **Inicie o servidor:**
   ```bash
   npx tsx src/server.ts
   ```
   *O servidor rodará localmente na porta `3000`.*

### 2. Rodando o Front-end
Abra um novo terminal na pasta do aplicativo (`app-noticias`).

1. **Configure o IP Local:**
   Descubra seu IP IPv4 (na rede Wi-Fi) e atualize o arquivo `src/services/api.ts` com o seu IP. Exemplo: `baseURL: 'http://192.168.0.x:3000'`.

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o aplicativo:**
   ```bash
   npx expo start
   ```
   *Escaneie o QR Code gerado no terminal usando o aplicativo Expo Go no seu celular.*

## 📡 Endpoints da API

A API REST responde na porta `3000` e possui as seguintes rotas de acesso:

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/noticias` | Retorna a lista de todas as notícias cadastradas. |
| `POST` | `/noticias` | Cria uma nova notícia. O corpo da requisição deve conter `{ titulo, conteudo }`. |
| `PUT` | `/noticias/:id` | Edita uma notícia existente baseada no ID informado. |
| `DELETE`| `/noticias/:id` | Exclui uma notícia específica pelo ID. |

---
*Desenvolvido como projeto prático de estudo.*
