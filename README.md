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
