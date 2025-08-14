import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSepet } from './SepetContext';

const Market = () => {
  const [urunler, setUrunler] = useState([]);
  const { sepeteEkle, sepet, urunAzalt, urunSil, toplamFiyat, sepetiTemizle } = useSepet();
  const [mesaj, setMesaj] = useState('');
  const [islemBekleniyor, setIslemBekleniyor] = useState(false);

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const response = await axios.get('http://192.168.110.56:3003/urunler');
        setUrunler(response.data);
      } catch (error) {
        console.error('Ürünler alınamadı:', error);
      }
    };
    fetchUrunler();
  }, []);

  const sepetiOnayla = async () => {
    if (sepet.length === 0) {
      alert('Sepet boş!');
      return;
    }

    setMesaj('📡 Lütfen kartınızı okutun...');
    setIslemBekleniyor(true);

    const interval = setInterval(async () => {
      try {
        const kartYaniti = await axios.get('http://192.168.110.56:3003/api/kart-okuma');
        const kartId = kartYaniti.data.kartId;

        if (kartId) {
          clearInterval(interval);
          setIslemBekleniyor(false);

          const sepetTutari = parseFloat(toplamFiyat.toFixed(2));
          const gonderilecekUrunler = sepet.map(urun => ({
            urunKodu: urun.urunKodu,
            adet: urun.adet
          }));

          const payload = {
            kartId,
            sepetTutari,
            urunler: gonderilecekUrunler
          };

          console.log("🔄 Sepet gönderiliyor:", payload);

          const response = await axios.post('http://192.168.110.56:3003/api/kullanici/kartGeldi', payload);

          if (response.data.success) {
            // ✅ Önce mesajı göster
            setMesaj('✅ Alışveriş tamamlandı.');

            // ✅ 2 saniye sonra sepeti temizle
            setTimeout(() => {
              sepetiTemizle();
            }, 2000);
          } else {
            setMesaj(`❌ ${response.data.message}`);
          }
        } else {
          console.log("📡 Kart hala okutulmadı...");
        }
      } catch (err) {
        clearInterval(interval);
        setIslemBekleniyor(false);
        console.error("❌ Hata:", err.response?.data || err.message);
        setMesaj('⛔ Sunucu hatası oluştu.');
      }
    }, 2000);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Ürün Listesi */}
      <div style={{
        padding: '30px',
        backgroundColor: '#f4f4f4',
        width: 'calc(100% - 350px)',
        minHeight: '100vh'
      }}>
        <h2 style={{ marginBottom: '20px' }}>🛍️ Ürün Listesi</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          {urunler.map((urun) => (
            <div
              key={urun.urunKodu}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3>{urun.urunAdi}</h3>
                <p><strong>Barkod:</strong> {urun.urunKodu}</p>
                <p><strong>Fiyat:</strong> ₺{urun.fiyat.toFixed(2)}</p>
              </div>
              <button
                onClick={() => {
                  setMesaj('');
                  sepeteEkle(urun);
                }}
                style={{
                  marginTop: '15px',
                  padding: '10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                ➕ Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sepet Paneli */}
      <div style={{
        width: '350px',
        height: '100vh',
        backgroundColor: '#fff',
        borderLeft: '1px solid #ddd',
        padding: '20px',
        overflowY: 'auto',
        position: 'sticky',
        top: 0
      }}>
        <h2>🛒 Sepet</h2>

        {sepet.length === 0 ? (
          <p>Sepetiniz boş.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sepet.map((urun) => (
                <li key={urun.urunKodu} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                  <div><strong>{urun.urunAdi}</strong></div>
                  <div>Barkod: {urun.urunKodu}</div>
                  <div>₺{urun.fiyat.toFixed(2)} x {urun.adet}</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    <button onClick={() => {
                      setMesaj('');
                      sepeteEkle(urun);
                    }}>➕</button>
                    <button onClick={() => {
                      setMesaj('');
                      urunAzalt(urun.urunKodu);
                    }}>➖</button>
                    <button onClick={() => {
                      setMesaj('');
                      urunSil(urun.urunKodu);
                    }}>🗑️</button>
                  </div>
                </li>
              ))}
            </ul>

            <h3 style={{ marginTop: '20px' }}>Toplam: ₺{toplamFiyat.toFixed(2)}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <button
                onClick={() => {
                  setMesaj('');
                  sepetiTemizle();
                }}
                style={{
                  padding: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                }}
              >
                🧹 Sepeti Temizle
              </button>
              <button
                onClick={sepetiOnayla}
                style={{
                  padding: '10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                }}
                disabled={islemBekleniyor}
              >
                ✅ Sepeti Onayla
              </button>
              <p style={{ fontWeight: 'bold', color: '#555' }}>{mesaj}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Market;
