# 📦 BizzSoft Inventory Management System V5

<p align="center">
  <strong>A production-style inventory management system built with Laravel 12, React, Inertia.js, and Tailwind CSS.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel&logoColor=white" alt="Laravel 12" />
  <img src="https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white" alt="PHP 8.2" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Inertia.js-Integration-9553E9?logo=inertia&logoColor=white" alt="Inertia.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/RBAC-Implemented-success" alt="RBAC" />
  <img src="https://img.shields.io/badge/Activity_Logs-Enabled-brightgreen" alt="Activity Logs" />
  <img src="https://img.shields.io/badge/GitHub_Actions-Auto_Deploy-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Deployment-Hostinger-673DE6" alt="Hostinger" />
  <img src="https://img.shields.io/badge/Status-Portfolio_Ready-success" alt="Portfolio Ready" />
</p>

---

## 📖 About

**BizzSoft Inventory Management System V5** is a production-style inventory management application developed as a portfolio and software engineering learning project.

Version 5 represents the evolution of the earlier BizzSoft inventory system into a modern **Laravel + React + Inertia.js** application. The project combines a Laravel backend with a React-based frontend while keeping business rules, validation, authorization, database integrity, and application logic on the server side.

The system covers the complete inventory workflow including **Products, Categories, Suppliers, Purchases, Sales, Reports, User Management, Dashboard, and Activity Logs**.

The project is designed to demonstrate practical full-stack development skills, including application architecture, CRUD development, database relationships, business transactions, RBAC, audit logging, deployment, and modern React frontend development.

---

## ✨ Core Features

### 📦 Inventory Management

- Product Management
- Category Management
- Supplier Management
- Product search
- Category and supplier relationships
- Stock quantity tracking
- Reorder level tracking
- Low-stock monitoring

### 🛒 Purchase Management

- Purchase transactions
- Automatic stock increase after purchase
- Purchase history
- Product relationship handling
- Stock reversal when a purchase transaction is deleted
- Database transactions for data integrity

### 💰 Sales Management

- Sales transactions
- Automatic stock deduction
- Stock availability validation
- Prevention of negative stock
- Historical selling price recording
- Automatic line-total calculation
- Stock restoration when a sale is deleted/voided
- Database transactions for critical sales operations

### 👥 User Management

- User creation and editing
- Role assignment
- Active / inactive account status
- Password reset
- User search and filtering
- Role-based permissions

### 🔐 Authentication, Authorization & Security

- Laravel authentication
- Role-Based Access Control (RBAC)
- Database-driven roles and permissions
- Permission checks in controllers
- Blade/React authorization-aware UI
- Form Request validation
- Route Model Binding
- Server-side business logic
- Secure password hashing

### 📝 Activity Logs & Audit Trail

The system records important user and business activities for accountability and auditing.

- Product activities
- Purchase activities
- Sales activities
- User Management activities
- Centralized activity logging services
- Audit trail support

### 📊 Dashboard & Reports

- Business dashboard
- Product, category, supplier, sales, and purchase summaries
- Sales reports
- Purchase reports
- Inventory reports
- Low-stock reports
- Recent sales and purchase activity

### 🎨 Modern React UI

- React-based frontend
- Inertia.js page navigation
- Reusable BizzSoft UI components
- Responsive layouts
- Search and interactive forms
- Dark / Light theme support
- Theme synchronization across public and authenticated pages
- Modern Tailwind CSS styling

---

## 🛠 Tech Stack

| Category | Technology |
| --- | --- |
| **Backend** | Laravel 12 |
| **Language** | PHP 8.2 |
| **Frontend** | React |
| **SPA Bridge** | Inertia.js |
| **Styling** | Tailwind CSS |
| **Database** | MySQL |
| **ORM** | Eloquent ORM |
| **Authentication** | Laravel Authentication |
| **Authorization** | Database-driven RBAC |
| **Validation** | Laravel Form Requests |
| **Architecture** | MVC + React/Inertia frontend |
| **Version Control** | Git & GitHub |
| **CI/CD** | GitHub Actions |
| **Deployment** | Hostinger |

