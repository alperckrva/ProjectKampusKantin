# 🏫 Kampus Kantin Projesi

## 📝 Proje Hakkında

Kampus Kantin Projesi, okul kantinlerinde öğrencilerin güvenli alışveriş yapması ve ailelerin çocuklarının harcamalarını takip edebilmesi için geliştirilmiş modern bir NFC tabanlı ödeme ve yönetim sistemidir. **Özellikle ortaokul ve ilkokul öğrencilerini nakit dolandırıcılığından korumak** ve **ailelere tam harcama kontrolü** sağlamak amacıyla tasarlanmıştır.

### 🎯 Projenin Amacı

**Ana Hedef: Çocukların Mali Güvenliği ve Aile Kontrolü**
- **👨‍👩‍👧‍👦 Aile Şeffaflığı**: Aileler çocuklarının ne aldığını, ne kadar harcadığını gerçek zamanlı takip edebilir
- **🛡️ Dolandırıcılık Koruması**: Ortaokul ve ilkokul öğrencilerini nakit dolandırıcılığından koruma
- **💰 Bütçe Kontrolü**: Öğrencilerin harcama limitlerini aileler belirleyebilir
- **📊 Harcama Şeffaflığı**: Her satın alma detaylı olarak kaydedilir ve raporlanır

**Teknik Hedefler:**
- Kampus kantinlerinde nakit kullanımını minimize etmek
- NFC teknolojisi ile hızlı ve güvenli ödeme sağlamak
- Öğrencilere dijital bakiye yönetimi imkanı sunmak
- Kantin işletmecilerine modern bir satış ve stok yönetim sistemi sunmak
- Mobil ve web tabanlı kullanıcı dostu arayüzler sağlamak

### 🏗️ Proje Yapısı

Bu proje 4 ana bileşenden oluşmaktadır:

```
KampusKantinProject/
├── 📱 mobilapp/           # React Native Mobil Uygulama
│   ├── kantinMobilFrontend/    # Expo React Native Frontend
│   └── kantinMobilBackend/     # Node.js Backend API
├── 🌐 webapp/             # Web Uygulaması (React)
├── 🛒 marketapp/          # Market/Kantin Yönetim Uygulaması (React)
└── 🔧 esp32/             # ESP32 NFC Kart Okuyucu Firmware
```

## 🚀 Özellikler

### 📱 Mobil Uygulama (React Native + Expo)
- **Kullanıcı Kayıt/Giriş**: Güvenli hesap yönetimi
- **Bakiye Görüntüleme**: Anlık bakiye sorgulama
- **Hesap Hareketleri**: Detaylı işlem geçmişi
- **Kart Yönetimi**: NFC kart kayıp bildirimi
- **Profil Yönetimi**: Kişisel bilgi güncelleme

### 🌐 Web Uygulaması (React)
- **Responsive Tasarım**: Tüm cihazlarda uyumlu
- **Kullanıcı Paneli**: Kapsamlı hesap yönetimi
- **Bakiye İşlemleri**: Online bakiye yükleme
- **İşlem Geçmişi**: Detaylı harcama raporları

### 🛒 Market Yönetim Sistemi (React)
- **Ürün Yönetimi**: Stok takibi ve fiyatlandırma
- **Satış Yönetimi**: POS sistemi entegrasyonu
- **Raporlama**: Günlük/aylık satış raporları
- **Kullanıcı Yönetimi**: Müşteri hesap yönetimi

### 🔧 ESP32 NFC Sistemi (C++)
- **NFC Kart Okuma**: PN532 modülü ile kart tanıma
- **WiFi Bağlantısı**: Sunucu ile gerçek zamanlı iletişim
- **API Entegrasyonu**: Backend sistemle senkronizasyon

## 🛠️ Teknoloji Stack'i

### Frontend
- **React 19.1.0**: Modern web geliştirme
- **React Native**: Cross-platform mobil geliştirme
- **Expo**: React Native geliştirme platformu
- **React Router DOM**: SPA routing
- **Axios**: HTTP client
- **CSS3**: Modern styling

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MSSQL**: Veritabanı
- **CORS**: Cross-origin resource sharing
- **bcrypt**: Şifre hashleme

### Hardware/IoT
- **ESP32**: Mikrocontroller
- **PN532**: NFC/RFID modülü
- **WiFi**: Kablosuz iletişim

### Development Tools
- **Git**: Version control
- **npm**: Package management
- **PlatformIO**: ESP32 development

## 📋 Sistem Gereksinimleri

### Geliştirme Ortamı
- **Node.js** 18.0.0 veya üzeri
- **npm** 8.0.0 veya üzeri
- **Git** 2.30.0 veya üzeri
- **VS Code** (önerilen IDE)
- **PlatformIO** (ESP32 geliştirme için)

