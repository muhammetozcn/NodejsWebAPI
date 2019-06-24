CREATE DATABASE firmalar;
use firmalar;
--firmaData tablosu sonradan eklenecek
CREATE TABLE firmaData(
FirmaID  int primary key not null AUTO_INCREMENT ,
FirmaAdı varchar(25)  not null unique,--firma adını unique yapma s
FirmaLokasyon text,
KampanyaIcerik text,
KampanyaSuresi varchar(15)
);

CREATE TABLE kullaniciData(
    kullaniciAdi varchar(25) primary key,
    sifre varchar(25)
);
SELECT *FROM kullaniciData where kullaniciAdi='sa' and sifre='1' ;

insert into firmaData (firmaAdı,firmalokasyon,kampanyaIcerik,kampanyaSuresi)  values('firma34','istanbul','ramazan kampanyası','151');
kullaniciData