# 🛒 Full Stack E-Commerce Web Application

![React](https://img.shields.io/badge/Frontend-React-blue)
![Django](https://img.shields.io/badge/Backend-Django-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **Full Stack E-Commerce Web Application** built using **React.js** and **Django REST Framework**.
This project demonstrates a modern shopping experience where users can browse products, view details, and manage a shopping cart.

---

# 🚀 Features

- Product listing
- Product detail page
- Add to cart
- Update cart quantity
- Remove cart items
- Cart total calculation
- Responsive UI
- REST API integration

---

# 🧰 Tech Stack

## Frontend
- React
- JavaScript
- CSS

## Backend
- Django
- Django REST Framework
- SQLite

## Tools
- Git
- GitHub
- VS Code
- Node.js
- Python

---

# 📂 Project Structure

## Screenshots

![Home Page](screenshots/projectstructrure.png)


---

# ⚙️ Installation

## Clone repository
- git clone https://github.com/Rejaulh/fullstack-ecommerce.git
- cd fullstack-ecommerce


---

## Backend Setup

### cd backend

- python -m venv venv
- source venv/bin/activate

- pip install -r requirements.txt

- python manage.py migrate
- python manage.py runserver

#### Backend runs on:

- http://127.0.0.1:8000/


---

## Frontend Setup

### cd frontend

- npm install
- npm run dev

#### Frontend runs on:

- http://localhost:5173/


---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/products/ | Get all products |
| GET | /api/products<int:pk>/ | Get single product |
| GET | /api/categories/ | Get category of products |
| GET | /api/cart/ | Get all cart products |
| POST | /api/cart/add/ | Add item to cart |
| POST | /api/cart/update/ | Update quantity |
| POST | /api/cart/remove/ | Remove item |

---

# 📸 Screenshots

Add project screenshots here.

---
# 📈 Future Improvements

- User Authentication
- Payment Integration
- Order Management
- Checkout System
- Product Reviews



---

# 👨‍💻 Author

## Rejaul Hoque

- GitHub: https://github.com/Rejaulh
- Contact Number  +91 - 8638787539