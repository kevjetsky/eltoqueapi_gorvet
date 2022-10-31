const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs'); 
const express = require('express');
const bodyParser = require('body-parser');
const app= express();
const port=process.env.PORT || 3001;

let currency=[];
let price = [];

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/cambio',(req,res)=>{res.send({message: 'hola mundo!'})
})
/* app.listen(3001, ()=>{
    console.log('listo');
}); */
  request("https://eltoque.com", (err, res, body) => {
  if (!err && res.statusCode == 200) {
    let $ = cheerio.load(body);
     
    $('span.currency' , 'table.hmQVUs').each(function() {
       var moneda = $(this).text();
       moneda=(moneda.replace('1 ', ''));
       currency.push(moneda);
    });
    $('span.price-text' , 'table.hmQVUs').each(function() {
        var precio = $(this).text();
        precio=(precio.replace(' CUP', ''));
        price.push(precio);
     });
  

   
  }

 
 
  const salida= pushArraysToData(currency, price);
  console.log(salida);
  fs.writeFile('cambio.json', JSON.stringify(salida),'utf8', (err) => { 
    if (err) throw err; 
    console.log('The file has been saved!'); 
  });
});
  
 



function pushArraysToData(pro, array){
    let withKeys = {}
    for(let i = 0; i < pro.length; i++){
      withKeys[pro[i]] = array[i]
    }
  return withKeys
}
 

 
 
 
//pruena de git