---

## 🏗️ Architecture & Engineering Practices

BizzSoft V5 follows a layered Laravel application structure with a React/Inertia frontend.

```text
                    BizzSoft V5
                         │
          ┌──────────────┴──────────────┐
          │                             │
     React Frontend                Laravel Backend
     + Inertia.js                       │
          │                             │
          │                     Controllers / Requests
          │                             │
          │                       Services / Models
          │                             │
          └──────────────┬──────────────┘
                         ↓
                      MySQL
```

### Engineering Concepts Applied

- MVC architecture
- React component-based frontend development
- Inertia.js integration
- Eloquent ORM
- Eloquent relationships
- Route Model Binding
- Form Request validation
- `validated()` request handling
- Database transactions using `DB::transaction()`
- Server-side business rules
- Database-driven RBAC
- Permission-based authorization
- Activity logging and audit trails
- Reusable frontend components
- Git/GitHub version control
- Automated deployment with GitHub Actions

---

## 📐 Business Rules

The application enforces important inventory business rules on the server side.

- Purchasing a product automatically increases its stock.
- Selling a product automatically decreases its stock.
- Sales cannot reduce inventory below zero.
- Historical selling prices are preserved with sales transactions.
- Sales line totals are calculated from quantity × selling price.
- Deleting a purchase reverses its stock increase.
- Deleting/voiding a sale returns the sold quantity to stock.
- Critical purchase and sales operations are protected by database transactions.
- User permissions determine access to protected modules and actions.

---

## 🔐 Role-Based Access Control

BizzSoft V5 uses a database-driven authorization system rather than hard-coded role assumptions.

```text
User
 ↓
Role
 ↓
Permissions
 ↓
Protected Modules / Actions
```

Example permission areas include:

- Dashboard
- Products
- Categories
- Suppliers
- Purchases
- Sales
- Reports
- Users
- Activity Logs

This allows the system to distinguish what an **Administrator** or **Staff** user is allowed to access.

---

## 📝 Activity Logging

Activity logging is implemented as part of the application's audit trail architecture.

The project includes reusable services for recording important actions, allowing business modules to produce consistent activity records without duplicating logging logic everywhere.

Current activity coverage includes Product, Purchase, Sales, and User Management operations.

---

## 🚀 Deployment & CI/CD

The project is deployed to **Hostinger** and uses **GitHub Actions** for automated deployment.

The deployment workflow is triggered from the GitHub repository and performs the required application deployment steps on the production server.

```text
Developer
   ↓
Git Commit / Push
   ↓
GitHub
   ↓
GitHub Actions
   ↓
Hostinger
   ↓
BizzSoft V5 Production
```

---

## 📸 Screenshots

The repository contains portfolio screenshots showcasing the major areas of BizzSoft V5.

### 📊 Dashboard

Business overview with inventory and transaction summaries.

![Dashboard](screenshots/dashboard.png)

---

### 📦 Product Management

Product management with pricing, stock, categories, suppliers, and reorder levels.

![Products](screenshots/products.png)

---

### 🛒 Purchase Management

Purchase transactions with automatic inventory updates.

![Purchases](screenshots/purchases.png)

---

### 💰 Sales Management

Sales transactions with stock validation, automatic deduction, and line totals.

![Sales](screenshots/sales.png)

---

### 👥 User Management

User administration with roles, permissions, account status, and password management.

![Users](screenshots/users.png)

---

### 📊 Reports

Sales, purchase, inventory, and low-stock reporting.

![Reports](screenshots/reports.png)

---

### 📝 Activity Logs

Audit history for important system operations.

![Activity Logs](screenshots/activity-logs.png)

---

## ⚙️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/bizzcode-zzz/bizzsoft-v5-react.git
cd bizzsoft-v5-react
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Create the environment file

```bash
copy .env.example .env
```

### 5. Generate the application key

```bash
php artisan key:generate
```

