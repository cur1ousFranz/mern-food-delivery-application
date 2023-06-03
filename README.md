# Food Delivery Application (MERN STACK)

## Description

####  This project inspired with UBER food ecommerce website. Customer can browse food specification and add them in their basket. Customer can also proceed to checkout to check products on their cart. This project was built to practice Fullstack MERN technologies.

## Installation

#### Clone the repository

```
git clone https://github.com/cur1ousFranz/mern-food-delivery-application.git
```
#### Project consist of 3 main directories the client directory (customer side), store-frontend directory (store side) and server directory which responsible for server side functionalities.

### Getting started with server side

#### Navigate to server directory

```
cd server
```

#### Install required dependencies

```
npm install
```

#### Setup your PORT, MONGO_URI and SECRET KEY in your env file.

```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/food_delivery_app
SECRET_KEY=fooddeliverywebapplicationsystem
``` 

#### Start nodejs local server.

```
npm run dev
```

#### You may now access the Nodejs server at http://localhost:4000

#### Next is running the local development of Reactjs (customer side) frontend.

#### *Open New Terminal:* Navigate to client directory inside the folder.

```
cd client
```

#### Install required dependencies

```
npm install
```

### Start local development server.

```
npm run start
```

#### You can now access the client side at http://localhost:3000 that communicates in Nodejs backend at server http://localhost:4000

#### To add new food products, you need to start running the local development of Reactjs (store side) frontend which separated in customer side.

#### *Open New Terminal:* Navigate to client directory inside the folder.

```
cd client
```

#### Install required dependencies

```
npm install
```

### Start local development server.

```
npm run start
```

#### You can now access the store side at http://localhost:3001 that also communicates in Nodejs backend at server http://localhost:4000

## Features

* Create food product with dynamic inputs for different kinds of food product.
* Display stores and store's food products.
* Customer can update their profile information, credentials.
* Customer browse all food products and add them in basket or cart.
* Customer can manage their total amount in their cart thru Checkout page.
* Customer may place an order depending what food product in their basket.
* Store notified with orders that customer's made (Websockets).
* Store can update their profile information, credentials.
* Store manage food products, transactions and reports.



