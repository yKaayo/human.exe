# human.exe

Um projeto full-stack com um frontend em React e um backend em Node.js.

## 🚀 Tecnologias Utilizadas

### Frontend (Client)
- React
- Tailwind
- Axios
- Lottie
- GSAP
- React Hook Form
- Zod

### Backend (Server)
- Fastify
- MongoDB
- Oracle
- Langchain

## 📂 Estrutura do Projeto

O projeto é um monorepo organizado em duas pastas principais:

-   `./client/`: Contém todo o código-fonte do frontend (React + Vite).
-   `./server/`: Contém todo o código-fonte do backend (Node.js).

## ⚙️ Como Rodar o Projeto

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

-   Node.js (versão 18.x ou superior recomendada)
-   npm ou yarn

### Backend (Servidor)

1.  **Navegue até a pasta do servidor:**
    ```bash
    cd server
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz da pasta `server/`. Este arquivo guardará as configurações sensíveis da sua aplicação.
    
    Exemplo de `.env`:
    ```env
    ORACLE_USERNAME
    ORACLE_PASSWORD
    ORACLE_CONNECTION

    SESSION_SECRET
    MONGO_CONNECTION

    OPENAI_API_KEY
    ```

4.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```
    O servidor backend estará rodando em `http://localhost:3000`.

### Frontend (Cliente)

1.  **Abra um novo terminal e navegue até a pasta do cliente:**
    ```bash
    cd client
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a aplicação React:**
    ```bash
    npm run dev
    ```
    A aplicação frontend estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite no terminal).
