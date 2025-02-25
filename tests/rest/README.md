# Auction Website

## Overview
This project is an auction website where users can bid on various items. The website includes functionalities for user registration, login, item listing, bidding, and administrative tasks such as adding and deleting items. The project is divided into two main parts: the client-side application and the server-side application.

### Features
- **User Registration and Login**: Users can create accounts and log in to the website.
- **Item Listing**: Users can list items for auction with details such as title, description, starting bid, and auction duration.
- **Bidding System**: Users can place bids on listed items. The highest bid at the end of the auction wins.
- **Admin Panel**: Admin users can manage the website, including adding, editing, and deleting items.

## Technologies Used

### Client-side
- **Language:** JavaScript  
- **Framework:** Svelte  
- **Styling:** Tailwind CSS  
- **HTTP Requests:** Axios  

### Server-side
- **Language:** JavaScript  
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Data Storage:** JSON files  
- **Password Hashing:** bcrypt  
- **Authentication:** JWT (JSON Web Tokens)  

## Project Structure
```
client/
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.cjs
├── public/
├── src/
│   ├── apiclient.js
│   ├── App.svelte
│   ├── assets/
│   ├── components/
│   ├── lib/
│   ├── main.css
│   ├── main.js
│   ├── pages/
│   └── vite-env.d.ts
├── tailwind.config.cjs
└── vite.config.js

documentation/
└── users.md

server/
├── database_default.json
├── database.json
├── nodemon.json
├── package.json
├── src/
│   ├── databaseapi.js
│   ├── index.js
│   ├── middleware/
│   ├── models/
│   ├── response.handler.js
│   ├── routes/
│   └── utils.js

tests/
└── rest/
    ├── auctionbid.http
    ├── auctionitem.http
    ├── auctionsearch.http
    ├── hello.http
    ├── login.http
    └── auth.http
```

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the client directory and install dependencies:
   ```sh
   cd client
   npm install
   ```
3. Navigate to the server directory and install dependencies:
   ```sh
   cd ../server
   npm install
   ```

### Running the Application
1. Start the server:
   ```sh
   npm start
   ```
2. Start the client:
   ```sh
   npm run dev
   ```

### Usage
- Open your browser and navigate to `http://localhost:3001` to access the client-side application.
- Use the provided endpoints to interact with the server-side application.

## Users
Place the credentials for at least two users in the table below. There should be at least one administrator and one regular user.

| Username | Password | Account type |
|----------|--------|------------|
| `admin`  | admin123 | admin |
| `user`   | user123 | user |

## License
This project is licensed under the MIT License.
