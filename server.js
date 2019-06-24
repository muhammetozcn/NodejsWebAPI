var http = require('http');
var fs=require('fs');
var mysql = require('mysql');
var bodyParser = require('body-parser')
const app = require('express')()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//MYSQL CONNECTİON
var con = mysql.createConnection({
  host: "localhost",
  user: "muhammet37",
  password: "",
  database:"firmalar"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//***********************************

//SQL FONKSİYONLARI
var kullaniciVarmi= function asd(con,sqlString){
 return new Promise(function(resolve, reject) {
     con.query(sqlString,function (err, result, fields) {
    if (err) throw err;
    console.log("fonksiyoniçi:"+result.length);
    console.log("asdqwer:"+sqlString);
    resolve(result.length);
  })
  });
}

var firmaEkle=function asd1(con,sqlStr){
    con.query(sqlStr,function(err,result){
        if(err) throw err;
        console.log("1 Firma eklendi")
    })
}

var kullaniciEkle=function asd1(con,sqlStr,response){
    con.query(sqlStr,function(err,result){
        if(err){
            response.json({kullanici:'0'})
        }
        console.log("1 Kullanıcı eklendi")
        response.json({kullanici:'1'});
    })
}


//*******************************************************************
//POST İŞLEMİ TAMAM POSTMANDA X-FORM-URLENCODED GÖNDER



app.post('/kullaniciAra',(request,response)=>{
       console.log("android geldi");
      
       var kullaniciAdi=request.body.kullaniciAdi;
       var sifre=request.body.sifre;
     
       var sql="SELECT *FROM kullaniciData where BINARY kullaniciAdi='"+kullaniciAdi+"' and BINARY sifre='"+sifre+"';"
       kullaniciVarmi(con,sql).then(function(result){
       console.log("VeriTabaniSonucu:"+result)
       //result 0 sa öyle bir kullanıcı yok result 1 se kullaniciAdi ve şifre doğru
       if(result==1){
           response.json({kontrol: '1'});
       }else{
          response.json({kontrol: '0'});
       }
       });
})
//*************************************************************

app.post('/kullaniciEkle',(request,response)=>{
    console.log("merhaba android kullaniciEkle")
       var kullaniciAdi=request.body.kullaniciAdi;
       var sifre=request.body.sifre;
       var sql="SELECT *FROM kullaniciData where kullaniciAdi='"+kullaniciAdi+"' and sifre='"+sifre+"';"
          
       kullaniciVarmi(con,sql).then(function(result){
       console.log("VeriTabaniSonucu:"+result)
       
      
       //result 0 sa ekle 1 se ekleme
       if(result==1){
           response.json({kontrol: '0'});
       }else{
           //veri tabanına kayıtı ekle
       var sqlSorgu="INSERT INTO kullaniciData values('"+kullaniciAdi+"','"+sifre+"');";
       kullaniciEkle(con,sqlSorgu,response);
       response.json({kontrol:'1'});
       }
       });
})

//********************************************************************
//bu post methodu index.html formdan gelen bilgileri veritabanına ekler
app.post('/veriTabaniEkle',(request,response)=>{
    var firmaAdi=request.body.firmaAdi;
    var firmaLokasyon=request.body.firmaLokasyon;
    var kampanyaIcerik=request.body.kampanyaIcerik;
    var kampanyaSuresi=request.body.kampanyaSuresi;
    var sqlString="SELECT *FROM firmaData where firmaAdi='"+firmaAdi+"';";
   /* kullaniciVarmi(con,sqlString).then(function(result){
        
    })*/
    var sqlStr="INSERT INTO firmaData (firmaAdı,firmalokasyon,kampanyaIcerik,kampanyaSuresi) values('"+firmaAdi+"','"+firmaLokasyon+"','"+kampanyaIcerik+"','"+kampanyaSuresi+"');"
    firmaEkle(con,sqlStr);
    console.log("kullanici eklendi");
    response.sendfile("./index.html");

})
app.get('/',(request,response)=>{
       response.sendfile('./index.html');
       console.log("ana sayfa");
})
app.listen(process.env.PORT);

