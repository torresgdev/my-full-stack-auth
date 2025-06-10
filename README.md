✨ Visão Geral
Este é um boilerplate de aplicação FullStack moderna, projetada para gerenciar autenticação de usuários completa, incluindo registro e login. A aplicação é construída com um frontend em React/Vite, um backend robusto em NestJS e um banco de dados PostgreSQL. O projeto é configurado como um monorepo para facilitar o desenvolvimento e o deploy de ambos os lados da aplicação.

---

🚀 Funcionalidades Atuais
Autenticação de Usuários:
Registro de novos usuários.
Login de usuários existentes.
Proteção de rotas no backend (JWT Authentication).
Gerenciamento de sessão (via JWT armazenado no frontend).
Backend Escalável: Construído com NestJS, um framework progressivo de Node.js para aplicações server-side eficientes e escaláveis.
Frontend Moderno: Desenvolvido com React e Vite, oferecendo uma experiência de desenvolvimento rápida e uma interface de usuário reativa.
Banco de Dados Relacional: Utiliza PostgreSQL para armazenamento de dados, gerenciado com TypeORM para interações facilitadas.
Containerização: Integração completa com Docker e Docker Compose para padronização de ambientes e facilidade de deploy.

---

🛠️ Tecnologias Utilizadas
Frontend
React: Biblioteca JavaScript para construção de interfaces de usuário.
Vite: Ferramenta de build de frontend de próxima geração, oferecendo desenvolvimento rápido.
Axios: Cliente HTTP para fazer requisições à API do backend.
React Router DOM: Para roteamento no lado do cliente.
Backend
NestJS: Framework Node.js para construir aplicações server-side eficientes e escaláveis.
TypeScript: Linguagem superset de JavaScript, usada para desenvolvimento tipado.
TypeORM: ORM (Object-Relational Mapper) para interagir com o banco de dados PostgreSQL.
JWT (JSON Web Tokens): Para autenticação baseada em tokens.
Bcrypt: Para hash de senhas de usuários.
Passport.js: Estratégias de autenticação.
Banco de Dados
PostgreSQL: Banco de dados relacional robusto e de código aberto.
Infraestrutura & Ferramentas
Docker: Para containerização dos serviços.
Docker Compose: Para orquestrar e gerenciar múltiplos contêineres Docker (backend, frontend, database).
Netlify: Plataforma para deploy e hosting do frontend.
Render: Plataforma para deploy e hosting do backend e banco de dados PostgreSQL.
Git & GitHub: Controle de versão e hospedagem do repositório.

---

☁️ Deploy
Esta aplicação FullStack está na nuvem.

[Frontend (React/Vite): Deployado no Netlify.](https://deluxe-bienenstitch-7642d4.netlify.app)

---

🔒 Fluxo de Autenticação
Registro: O usuário envia credenciais (email, senha) para o endpoint /auth/signup do backend. A senha é hashed (bcrypt) e o usuário é salvo no PostgreSQL.
Login: O usuário envia credenciais para /auth/signin. O backend valida a senha, e se for bem-sucedida, gera um JWT contendo o ID do usuário e o email.
Token: O JWT é retornado ao frontend, que o armazena (ex: em localStorage ou sessionStorage).
Acesso Protegido: Para acessar rotas protegidas (ex: /users/me), o frontend envia o JWT no cabeçalho Authorization: Bearer <token> em suas requisições.
Validação: O backend, usando Passport.js e estratégia JWT, valida o token, garantindo que o usuário tenha permissão para acessar o recurso.

---

📊 Esquema do Banco de Dados
Atualmente, o banco de dados possui uma tabela principal para usuários:

users
id (UUID, PK)
email (VARCHAR, UNIQUE)
password (VARCHAR, hashed)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
