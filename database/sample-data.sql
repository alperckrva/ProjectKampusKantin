-- ================================================
-- KampusKantin Örnek Veriler (Sample Data)
-- Bu dosya test ve geliştirme amaçlı örnek veriler içerir
-- ================================================

USE [KantinDB]
GO

-- ================================================
-- 1. KARTLAR - Örnek NFC Kartları
-- ================================================
INSERT INTO [dbo].[Kartlar] ([KartId], [IsAssigned], [IsFrozen])
VALUES 
    ('04b3f62a', 0, 0),           -- Atanmamış kart
    ('a1b2c3d4', 1, 0),           -- Atanmış aktif kart
    ('e5f6g7h8', 1, 0),           -- Atanmış aktif kart
    ('i9j0k1l2', 1, 1),           -- Dondurulmuş kart
    ('m3n4o5p6', 0, 0),           -- Atanmamış kart
    ('q7r8s9t0', 1, 0),           -- Atanmış aktif kart
    ('u1v2w3x4', 0, 0),           -- Atanmamış kart
    ('y5z6a7b8', 1, 0);           -- Atanmış aktif kart
GO

-- ================================================
-- 2. KULLANICILAR - Örnek Öğrenciler
-- ================================================
INSERT INTO [dbo].[Kullanicilar] ([KartId], [OgrenciNo], [Ad], [Soyad], [Sifre], [Bakiye], [KayitTarihi])
VALUES 
    ('a1b2c3d4', '2021001', 'Ahmet', 'Yılmaz', '123456', 50.00, '2024-09-01 10:00:00'),
    ('e5f6g7h8', '2021002', 'Ayşe', 'Demir', '123456', 75.50, '2024-09-01 11:30:00'),
    ('i9j0k1l2', '2021003', 'Mehmet', 'Kaya', '123456', 0.00, '2024-09-02 09:15:00'),    -- Dondurulmuş hesap
    ('q7r8s9t0', '2021004', 'Fatma', 'Özkan', '123456', 125.75, '2024-09-02 14:20:00'),
    ('y5z6a7b8', '2021005', 'Ali', 'Çelik', '123456', 30.25, '2024-09-03 08:45:00');
GO

-- ================================================
-- 3. ÜRÜNLER - Kantin Ürünleri
-- ================================================
INSERT INTO [dbo].[Urunler] ([urunKodu], [urunAdi], [fiyat])
VALUES 
    -- İçecekler
    ('ICE001', 'Su (0.5L)', 2.50),
    ('ICE002', 'Çay', 3.00),
    ('ICE003', 'Türk Kahvesi', 5.00),
    ('ICE004', 'Kola', 8.00),
    ('ICE005', 'Ayran', 4.50),
    ('ICE006', 'Meyve Suyu', 6.00),
    ('ICE007', 'Enerji İçeceği', 12.00),
    
    -- Yemekler
    ('YEM001', 'Tost', 15.00),
    ('YEM002', 'Hamburger', 25.00),
    ('YEM003', 'Pizza Dilim', 18.00),
    ('YEM004', 'Döner', 22.00),
    ('YEM005', 'Köfte Ekmek', 20.00),
    ('YEM006', 'Balık Ekmek', 28.00),
    
    -- Atıştırmalıklar
    ('SNK001', 'Çips', 7.50),
    ('SNK002', 'Bisküvi', 5.00),
    ('SNK003', 'Çikolata', 8.50),
    ('SNK004', 'Gofret', 6.00),
    ('SNK005', 'Kuruyemiş', 12.00),
    ('SNK006', 'Meyve', 4.00),
    
    -- Tatlılar
    ('TAT001', 'Baklava', 15.00),
    ('TAT002', 'Künefe', 20.00),
    ('TAT003', 'Dondurma', 10.00),
    ('TAT004', 'Profiterol', 18.00);
GO

