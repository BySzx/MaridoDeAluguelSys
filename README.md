Sistema Marido de Aluguel (Spring Boot + React + MySQL/XAMPP)

## 📌 Descrição do Projeto

Este projeto é um sistema completo para gerenciamento de serviços de um negócio do tipo **"Marido de Aluguel"**, incluindo:

* Cadastro de **Clientes**
* Cadastro de **Funcionários**
* Cadastro de **Atividades**
* Cadastro e controle de **Serviços**
* Relacionamentos completos entre as entidades
* Interface moderna em **React + Bootstrap**
* API REST em **Spring Boot**
* Banco de dados **MySQL via XAMPP**
* Integração total frontend + backend

---

# 🧱 Arquitetura

* **Backend:** Spring Boot 4, Spring Data JPA, Hibernate, MySQL, HikariCP
* **Frontend:** React com React Router, Bootstrap e consumo da API via fetch
* **Banco:** MySQL (XAMPP)

Padrão: **CRUD completo** para todas as entidades.

---

# 🛠️ Tecnologias Utilizadas

### Backend

* Java 25
* Spring Boot 4 (Web, JPA, Validation)
* Hibernate ORM
* MySQL Connector
* HikariCP
* Maven

### Frontend

* React 18
* React Router DOM
* Bootstrap
* Fetch API

---

# 📦 Como Rodar o Backend

## ✔️ 1. Iniciar o MySQL via XAMPP

1. Abra o **XAMPP Control Panel**
2. Inicie somente:

   * **MySQL**
   * **Apache** *(opcional, só se quiser phpMyAdmin)*
3. Acesse phpMyAdmin:

   ```
   http://localhost/phpmyadmin
   ```

## ✔️ 2. Criar o banco de dados

No phpMyAdmin → SQL:

```sql
CREATE DATABASE marido_de_aluguel;
```

## ✔️ 3. Configurar o Spring Boot

Arquivo:
`src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/marido_de_aluguel
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

## ✔️ 4. Instalar a dependência do MySQL

No `pom.xml`:

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.1.0</version>
</dependency>
```

## ✔️ 5. Rodar o backend

Pelo IntelliJ:

`MaridoDeAluguelApplication.java → Run`

A API subirá em:

```
http://localhost:8080
```

---

# 🖥️ Como Rodar o Frontend

## ✔️ 1. Acesse o diretório do frontend

```
cd m-a-frontend
```

## ✔️ 2. Instale as dependências

```
npm install
```

## ✔️ 3. Rode o servidor de desenvolvimento

```
npm start
```

O frontend abrirá automaticamente em:

```
http://localhost:3000
```

---

# 🔌 Endpoints Principais (API)

### Clientes

| Método | Rota           | Descrição      |
| ------ | -------------- | -------------- |
| GET    | /clientes      | Lista clientes |
| POST   | /clientes      | Cria cliente   |
| GET    | /clientes/{id} | Detalhes       |
| PUT    | /clientes/{id} | Edita          |
| DELETE | /clientes/{id} | Exclui         |

### Funcionários

| Método                    | Rota |
| ------------------------- | ---- |
| GET /funcionarios         |      |
| POST /funcionarios        |      |
| PUT /funcionarios/{id}    |      |
| DELETE /funcionarios/{id} |      |

### Atividades

| Método               | Rota |
| -------------------- | ---- |
| GET /atividades      |      |
| POST /atividades     |      |
| PUT /atividades/{id} |      |

### Serviços (com relações)

| Método                | Rota |
| --------------------- | ---- |
| GET /servicos         |      |
| POST /servicos        |      |
| GET /servicos/{id}    |      |
| PUT /servicos/{id}    |      |
| DELETE /servicos/{id} |      |

---

# 🧪 Dados de Teste (seed opcional)

Você pode popular o banco rodando estes comandos:

```bash
curl -X POST http://localhost:8080/clientes -H "Content-Type: application/json" -d "{\"nome\":\"João Silva\",\"telefone\":\"9999-0000\",\"email\":\"joao@mail.com\",\"cpf\":\"123\",\"endereco\":\"Rua A\"}"
```

(mais comandos de seed podem ser adicionados)

---

# 🎨 Funcionalidades do Frontend

* Menu completo (Clientes, Funcionários, Atividades, Serviços)
* Formulários com Bootstrap (validação + required)
* Listagens com tabelas limpas
* Botão de editar/excluir em todas as páginas
* Formulário de serviço com seleção:

  * Cliente
  * Funcionário
  * Atividade
* Tela de detalhes do serviço

---

✔ Um **vídeo de apresentação** (roteiro + texto)
✔ Uma **versão resumida do README** (curtinha pro professor)

Só pedir!
