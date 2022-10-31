


let currency=[];
let price = [];
 
var salidaJson; 

//reviso el toque, el tiemo de lectura del eltoque esta por los 6segundos,

 setInterval(leoEltoque, 2000);//probando cada 20s
 





app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/cambio',(req,res)=>{res.send({message: salidaJson})
})


  app.listen(3001, ()=>{
    console.log('listo');
});  


  
  
 




 

 
 
 
//pruena de git