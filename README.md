# React + Vite

src/
├── redux/
│   ├── store.js
│   └── slices/
│       └── customer.js
├── Home.jsx
├── NewCustomer.jsx
├── EditCustomer.jsx
├── App.jsx
└── main.jsx


# Redux CRUD App

A simple React app to manage customers using Redux Toolkit for state management.
Built with React, Redux Toolkit, React Router DOM, and Tailwind CSS.
Supports full CRUD — create, read, update, and delete customers from a central Redux store.
Each customer has a name, product, price, and discount field.
Form validation is handled natively using HTML required attributes and Number() conversion.
Data is stored in Redux state only — refreshing the page will reset all customers.

