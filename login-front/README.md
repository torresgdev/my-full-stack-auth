🔐 Sistema de Autenticação Simplificado
Este projeto é uma aplicação web frontend que simula um sistema de registro e login de usuários, focando em demonstração de boas práticas de desenvolvimento React, Clean Code e estilização com Tailwind CSS. Ele foi construído para ser um modelo de arquitetura de projeto clara, modular e de fácil manutenção.

✨ Funcionalidades
Página de Registro: Permite que novos usuários simulem o cadastro com e-mail, senha e confirmação de senha.
Página de Login: Permite que usuários existentes simulem o acesso à plataforma.
Validação de Formulários: Implementação de validação de campos em tempo real e na submissão, com feedback claro de erros.
Mensagens de Feedback: Exibição de mensagens de sucesso ou erro após a tentativa de registro/login.
Navegação entre Páginas: Uso de React Router DOM para navegação fluida entre Login, Registro e uma Dashboard simulada.
Estado de Carregamento: Feedback visual durante o processo de submissão do formulário.
Responsividade: Design adaptável a diferentes tamanhos de tela (desktop, tablet, mobile) com Tailwind CSS.

---

🚀 Tecnologias Utilizadas
React 18+ (com Vite): Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas, com o Vite para um ambiente de desenvolvimento rápido.
TypeScript: Superset do JavaScript que adiciona tipagem estática, melhorando a segurança do código, a detecção de erros e a manutenibilidade.
Tailwind CSS: Framework CSS "utility-first" que permite construir designs complexos e responsivos diretamente no HTML, promovendo um desenvolvimento ágil e consistente.
React Router DOM: Biblioteca padrão para roteamento declarativo em aplicações React de página única (SPA), gerenciando a navegação e o estado da URL.

---

⚙️ Princípios de Clean Code Aplicados
Este projeto serve como um exemplo prático de aplicação de diversos princípios de Clean Code:

Single Responsibility Principle (SRP): Cada componente, hook ou função possui uma única responsabilidade bem definida. Por exemplo:
Input.tsx: Apenas renderiza um campo de input com label e erro.
useForm.ts: Gerencia o estado e a validação de formulários.
validation.ts: Contém apenas as funções de validação.
DRY (Don't Repeat Yourself):
Componentes Reutilizáveis: Input.tsx e Button.tsx são usados em ambas as páginas, evitando a duplicação de estilos e lógicas básicas de UI.
Custom Hook useForm: Centraliza a lógica de gerenciamento de formulários, podendo ser reutilizado em qualquer formulário da aplicação.
Funções Utilitárias: As funções de validação em src/utils/validation.ts são genéricas e reutilizáveis.
Legibilidade: Nomes de variáveis, funções e componentes são claros e autoexplicativos, facilitando o entendimento do código.
Modularidade: O projeto é dividido em pastas lógicas (components, hooks, pages, routes, utils), o que melhora a organização e a escalabilidade.
Comentários: O código é amplamente comentado, explicando não apenas o quê cada bloco de código faz, mas principalmente o porquê de certas decisões de design e arquitetura, e como a lógica complexa funciona.

---

⚙️ Como Rodar o Projeto
Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

1. Pré-requisitos
   Certifique-se de ter o Node.js (versão 18.x ou superior) e o npm (ou Yarn/pnpm) instalados em seu sistema.

2. Clonar o Repositório

```bash
# Clone o repositório para sua máquina local
git clone https://github.com/torresgdev/movie-catalog # Substitua pelo link do seu repositório deste projeto!
cd movie-catalog # Ou o nome da pasta que você usou para o projeto de autenticação
```

3. Instalar Dependências
   Navegue até a pasta do projeto e instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

4. Iniciar o Servidor de Desenvolvimento
   Após instalar as dependências, você pode iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

## O aplicativo estará acessível em http://localhost:5173/ (ou a porta que o Vite indicar) no seu navegador.

---

🧪 Como Testar as Funcionalidades
Navegação:

Ao acessar http://localhost:5173/, você será direcionado para a Página de Login.
Clique no link "Crie uma aqui" para ir para a Página de Registro.
No Registro, clique em "Faça Login" para voltar à página de Login.
Página de Registro:

Tente submeter o formulário com campos vazios para ver as mensagens de erro de validação.
Insira um e-mail inválido (ex: exemplo).
Insira uma senha com menos de 6 caracteres.
Insira senhas diferentes nos campos "Senha" e "Confirmar Senha".
Para um registro bem-sucedido (simulado): use qualquer e-mail válido (ex: gabriel@email.com) e senhas iguais e com 6 ou mais caracteres (ex: senha123). Observe o estado de carregamento no botão e a mensagem de sucesso.
Página de Login:

Tente submeter o formulário com campos vazios ou e-mail/senha inválidos para ver as mensagens de erro.
Para um login bem-sucedido (simulado): use e-mail teste@teste.com e senha 123456. Observe o estado de carregamento e o redirecionamento para a Dashboard.
