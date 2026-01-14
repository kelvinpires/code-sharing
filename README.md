# 💻 CodeShare

Um projeto **full stack** para **compartilhamento de código** diretamente pelo navegador.

---

## 🚀 Tecnologias

### Backend

- **Python**
- **Django**

### Frontend

- **React**
- **Vite**

---

## Como Rodar o projeto

Este projeto é dividido em 2 etapas, **backend (Django)** e **frontend (React)**.
Siga as etapas abaixo para rodar cada parte.

---

### 🔧 Backend (Django)

1. Acesse a pasta do backend:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver # Servidor backend disponível em http://localhost:8000
```

---

### 🎨 Frontend (React)

```bash
cd frontend
npm install
npm run dev # Servidor frontend disponível em http://localhost:5173
```