### Donanım Gereksinimleri
- **ESP32 Development Board**
- **PN532 NFC/RFID Modülü**
- **Jumper Kablolar**
- **Breadboard** (opsiyonel)

## 🚀 Kurulum ve Çalıştırma

### ⚡ Hızlı Başlangıç

**Not**: Bu repository node_modules klasörlerini içermez. Her modül için bağımlılıkları ayrı ayrı kurmanız gerekir.

### 1️⃣ Repository'yi Klonlayın
```bash
git clone https://github.com/alperckrva/ProjectKampusKantin.git
cd KampusKantinProject
```

### 2️⃣ Web Uygulaması Kurulumu
```bash
# Web uygulaması klasörüne geç
cd webapp

# Bağımlılıkları kur
npm install

# Geliştirme sunucusunu başlat
npm start

# Backend'i ayrı terminalde çalıştır
cd backend
npm install
node server.js
```
**Erişim**: http://localhost:3000

### 3️⃣ Market Uygulaması Kurulumu
```bash
# Market uygulaması klasörüne geç
cd marketapp

# Bağımlılıkları kur
npm install

# Uygulamayı başlat
npm start

# Backend'i ayrı terminalde çalıştır
cd backend
npm install
node server.js
```
**Erişim**: http://localhost:3000

### 4️⃣ Mobil Uygulama Kurulumu

#### Frontend (React Native + Expo)
```bash
# Mobil frontend klasörüne geç
cd mobilapp/kantinMobilFrontend

# Bağımlılıkları kur
npm install

# Expo sunucusunu başlat
npm start

# Belirli platform için çalıştır
npm run android  # Android için
npm run ios      # iOS için
npm run web      # Web için
```

#### Backend
```bash
# Mobil backend klasörüne geç
cd mobilapp/kantinMobilBackend

# Bağımlılıkları kur
npm install

# Backend sunucusunu başlat
npm start
```

### 5️⃣ ESP32 NFC Sistemi Kurulumu

#### Gerekli Kütüphaneler
```cpp
// PlatformIO ile otomatik kurulur
#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <Adafruit_PN532.h>
#include <WiFi.h>
#include <HTTPClient.h>
```

#### Donanım Bağlantıları
```
ESP32        PN532
-----        -----
3.3V    -->  VCC
GND     -->  GND
GPIO21  -->  SDA
GPIO22  -->  SCL
```

#### Firmware Yükleme
```bash
# ESP32 klasörüne geç
cd esp32

# PlatformIO ile derle ve yükle
pio run --target upload

# Seri monitörü başlat
pio device monitor
```

## ⚙️ Yapılandırma

### 🌐 Network Ayarları
ESP32 kodunda WiFi bilgilerini güncelleyin:
```cpp
const char* ssid = "WiFi_AĞINIZ";
const char* password = "WiFi_ŞİFRENİZ";
```

### 🗄️ Veritabanı Bağlantısı
Backend dosyalarında MSSQL bağlantı bilgilerini yapılandırın:
```javascript
const config = {
  server: 'your-server',
  database: 'your-database',
  user: 'your-username',
  password: 'your-password'
};
```

### 🔗 API Endpoint'leri
ESP32 kodunda backend URL'ini güncelleyin:
```cpp
http.begin("http://BACKEND_IP:PORT/api/kart-okuma");
```

## 🗄️ Veritabanı Kurulumu

### Veritabanı Yapısı
Proje **Microsoft SQL Server** kullanır. Veritabanı dosyaları `database/` klasöründe bulunur:

- **schema.sql**: Tablo yapıları ve ilişkiler
- **sample-data.sql**: Test için örnek veriler
- **config-template.js**: Bağlantı ayarları şablonu

### Hızlı Veritabanı Kurulumu

1. **SQL Server kurulumu:**
```bash
# SQL Server Express indirin ve kurun
# https://www.microsoft.com/en-us/sql-server/sql-server-downloads
```

2. **Veritabanını oluşturun:**
```sql
-- SQL Server Management Studio'da çalıştırın
-- Önce database/schema.sql dosyasını çalıştırın
-- Sonra database/sample-data.sql dosyasını çalıştırın
```

3. **Backend bağlantı ayarları:**
```javascript
// Her backend klasöründe config.js oluşturun
const config = {
  server: 'localhost\\SQLEXPRESS',
  database: 'KantinDB',
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=KantinDB;Trusted_Connection=Yes;",
  driver: "msnodesqlv8"
};
```

Detaylı kurulum talimatları için `database/README.md` dosyasına bakın.

## 📱 Kullanım Kılavuzu

### 👨‍🎓 Öğrenci Kullanımı
1. **Kayıt Olma**: Aile onayı ile mobil uygulama veya web üzerinden hesap oluşturun
2. **Kart Tanımlama**: Okul tarafından verilen NFC kartını sisteme kaydedin
3. **Bakiye Kontrolü**: Güncel bakiyenizi mobil uygulamadan kontrol edin
4. **Güvenli Alışveriş**: Kantinde NFC kartınızı okutarak ödeme yapın (nakit gerekmez!)
5. **Harcama Takibi**: Tüm alışverişleriniz otomatik olarak kaydedilir ve ailenizle paylaşılır

