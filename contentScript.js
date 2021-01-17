

//console.log(document.querySelector('#sc-subtotal-amount-activecart > span').textContent.split('$')[1].trim())


//import {condition} from './background.js';

let totalString = document.querySelector('#sc-subtotal-amount-activecart > span').textContent.split('$')[1].trim();

var subTotal = parseFloat(totalString);

let hardTotal = 50.00

chrome.runtime.sendMessage({amount: subTotal}, function(response){
    //console.log(subTotal);
});




//console.log(subTotal);


/**
if (subTotal > hardBudget){
    condition = true;
}*/

//console.log(condition);