-- ================================================
-- 4. HESAP HAREKETLERİ - Örnek İşlemler
-- ================================================
INSERT INTO [dbo].[HesapHareketleri] ([ogrenciNo], [islemTarihi], [islemTuru], [tutar], [bakiye])
VALUES 
    -- Ahmet Yılmaz (2021001) işlemleri
    ('2021001', '2024-09-01 10:15:00', 'Bakiye Yükleme', 100.00, 100.00),
    ('2021001', '2024-09-01 12:30:00', 'Satın Alma', -15.00, 85.00),
    ('2021001', '2024-09-01 14:45:00', 'Satın Alma', -8.00, 77.00),
    ('2021001', '2024-09-02 09:20:00', 'Satın Alma', -27.00, 50.00),
    
    -- Ayşe Demir (2021002) işlemleri
    ('2021002', '2024-09-01 11:45:00', 'Bakiye Yükleme', 50.00, 50.00),
    ('2021002', '2024-09-01 13:15:00', 'Satın Alma', -18.00, 32.00),
    ('2021002', '2024-09-02 10:30:00', 'Bakiye Yükleme', 75.00, 107.00),
    ('2021002', '2024-09-02 12:45:00', 'Satın Alma', -31.50, 75.50),
    
    -- Mehmet Kaya (2021003) işlemleri - Sonradan donduruldu
    ('2021003', '2024-09-02 09:30:00', 'Bakiye Yükleme', 25.00, 25.00),
    ('2021003', '2024-09-02 11:00:00', 'Satın Alma', -25.00, 0.00),
    
    -- Fatma Özkan (2021004) işlemleri
    ('2021004', '2024-09-02 14:30:00', 'Bakiye Yükleme', 200.00, 200.00),
    ('2021004', '2024-09-02 15:15:00', 'Satın Alma', -42.50, 157.50),
    ('2021004', '2024-09-03 09:30:00', 'Satın Alma', -31.75, 125.75),
    
    -- Ali Çelik (2021005) işlemleri
    ('2021005', '2024-09-03 09:00:00', 'Bakiye Yükleme', 75.00, 75.00),
    ('2021005', '2024-09-03 12:20:00', 'Satın Alma', -22.50, 52.50),
    ('2021005', '2024-09-03 14:10:00', 'Satın Alma', -22.25, 30.25);
GO

-- ================================================
-- 5. SATIN ALINAN ÜRÜNLER - İşlem Detayları
-- ================================================
INSERT INTO [dbo].[SatinAlinanUrunler] ([hareketId], [urunKodu], [adet])
VALUES 
    -- Ahmet'in işlemleri
    (2, 'YEM001', 1),              -- Tost 15.00
    (3, 'ICE004', 1),              -- Kola 8.00
    (4, 'YEM002', 1),              -- Hamburger 25.00
    (4, 'ICE001', 1),              -- Su 2.50
    
    -- Ayşe'nin işlemleri
    (6, 'YEM003', 1),              -- Pizza Dilim 18.00
    (8, 'YEM004', 1),              -- Döner 22.00
    (8, 'ICE005', 1),              -- Ayran 4.50
    (8, 'SNK001', 1),              -- Çips 7.50
    
    -- Mehmet'in işlemleri
    (10, 'YEM005', 1),             -- Köfte Ekmek 20.00
    (10, 'ICE002', 1),             -- Çay 3.00
    (10, 'SNK004', 1),             -- Gofret 6.00
    
    -- Fatma'nin işlemleri
    (12, 'YEM006', 1),             -- Balık Ekmek 28.00
    (12, 'ICE007', 1),             -- Enerji İçeceği 12.00
    (12, 'TAT002', 1),             -- Künefe 20.00
    (13, 'TAT001', 2),             -- Baklava 15.00 x 2 = 30.00
    (13, 'ICE003', 1),             -- Türk Kahvesi 5.00
    
    -- Ali'nin işlemleri
    (15, 'YEM001', 1),             -- Tost 15.00
    (15, 'ICE006', 1),             -- Meyve Suyu 6.00
    (15, 'SNK002', 1),             -- Bisküvi 5.00
    (16, 'TAT003', 2),             -- Dondurma 10.00 x 2 = 20.00
    (16, 'ICE001', 1);             -- Su 2.50
GO

-- ================================================
-- VERİ DOĞRULAMA SORGULARI
-- Bu sorguları çalıştırarak verilerin doğru yüklendiğini kontrol edebilirsiniz
-- ================================================

/*
-- Kullanıcı sayısı kontrolü
SELECT COUNT(*) as ToplamKullanici FROM Kullanicilar;

-- Kart durumu özeti
SELECT 
    SUM(CASE WHEN IsAssigned = 1 THEN 1 ELSE 0 END) as AtanmisKartlar,
    SUM(CASE WHEN IsAssigned = 0 THEN 1 ELSE 0 END) as AtanmamisKartlar,
    SUM(CASE WHEN IsFrozen = 1 THEN 1 ELSE 0 END) as DondurulmusKartlar
FROM Kartlar;

-- Ürün kategorileri
SELECT COUNT(*) as ToplamUrun FROM Urunler;

-- Toplam işlem sayısı
SELECT COUNT(*) as ToplamIslem FROM HesapHareketleri;

-- En çok satılan ürünler
SELECT u.urunAdi, SUM(sau.adet) as ToplamSatis
FROM SatinAlinanUrunler sau
JOIN Urunler u ON sau.urunKodu = u.urunKodu
GROUP BY u.urunAdi
ORDER BY ToplamSatis DESC;
*/