### 👨‍👩‍👧‍👦 Aile Kullanımı
1. **Çocuk Hesabı Kontrolü**: Çocuğunuzun hesabını web panelinden yönetin
2. **Bakiye Yükleme**: Güvenli online ödeme ile bakiye ekleyin
3. **Harcama Takibi**: Ne aldığını, ne zaman aldığını gerçek zamanlı görün
4. **Limit Belirleme**: Günlük/haftalık harcama limitleri belirleyin
5. **Alarm Sistemi**: Belirlenen limitleri aştığında bildirim alın
6. **Detaylı Raporlar**: Aylık harcama raporlarını inceleyin

### 🏪 Kantin İşletmecisi Kullanımı
1. **Giriş**: Market yönetim sistemine giriş yapın
2. **Ürün Yönetimi**: Ürünleri ekleyin, düzenleyin
3. **Satış**: NFC okuyucu ile müşteri ödemelerini alın
4. **Raporlama**: Günlük satış raporlarını görüntüleyin

### 🔧 Sistem Yöneticisi
1. **Kullanıcı Yönetimi**: Hesapları yönetin
2. **Sistem İzleme**: API loglarını kontrol edin
3. **Bakım**: Veritabanı optimizasyonu yapın

## 🐛 Sorun Giderme

### Yaygın Sorunlar ve Çözümleri

#### Node.js Bağımlılık Hataları
```bash
# node_modules'i temizle ve yeniden kur
rm -rf node_modules package-lock.json
npm install
```

#### ESP32 Bağlantı Sorunları
- **WiFi bağlantısı**: SSID ve şifre kontrolü
- **NFC modülü**: Kablo bağlantılarını kontrol edin
- **I2C haberleşme**: SDA/SCL pinlerini doğrulayın

#### CORS Hataları
Backend'de CORS ayarlarını kontrol edin:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.1.100:3000']
}));
```

#### Port Çakışmaları
Farklı portlar kullanın:
```bash
# Web uygulaması için
PORT=3001 npm start

# Market uygulaması için  
PORT=3002 npm start
```

## 🤝 Katkıda Bulunma

1. **Fork** edin
2. **Feature branch** oluşturun (`git checkout -b feature/yeni-ozellik`)
3. **Commit** edin (`git commit -am 'Yeni özellik eklendi'`)
4. **Push** edin (`git push origin feature/yeni-ozellik`)
5. **Pull Request** oluşturun

### 📋 Geliştirme Kuralları
- **ES6+** syntax kullanın
- **Responsive** tasarım uygulayın
- **API dokumentasyonu** güncelleyin
- **Unit test** yazın
- **Git commit** mesajlarını anlamlı yapın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👥 Takım

- **Proje Sahibi**: [alperckrva](https://github.com/alperckrva)
- **Repository**: [ProjectKampusKantin](https://github.com/alperckrva/ProjectKampusKantin.git)

## 📞 İletişim

- **GitHub Issues**: Hata bildirimi ve özellik istekleri için
- **Email**: Proje ile ilgili sorularınız için
- **Documentation**: Detaylı dokümantasyon için wiki sayfalarını kontrol edin

## 🔮 Gelecek Planları

**Aile Güvenlik Özellikleri:**
- [ ] **SMS/Email Bildirim**: Her alışverişte anlık bildirim
- [ ] **Harcama Limitleri**: Günlük/haftalık limit belirleme
- [ ] **Yasaklı Ürünler**: Belirli ürünleri engelleme (abur cubur vs.)
- [ ] **Acil Durum Modu**: Kart kaybolduğunda anında dondurma

**Teknik Geliştirmeler:**
- [ ] **QR Code** ödeme desteği
- [ ] **Biyometrik** kimlik doğrulama  
- [ ] **AI tabanlı** harcama analizi
- [ ] **Push notification** sistemi
- [ ] **Dark mode** tema desteği
- [ ] **Çoklu dil** desteği
- [ ] **Offline mode** implementasyonu

---

## 📊 Proje İstatistikleri

- **Toplam Commit**: ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/alperckrva/ProjectKampusKantin)
- **Kod Boyutu**: ![GitHub code size](https://img.shields.io/github/languages/code-size/alperckrva/ProjectKampusKantin)
- **Lisans**: ![GitHub license](https://img.shields.io/github/license/alperckrva/ProjectKampusKantin)

**Kampus Kantin Projesi** ile modern, güvenli ve kullanıcı dostu bir kampus ödeme sistemi deneyimi yaşayın! 🚀

---
*Son güncelleme: 2025*