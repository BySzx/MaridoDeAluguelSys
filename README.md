---

# **Marido de Aluguel – Sistema Completo (Spring Boot + React)**

Aplicação completa para gerenciamento de serviços de “Marido de Aluguel”, com **CRUD de Clientes, Funcionários, Atividades e Serviços**, integração total **backend + frontend**, e interface construída em **React + Bootstrap**.

Backend em **Spring Boot** e Frontend em **React**, totalmente integrados e rodando em um único projeto.

---

## 🚀 **Tecnologias**

### **Backend**

* Java 17+
* Spring Boot
* Spring Web
* Spring Data JPA
* H2 / MySQL (dependendo do ambiente)
* Maven

### **Frontend**

* React + React Router
* Bootstrap
* Axios

---

## 📁 **Estrutura do Projeto**

```
marido-de-aluguel/
│
├── m-a-frontend/          # Aplicação React
│   ├── public/
│   └── src/
│
├── src/main/java/         # Backend Spring Boot
│   └── com/example/maridodealuguel/
│
├── src/main/resources/    # static/ recebe o build do React
│
└── pom.xml                # Integração Maven + frontend
```

---

## 🛠️ **Funcionalidades**

### ✔️ **Clientes**

* Cadastrar
* Editar
* Listar
* Excluir
* Ver detalhes

### ✔️ **Funcionários**

* Cadastrar
* Editar
* Listar
* Excluir
* Ver detalhes

### ✔️ **Atividades**

* CRUD completo

### ✔️ **Serviços**

* CRUD completo
* Relacionamento com Funcionário
* Página de detalhes
* Formulários com loading

---

## ▶️ **Como rodar o Backend**

Rodar via IntelliJ:

```
Abrir → MaridoDeAluguelApplication → botão verde (Run)
```

Rodar via Maven (caso tenha Maven instalado):

```bash
mvn spring-boot:run
```

O backend sobe em:

```
http://localhost:8080
```

---

## ▶️ **Como rodar o Frontend (modo desenvolvimento)**

Dentro de `m-a-frontend`:

```bash
npm install
npm start
```

Frontend:

```
http://localhost:3000
```

---

## 🔥 **Rodar tudo integrado (produção)**

O build do React vai para `src/main/resources/static`, e o Spring Boot serve tudo pela porta 8080.

### 1) Gerar o build do React

```bash
cd m-a-frontend
npm run build
cd ..
```

### 2) Rodar o backend

```bash
mvn spring-boot:run
```

Sistema completo estará em:

```
http://localhost:8080
```

---

## 🧱 **Build completo do projeto**

```bash
mvn clean package
```

Gera o `.jar` com frontend embutido.

---

## 🧪 **Endpoints principais**

### Clientes

| Método | Endpoint       |
| ------ | -------------- |
| GET    | /clientes      |
| GET    | /clientes/{id} |
| POST   | /clientes      |
| PUT    | /clientes/{id} |
| DELETE | /clientes/{id} |

### Funcionários

| Método | Endpoint           |
| ------ | ------------------ |
| GET    | /funcionarios      |
| GET    | /funcionarios/{id} |
| POST   | /funcionarios      |
| PUT    | /funcionarios/{id} |
| DELETE | /funcionarios/{id} |

### Atividades

| Método | Endpoint         |
| ------ | ---------------- |
| GET    | /atividades      |
| GET    | /atividades/{id} |
| POST   | /atividades      |
| PUT    | /atividades/{id} |
| DELETE | /atividades/{id} |

### Serviços

| Método | Endpoint       |
| ------ | -------------- |
| GET    | /servicos      |
| GET    | /servicos/{id} |
| POST   | /servicos      |
| PUT    | /servicos/{id} |
| DELETE | /servicos/{id} |

---

## 🧑‍💻 **Autor**

**Alexandre Leite**
Projeto desenvolvido para estudo, prática e portfólio.

---

