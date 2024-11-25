const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

//Server-side values
let taxrate = 5;
let discountPercentage = 10;
let loyaltyRate = 2; // 2 point per $1
let standardTime = 50; //1 day per 50km
let expressTime = 100; //1 day per 100km

app.use(express.static('static'));

// Function start
function total(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

function isaMember(member) {
  if (member === 'true') {
    return true;
  } else {
    return false;
  }
}

function calDiscount(amount, discountPercentage) {
  let discount = amount - amount * (discountPercentage / 100);
  return discount;
}

function calTax(amount, taxrate) {
  let tax = amount * (taxrate / 100);
  return tax;
}

function checkShippingMethod(method) {
  if (method === 'standard') {
    return true;
  } else {
    return false;
  }
}

function calTime(distance, num) {
  let time = distance / num;
  return time;
}
function calShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

function calLoyalty(amount, loyaltyRate) {
  return amount * loyaltyRate;
}
//Function End

//API Start
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(total(newItemPrice, cartTotal).toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isaMember(isMember)) {
    res.send(calDiscount(cartTotal, discountPercentage).toString());
  } else {
    res.send(cartTotal.toString());
  }
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calTax(cartTotal, taxrate).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if (checkShippingMethod(shippingMethod)) {
    res.send(calTime(distance, standardTime).toString());
  } else {
    res.send(calTime(distance, expressTime).toString());
  }
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calShippingCost(weight, distance).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calLoyalty(purchaseAmount, loyaltyRate).toString());
});
//API End

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
