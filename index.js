const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs'); 
const express = require('express');
const bodyParser = require('body-parser');
const app= express();
const port=process.env.PORT || 3001;

let currency=[];
let price = [];
 
var salidaJson; 

//reviso el toque, el tiemo de lectura del eltoque esta por los 6segundos,

 setInterval(leoEltoque, 2000);//probando cada 20s
 

function leoEltoque() {
  console.log("Ha pasado 20s");
  request("https://eltoque.com", (err, res, body) => {
  if (!err && res.statusCode == 200) {//extraigo la pagina si puede leerla
    let $ = cheerio.load(body);
     
    $('span.currency' , 'table.hmQVUs').each(function() {//saco los span q tienen el texto de la moneda y lo limpio
       var moneda = $(this).text();
       moneda=(moneda.replace('1 ', ''));
       currency.push(moneda);
    });
    $('span.price-text' , 'table.hmQVUs').each(function() {//saco los span q tienen el texto del valor respecto al cup  y lo limpio
        var precio = $(this).text();
        precio=(precio.replace(' CUP', ''));
        price.push(precio);
     });
     
  

   
  }
  const salida= pushArraysToData(currency, price);// armo mi array de salida
  console.log(salida);
  salidaJson = JSON.stringify(salida);
/*   fs.writeFile('cambio.json', JSON.stringify(salida),'utf8', (err) => { //actualizo el archivo json con el array de salida
    if (err) throw err; 
    console.log('cambio.json ha sido actualizado'); 
  }); */
});
}// fin temporizador



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/cambio',(req,res)=>{res.send({message: salidaJson})
})


  app.listen(3001, ()=>{
    console.log('listo');
});  


  
  
 



function pushArraysToData(pro, array){
    let withKeys = {}
    for(let i = 0; i < pro.length; i++){
      withKeys[pro[i]] = array[i]
    }
  return withKeys
}
 

 
 
 
//pruena de git