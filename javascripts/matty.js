// matty.js

"use strict";
//vamos

setAllProductsTotal(0, 0);

////// function to set price selection per product
document.addEventListener('input', function (event) {
    var tag = (event.target.id).slice(0, -6);

	if (event.target.id === '' + tag + 'Select') {
        setProductPrice(event.target.value, tag); 
        getOptionTotalsAndSumTotal(); 
    }
}, false);

function setProductPrice(eventTarget, tag) {
    if (eventTarget === 'Make selection') {
        document.getElementById('' + tag + 'Price').innerHTML = '0.00';
    }
    else {
        var eventTargetPrice = eventTarget;
        var eventTargetPricePieces = eventTargetPrice.split('$');
        document.getElementById('' + tag + 'Price').innerHTML = eventTargetPricePieces[1];
    }
};


////// functions to set delivery fee and total price

function setAllProductsTotal(allProductsTotal, deliverFee) {
    var totalSell = (allProductsTotal + deliverFee);
    if (totalSell > 0) {
        document.getElementById('lobsterTotal').value = toStringAddDecimal(totalSell);
    }
    else {
        document.getElementById('lobsterTotal').value = '0.00';
    }
    localStorage.setItem("lobsterTotal", totalSell)
}

function loopProductPrices(className) {
    var x, i;
    var xArr = [];
    var xArrSum;
    x = document.querySelectorAll(className);
    for (i = 0; i < x.length; i++) {
        xArr.push(parseInt(x[i].innerHTML));
    }
    xArrSum = xArr.reduce(function(a, b){
        return a + b;
    }, 0);
    return xArrSum;
  }

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function toStringAddDecimal(value) {
    if (value > 0) {
    var valueToString = value.toString();
    valueToString = valueToString.splice(valueToString.length - 2,0,'.');
    return valueToString;
    }
    else {
        return value;
    }
} 

// helper function get the 3 totals
function getOptionTotalsAndSumTotal() {

    var allProductsTotalSum = loopProductPrices('.productSelectPrice') * 100;
    
    var deliveryFeeSum = 0;
    if (allProductsTotalSum > 100 && allProductsTotalSum <= 7500) {
        deliveryFeeSum = 1000;
    }
    else if  (allProductsTotalSum > 7500 && allProductsTotalSum <= 12500) {
        deliveryFeeSum = 1500;        
    }
    else if  (allProductsTotalSum > 12500 && allProductsTotalSum <= 25000) {
        deliveryFeeSum = 2000;        
    }
    else if  (allProductsTotalSum > 25000) {
        deliveryFeeSum = 3000;        
    }
    else {
        deliveryFeeSum = 0;        
    } 
    if (deliveryFeeSum > 0) {
        document.getElementById('deliveryFee').innerHTML = toStringAddDecimal(deliveryFeeSum);
    }
    else {
        document.getElementById('deliveryFee').innerHTML = '0.00';
    }
    setAllProductsTotal(allProductsTotalSum, deliveryFeeSum);
};
