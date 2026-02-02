# 📋 Task Manager Kanban

Um sistema completo de gerenciamento de tarefas utilizando a metodologia Kanban. O projeto oferece uma interface moderna e responsiva para criar, visualizar e gerenciar tarefas através de colunas de status (To Do, In Progress, Done).

O sistema foi construído com foco em **Clean Architecture**, performance e escalabilidade, utilizando **Java (Spring Boot)** no backend e **React (TypeScript)** no frontend, totalmente containerizado com **Docker**.

---

## 🚀 Tecnologias Utilizadas

### Backend
* **Java 21**
* **Spring Boot** (Web, JPA, Validation)
* **PostgreSQL** (Banco de dados relacional)
* **Maven** (Gerenciamento de dependências)
* **Docker** (Containerização)

### Frontend
* **React** (Vite)
* **TypeScript**
* **Tailwind CSS** (Estilização utilitária)
* **TanStack Query (React Query)** (Gerenciamento de estado e cache assíncrono)
* **React Hook Form** (Gerenciamento de formulários)
* **Axios** (Cliente HTTP centralizado)
* **Lucide React** (Ícones)

---

## ✨ Funcionalidades

* ✅ **CRUD Completo:** Criação, leitura, atualização e exclusão de tarefas.
* 📊 **Visualização Kanban:** Organização automática por colunas (A Fazer, Em Progresso, Concluído).
* 🎨 **Interface Responsiva:** Layout adaptável para Mobile e Desktop com scroll horizontal snap.
* 🏷️ **Priorização:** Indicadores visuais de prioridade (Baixa, Média, Alta).
* ⚡ **Feedback em Tempo Real:** Tratamento de erros, loadings e validações de formulário.
* 🐳 **Ambiente Dockerizado:** Setup completo (App + Banco) com um único comando.

---

## 🏗️ Arquitetura do Projeto

O projeto segue boas práticas de separação de responsabilidades:

### Backend (`/backend`)
Seguindo o padrão de camadas (Layered Architecture):
* `controller`: Endpoints REST e tratamento de HTTP.
* `service`: Regras de negócio.
* `repository`: Acesso a dados (Spring Data JPA).
* `dto`: Transferência de dados segura entre camadas.
* `config`: Configurações globais (CORS, Beans).

### Frontend (`/frontend`)
Organizado por **Features** (`src/features/tasks`), onde cada funcionalidade possui seus próprios:
* `components`: Componentes visuais isolados.
* `hooks`: Lógica de React Query e Mutações.
* `services`: Comunicação com a API.
* `types`: Definições de tipos TypeScript.

---

## 🔧 Como Rodar o Projeto

### Opção 1: Via Docker (Recomendado) 🐳

Esta é a maneira mais simples, pois sobe o Banco de Dados, Backend e Frontend automaticamente.

**Pré-requisitos:**
* Docker e Docker Compose instalados.

**Passo a passo:**

1.  Clone o repositório:
    ```bash
    git clone https://github.com/wilsoncf/task-manager-kanban.git
    cd task-manager-kanban
    ```

2.  Suba os containers:
    ```bash
    docker compose up --build
    ```

3.  Acesse a aplicação:
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Backend API:** [http://localhost:8080](http://localhost:8080)

---

### Opção 2: Rodar Manualmente (Desenvolvimento) 🛠️

Se preferir rodar fora do Docker para debugar:

#### 1. Banco de Dados
Você precisará de uma instância PostgreSQL rodando. Crie um banco chamado `taskmanager_db` ou ajuste as configurações no `application.yaml`.

#### 2. Backend
```bash
cd backend
mvn spring-boot:run
