<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

-->

![Logo Motors Shop](https://i.imgur.com/PtPyv4V.png)

---

# Motors Shop

Motors Shop é uma aplicação para compra e venda de veículos, permitindo que os usuários se cadastrem como clientes ou anunciantes, façam login na aplicação, atualizem suas informações de perfil e gerenciem sua lista de anúncios. 
Os usuários clientes e anunciantes podem editar ou excluir suas informações pessoais e também dos seus anúncios. Os anúncios são visualizados por ambos os usuários, estando logado ou não. A aplicação está em produção e pode ser acessado no seguinte [link](https://motor-shop-front-lac.vercel.app).

---

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Screenshots](#2-screenshots)
- [Início Rápido](#4-início-rápido)
  - [Instalando Dependências](#41-instalando-dependências)
  - [Variáveis de Ambiente](#42-variáveis-de-ambiente)
  - [Rodando Localmente](#43-rodando-localmente)

## 1. Visão Geral

O projeto foi desenvolvido totalmente em typescript, utilizando react, e como framework foi utilizado o next.JS, escolhido com o intuito de melhorar o SEO (Search Engine Optimization), da página home da aplicação.
Para realizar requisições http foi utilizado o axios, para realizar a estilização da aplicação optou-se pele Tailwind e o controle de formulários foi feito através do react-hook-form em conjunto com o zod. 
Por fim o deploy da aplicação foi feita na Vercel.

Segue os links para mais informações sobre as tecnologias utilizadas:
- [React](https://pt-br.react.dev/) 
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Vercel](https://vercel.com/)

---

## 2. Screenshots
[ Voltar para o topo ](#tabela-de-conteúdos)
![Página Home](https://i.imgur.com/TaY3hpS.png)
![Página de login](https://i.imgur.com/CEX0nDT.png)
![Página de registro](https://i.imgur.com/8aWfLuQ.png)
![Página do anúncio](https://i.imgur.com/qwfp3Bt.png)
![Página dos meus anúncios](https://i.imgur.com/GGpVF2K.png)

---

<!-- ## 3. Funcionalidades
[ Voltar para o topo ](#tabela-de-conteúdos)

- Cadastro: O usuário pode realizar o seu cadastro na plataforma, onde o formulário conta com controles de dados, feitos com a biblioteca zod;
- Login: O usuário pode realizar o login na plataforma, e assim ter acesso a página dashboard com seus dados;
- Atualização de perfil pessoal: O usuário autenticado pode atualizar suas informações de perfil na página dashboard;
- Criação de contato: O usuário autenticado pode criar novos contatos para sua lista de contatos;
- Atualizar dados de um contato: O usuário autenticado pode atualizar os dados dos seus contatos;
- Apagar contato: O usuário autenticado pode apagar seus contatos;
- Realizar filtros de dados: O usuário autenticado pode realizar filtros na sua lista de contatos; 
- Exportar dados: O usuário autenticado pode exportar os dados da sua lista em formato csv;
- Imprimir dados: O usuário autenticado pode imprimir uma imagem da sua lista de contatos ou exportar em formato pdf;

---
-->

## 4. Início rápido
[ Voltar para o topo ](#tabela-de-conteúdos)

### 4.1. Instalando dependências

Clone o projeto em sua máquina:

```
  git clone git@github.com:Group31-Motoshop-t14/motor-shop-front.git
```

Instale as dependências com o comando:
```
npm install
```
OU
```
yarn
```

### 4.2. Variáveis de Ambiente
Em seguida, crie um arquivo **.env.local**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure a variável de ambiente com a url do seu servidor backend. Caso queira rodar o pojeto todo localmente, faça uso deste [repositório](https://github.com/Group31-Motoshop-t14/motor-shop-backend) , caso deseje utilizar um servidor que esteja em produção faça uso deste [link](https://motor-shop-t14.onrender.com).

### 4.3. Rodando Localmente

Para rodar a aplicação localmente use o comando:

```
npm run dev
```
OU
```
yarn run dev
```

---


## Autores do projeto

- Joseph Vriesman [GitHub](https://github.com/Joseph18CV) - [LinkedIn](https://www.linkedin.com/in/josephvriesman/)
- Antonio Santos [GitHub](https://github.com/AntonioSantosBJPE) - [LinkedIn](https://www.linkedin.com/in/antonio-santos-b934a479/)
- Rafael Carvalho [GitHub](https://github.com/rafaeuus) - [LinkedIn](https://www.linkedin.com/in/rafael-s-carvalho/)
- Ricardo Czajkowski [GitHub](https://github.com/ricardocza) - [LinkedIn](https://www.linkedin.com/in/ricardo-cza/)
- Tomás Lillo Sanhueza [GitHub](https://github.com/TommiL90) - [LinkedIn](https://www.linkedin.com/in/tomasbenjamin/)
