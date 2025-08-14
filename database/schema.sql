-- ================================================
-- KampusKantin Veritabanı Schema
-- Oluşturulma Tarihi: 2025-08-14
-- ================================================

USE [KantinDB]
GO

-- ================================================
-- 1. KULLANICILAR TABLOSU
-- Öğrenci bilgilerini ve kart eşleştirmelerini tutar
-- ================================================
CREATE TABLE [dbo].[Kullanicilar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[KartId] [nvarchar](50) NOT NULL,
	[OgrenciNo] [nvarchar](50) NOT NULL,
	[Ad] [nvarchar](100) NOT NULL,
	[Soyad] [nvarchar](100) NOT NULL,
	[Sifre] [nvarchar](255) NOT NULL,
	[Bakiye] [decimal](10, 2) NOT NULL,
	[KayitTarihi] [datetime] NOT NULL,
 CONSTRAINT [PK__Kullanic__3214EC0705D86F08] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__Kullanic__E497FE1A7061F755] UNIQUE NONCLUSTERED 
(
	[OgrenciNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Kullanicilar tablosu için varsayılan değerler
ALTER TABLE [dbo].[Kullanicilar] ADD  CONSTRAINT [DF__Kullanici__Bakiy__4BAC3F29]  DEFAULT ((0)) FOR [Bakiye]
GO

ALTER TABLE [dbo].[Kullanicilar] ADD  CONSTRAINT [DF__Kullanici__Kayit__4CA06362]  DEFAULT (getdate()) FOR [KayitTarihi]
GO

-- ================================================
-- 2. KARTLAR TABLOSU
-- NFC kartlarının durumunu ve atama bilgilerini tutar
-- ================================================
CREATE TABLE [dbo].[Kartlar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[KartId] [nvarchar](50) NOT NULL,
	[IsAssigned] [bit] NOT NULL,
	[IsFrozen] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[KartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Kartlar tablosu için varsayılan değerler
ALTER TABLE [dbo].[Kartlar] ADD  DEFAULT ((0)) FOR [IsAssigned]
GO

ALTER TABLE [dbo].[Kartlar] ADD  CONSTRAINT [DF_Kartlar_IsAssigned1]  DEFAULT ((0)) FOR [IsFrozen]
GO

-- ================================================
-- 3. URUNLER TABLOSU
-- Kantin ürünlerini ve fiyatlarını tutar
-- ================================================
CREATE TABLE [dbo].[Urunler](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[urunKodu] [varchar](20) NOT NULL,
	[urunAdi] [varchar](100) NOT NULL,
	[fiyat] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[urunKodu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- ================================================
-- 4. HESAP HAREKETLERİ TABLOSU
-- Öğrencilerin hesap işlemlerini kayıt altına alır
-- ================================================
CREATE TABLE [dbo].[HesapHareketleri](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ogrenciNo] [varchar](20) NOT NULL,
	[islemTarihi] [datetime] NULL,
	[islemTuru] [varchar](8000) NOT NULL,
	[tutar] [decimal](10, 2) NOT NULL,
	[bakiye] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK__HesapHar__3213E83FD8C12D4A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- HesapHareketleri tablosu için varsayılan değerler
ALTER TABLE [dbo].[HesapHareketleri] ADD  CONSTRAINT [DF__HesapHare__islem__3F115E1A]  DEFAULT (getdate()) FOR [islemTarihi]
GO

-- ================================================
-- 5. SATIN ALINAN URUNLER TABLOSU
-- Her işlemdeki ürün detaylarını tutar
-- ================================================
CREATE TABLE [dbo].[SatinAlinanUrunler](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[hareketId] [int] NOT NULL,
	[urunKodu] [varchar](20) NOT NULL,
	[adet] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- ================================================
-- FOREIGN KEY CONSTRAINTS
-- ================================================

-- SatinAlinanUrunler -> HesapHareketleri ilişkisi
ALTER TABLE [dbo].[SatinAlinanUrunler]  WITH CHECK ADD  CONSTRAINT [FK__SatinAlin__harek__41EDCAC5] FOREIGN KEY([hareketId])
REFERENCES [dbo].[HesapHareketleri] ([id])
GO

ALTER TABLE [dbo].[SatinAlinanUrunler] CHECK CONSTRAINT [FK__SatinAlin__harek__41EDCAC5]
GO

-- ================================================
-- VERİTABANI OLUŞTURMA KOMUTLARI (İsteğe bağlı)
-- ================================================

/*
-- Eğer veritabanı yoksa oluşturmak için:
CREATE DATABASE [KantinDB]
 CONTAINMENT = NONE
 ON  ( NAME = N'KantinDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\KantinDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON ( NAME = N'KantinDB_Log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\KantinDB_Log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
*/