### 6. Configure the database

Update `.env` with your local MySQL credentials.

Example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bizzsoft
DB_USERNAME=root
DB_PASSWORD=
```

### 7. Run migrations and seed the database

```bash
php artisan migrate --seed
```

### 8. Start Laravel

```bash
php artisan serve
```

### 9. Start the Vite development server

In a second terminal:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:8000
```

> **Note:** Demo credentials, if used, should be obtained from the project's seeders or local development configuration. Production credentials must never be committed to the repository.

---

## 📂 Project Structure

```text
app/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   ├── ActivityLogController.php
│   │   ├── CategoryController.php
│   │   ├── DashboardController.php
│   │   ├── ProductController.php
│   │   ├── PurchaseController.php
│   │   ├── ReportsController.php
│   │   ├── SalesController.php
│   │   ├── SupplierController.php
│   │   └── UserController.php
│   ├── Middleware/
│   └── Requests/
├── Models/
└── Services/

database/
├── migrations/
└── seeders/

resources/
├── css/
└── js/
    ├── Components/
    ├── Layouts/
    ├── Pages/
    │   ├── ActivityLogs/
    │   ├── Auth/
    │   ├── Categories/
    │   ├── Products/
    │   ├── Profile/
    │   ├── Purchases/
    │   ├── Reports/
    │   ├── Sales/
    │   ├── Suppliers/
    │   ├── Users/
    │   ├── Dashboard.jsx
    │   └── Welcome.jsx
    ├── app.jsx
    └── bootstrap.js

routes/
├── auth.php
├── console.php
└── web.php

.github/
└── workflows/
    └── deploy.yml

screenshots/
```

---

## 🧪 Testing & Quality

The project uses Laravel's testing infrastructure and PHPUnit for automated testing.

Quality practices include:

- Validation through Form Requests
- Server-side business rule enforcement
- Database transaction protection
- RBAC authorization checks
- Manual module QA
- Feature and unit testing support
- Production deployment verification

---

## 🚧 Future Learning & Roadmap

BizzSoft V5 is also part of an ongoing full-stack development learning journey.

### 🌐 REST API

The current V5 web application primarily uses **Laravel + Inertia.js + React** and does not require a REST API for its normal web workflow.

A future project will introduce Laravel REST APIs and a separate client application to demonstrate:

- REST API design
- JSON request/response handling
- API authentication
- CRUD through APIs
- Mobile/web client communication
- Third-party API integration

### 📱 Mobile Application

A future mobile client can consume the Laravel backend through REST APIs while sharing the same business data and backend services.

### ☁️ Firebase

Firebase will be studied separately for use cases such as real-time applications, notifications, and mobile-focused services where appropriate.

### 📈 Additional Improvements

- Advanced analytics and charts
- PDF and Excel report exports
- Barcode / QR code support
- Stock movement history
- Additional automated tests
- API testing
- Expanded CI/CD practices
- Additional deployment and infrastructure experience

---

## 👨‍💻 Developer

### Alwin John

**Full-Stack Web Developer — BizzSoft**

BizzSoft V5 is a hands-on software engineering project built to demonstrate practical full-stack development skills through the design, implementation, testing, deployment, and continuous improvement of a real-world inventory management system.

### Skills Demonstrated in This Project

- PHP & Laravel
- React
- Inertia.js
- Tailwind CSS
- MySQL
- Eloquent ORM
- MVC architecture
- REST API concepts
- Authentication & authorization
- RBAC
- Form Request validation
- Database transactions
- Business logic design
- Activity logging / audit trails
- Git & GitHub
- GitHub Actions / CI/CD
- Hostinger deployment

### GitHub

https://github.com/bizzcode-zzz

---

## 📄 License

This project is available under the **MIT License**.

---

## ⭐ Project Note

BizzSoft V5 is more than a CRUD application. It is a continuing full-stack engineering project focused on understanding how frontend interfaces, backend architecture, databases, authorization, business rules, testing, and deployment work together as one system.