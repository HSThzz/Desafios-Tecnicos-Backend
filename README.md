<h1 align="center">🚀 Desafios Técnicos Backend</h1>

<p align="center">
  <i>Resoluções de desafios técnicos originalmente em Java, reescritos em TypeScript com o framework NestJS.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v10-red?style=flat&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-20.x-green?style=flat&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Status-Em desenvolvimento-yellow" alt="Status" />
</p>

---

## 🧩 Sobre o projeto

Este repositório reúne **resoluções de desafios técnicos de backend**, criados originalmente em **Java** e reimplementados em **TypeScript com NestJS**.  
O objetivo é demonstrar **boas práticas**, **organização de código**, **testabilidade** e **arquitetura modular** no contexto do NestJS.

Cada desafio aborda um tema diferente do desenvolvimento backend, como:
- Estruturação de módulos e serviços;
- Manipulação de dados e validações;
- Criação de rotas RESTful;
- Boas práticas com DTOs e entidades;
- Integração com bancos de dados.

---

## 🧠 Desafios Implementados

| # | Desafio | Descrição | Status |
|:-:|:---------|:-----------|:--------|
| 1 | **Beneficiários API** | CRUD completo de beneficiários com validação e integração com banco. | ✅ Concluído |
| 2 | **Mini Crm** | Mini Crm com clientes e contatos. | ✅ Concluído |
| 3 | **Pic Pay Simplificado** | Simula um ambiente de transações entre lojistas e usuarios, com autenticação via bearer token e validação em serviçoes terceiros via axios. | ✅ Concluído |

> ⚙️ Cada módulo dentro de `/src` representa um desafio técnico independente.

---

## 🏗️ Tecnologias utilizadas

- **NestJS** — Framework backend progressivo para Node.js  
- **TypeScript** — Superset do JavaScript com tipagem estática  
- **Node.js** — Ambiente de execução  
- **TypeORM** — ORM para banco de dados relacional (Postgres)  
- **Class Validator / Transformer** — Validação e transformação de DTOs  
- **Jest** — Framework de testes unitários  

---

## 📂 Estrutura do projeto

```bash
Desafios-Tecnicos-Backend/
├── src/
│   ├── beneficiarios/          # Desafio 1 - CRUD de beneficiários
│   ├── mini_crm/               # Desafio 2 - Mini Crm
│   ├── pic-pay-simplificado/   # Desafio 3 - Pic pay simplificado
└── README.md

⚙️ Como executar o projeto
1️⃣ Clonar o repositório
git clone https://github.com/HSThzz/Desafios-Tecnicos-Backend.git
cd Desafios-Tecnicos-Backend

2️⃣ Instalar dependências
npm install

3️⃣ Rodar o servidor em modo de desenvolvimento
npm run start:dev


O servidor ficará disponível em:
👉 http://localhost:3000

📡 Exemplo de endpoint

POST /beneficiarios

{
  "nome": "Thiago Esmerio",
  "telefone": "31911111111",
  "dataNascimento": "15/02/2002"
}


Resposta

{
  "message": "Beneficiario criado com sucesso"
}

🧾 Scripts úteis
Comando	Descrição
npm run start:dev	Inicia o servidor em modo desenvolvimento
npm run build	Compila o código TypeScript para JavaScript
npm run test	Executa os testes automatizados com Jest
npm run lint	Verifica o código com ESLint
🧪 Testes

Os testes estão implementados com Jest e cobrem:

Serviços (regras de negócio);

Controllers (rotas e respostas HTTP);

Integrações com banco (quando aplicável).

Para rodar:

npm run test

🧾 Licença

Este projeto é de uso livre para fins de aprendizado e portfólio.
Sinta-se à vontade para clonar, estudar e adaptar o código.

✉️ Contato

👤 Autor: Thiago Esmerio
💼 LinkedIn

🐙 GitHub

📧 thiagoesmerio.dev@gmail.com
