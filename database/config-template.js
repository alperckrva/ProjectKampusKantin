// ================================================
// KampusKantin Veritabanı Yapılandırma Şablonu
// Bu dosyayı kopyalayıp kendi ayarlarınızla doldurun
// ================================================

// MSSQL Bağlantı Yapılandırması
const config = {
  // Sunucu bilgileri
  server: 'SUNUCU_ADINIZ\\INSTANCE_ADI',     // Örnek: 'localhost\\SQLEXPRESS'
  database: 'KantinDB',                       // Veritabanı adı
  
  // Kimlik doğrulama seçenekleri
  user: 'kullanici_adiniz',                   // SQL Server kullanıcı adı (Windows Auth için gerekli değil)
  password: 'sifreniz',                       // SQL Server şifresi (Windows Auth için gerekli değil)
  
  // Bağlantı seçenekleri
  options: {
    encrypt: true,                            // Azure SQL için true, lokal için false olabilir
    trustServerCertificate: true,             // Self-signed sertifikalar için true
    enableArithAbort: true,                   // Aritmetik hatalar için
    instanceName: 'SQLEXPRESS'                // SQL Server instance adı
  },
  
  // Windows Authentication için
  connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=SUNUCU_ADINIZ\\SQLEXPRESS;Database=KantinDB;Trusted_Connection=Yes;",
  driver: "msnodesqlv8",                      // Windows Auth için gerekli
  
  // Bağlantı havuzu ayarları
  pool: {
    max: 10,                                  // Maksimum bağlantı sayısı
    min: 0,                                   // Minimum bağlantı sayısı
    idleTimeoutMillis: 30000                  // Boşta kalma süresi
  }
};

// ================================================
// FARKLI ORTAMLAR İÇİN AYARLAR
// ================================================

// Geliştirme ortamı
const developmentConfig = {
  server: 'localhost\\SQLEXPRESS',
  database: 'KantinDB_Dev',
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=KantinDB_Dev;Trusted_Connection=Yes;",
  driver: "msnodesqlv8"
};

// Test ortamı
const testConfig = {
  server: 'localhost\\SQLEXPRESS',
  database: 'KantinDB_Test',
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=KantinDB_Test;Trusted_Connection=Yes;",
  driver: "msnodesqlv8"
};

// Üretim ortamı
const productionConfig = {
  server: process.env.DB_SERVER || 'production-server',
  database: process.env.DB_NAME || 'KantinDB',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true
  }
};

// ================================================
// ORTAM AYARLARINA GÖRE CONFIG SEÇİMİ
// ================================================
const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'development':
      return developmentConfig;
    case 'test':
      return testConfig;
    case 'production':
      return productionConfig;
    default:
      return config;
  }
};

// ================================================
// KULLANIM ÖRNEKLERİ
// ================================================

/*
// Express.js uygulamasında kullanım:

const sql = require('mssql');
const config = require('./database/config');

// Bağlantı kurma
sql.connect(config)
  .then(pool => {
    console.log('✅ Veritabanı bağlantısı başarılı');
    return pool;
  })
  .catch(err => {
    console.error('❌ Veritabanı bağlantı hatası:', err);
    process.exit(1);
  });

// Sorgu çalıştırma
const getUsers = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query('SELECT * FROM Kullanicilar');
    return result.recordset;
  } catch (err) {
    console.error('Sorgu hatası:', err);
    throw err;
  }
};

// Parameterized sorgu
const getUserById = async (ogrenciNo) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('OgrenciNo', sql.VarChar(50), ogrenciNo)
      .query('SELECT * FROM Kullanicilar WHERE OgrenciNo = @OgrenciNo');
    return result.recordset[0];
  } catch (err) {
    console.error('Sorgu hatası:', err);
    throw err;
  }
};
*/

// ================================================
// EXPORT
// ================================================
module.exports = {
  config,
  developmentConfig,
  testConfig,
  productionConfig,
  getConfig
};

// ENV örneği (.env dosyası için):
/*
NODE_ENV=development
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=KantinDB
DB_USER=your_username
DB_PASSWORD=your_password
*/
