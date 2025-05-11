# Folga Finder
**Folga Finder** é uma aplicação web que permite visualizar feriados, incluindo os prolongados, em diversos países, utilizando a [API Nager.Date](https://date.nager.at), sendo ideal para planejar folgas, viagens ou descansos com base nos feriados nacionais de vários países. Foi desenvolvida com foco em responsividade, organização por rotas e boas práticas de desenvolvimento com React e TypeScript.

<p align="center">
  <img src="src/assets/logo.png" alt="Folga Finder" width="180" />
</p>

## Funcionalidades
-  Busca de feriados por **país** e **ano**
-  Exibição dos **próximos feriados**
-  Lista de **feriados prolongados**
-  Botão de voltar
-  Interface responsiva e amigável

## Requisitos
Antes de rodar o projeto, você precisa ter:
- [Node.js](https://nodejs.org/) (versão recomendada: **16.x ou superior**)
- npm (gerenciador de pacotes)
- Conexão com a internet (para consumo da API pública)

## Tecnologias Utilizadas
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [SASS/SCSS](https://sass-lang.com/)
- [Nager.Date API](https://date.nager.at)

## Estrutura do Projeto
```
src/
├── assets/ # Imagens e ícones
├── components/ # Componentes reutilizáveis (Navbar, Footer, etc.)
├── pages/ # Páginas principais (Home, Feriados, etc.)
├── services/ # Lógica para consumo da API
├── styles/ # Estilos globais (SCSS)
├── types/ # Tipagens TypeScript
├── App.tsx # Rotas principais
└── index.tsx # Entrada da aplicação
```

## Instalação e execução

### 1. **Clone o repositório:**
```bash
git clone https://github.com/Vicius1/folga-finder.git
cd folga-finder
```
### 2. Instalar Dependências
```bash
npm install
````
### 3. Executar o Projeto
```bash
npm start
```
- Acesse http://localhost:3000 no seu navegador para visualizar a aplicação.
