import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Kontrol.css';
import './Profil.css';

function Profil() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [ogrenciNo, setOgrenciNo] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const stateOgrenciNo = location.state?.ogrenciNo;
    const storedOgrenciNo = localStorage.getItem("ogrenciNo");
    const finalOgrenciNo = stateOgrenciNo || storedOgrenciNo;

    if (!finalOgrenciNo) {
      console.warn("Öğrenci No hem state'te hem localStorage'da yok!");
      return;
    }

    setOgrenciNo(finalOgrenciNo);

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/profil?ogrenciNo=${finalOgrenciNo}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Kullanıcı verisi alınamadı:", error);
      }
    };

    fetchUserData();
  }, [location.state]);

  if (!userData) {
    return <div>Yükleniyor...</div>;
  }

  const formattedDate = new Date(userData.KayitTarihi).toLocaleString("tr-TR", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleProfile = () => navigate('/profil', { state: { ogrenciNo } });
  const handleBakiyeYukleme = () => navigate('/bakiye', { state: { ogrenciNo } });
  const handleHesapHareketleri = () => navigate('/hesaphareketleri', { state: { ogrenciNo } });
  const handleKartKayboldu = () => navigate('/kartkayboldu', { state: { ogrenciNo } });

  const handleLogout = () => {
    localStorage.removeItem("ogrenciNo");
    navigate('/');
  };

  const handlePasswordUpdate = async () => {
    // Boş alan kontrolü
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Lütfen tüm alanları doldurun!");
      return;
    }

    // Şifre eşleşme kontrolü
    if (newPassword !== confirmPassword) {
      setPasswordError("Yeni şifreler uyuşmuyor!");
      setNewPassword('');
      setConfirmPassword('');
      return;
    }
    setPasswordError('');

    try {
      const response = await fetch('http://localhost:3001/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ogrenciNo: ogrenciNo,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Şifre güncellenirken bir hata oluştu');
      }

      const data = await response.json();
      alert("Şifreniz başarıyla güncellendi!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error("Şifre güncellenemedi:", error);
      setPasswordError(error.message || "Şifre güncellenirken bir hata oluştu");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="kontrol-container" style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{
        flex: 2,
        padding: '2rem 3rem',
        marginTop: '30px',
        backgroundColor: '#f4f4f4',
        color: '#2c3e50',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        <h3 style={{ marginBottom: '2rem', fontSize: '2rem', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
          👤 Profil Bilgileri
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: 'bold', width: '180px', display: 'inline-block', fontSize: '1.2rem' }}>🆔 Kart ID:</span>
          <span style={{ fontSize: '1.2rem' }}>{userData.KartId}</span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: 'bold', width: '180px', display: 'inline-block', fontSize: '1.2rem' }}>👤 Ad:</span>
          <span style={{ fontSize: '1.2rem' }}>{userData.Ad}</span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: 'bold', width: '180px', display: 'inline-block', fontSize: '1.2rem' }}>👤 Soyad:</span>
          <span style={{ fontSize: '1.2rem' }}>{userData.Soyad}</span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: 'bold', width: '180px', display: 'inline-block', fontSize: '1.2rem' }}>🎓 Öğrenci No:</span>
          <span style={{ fontSize: '1.2rem' }}>{userData.OgrenciNo}</span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: 'bold', width: '180px', display: 'inline-block', fontSize: '1.2rem' }}>💰 Bakiye:</span>
          <span style={{ fontSize: '1.2rem' }}>{userData.Bakiye.toFixed(2)} ₺</span>
        </div>

        <div style={{
          marginTop: '2rem',
          maxWidth: '500px',
          marginBottom: '2rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🔒 Şifre Güncelle</h3>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '1rem' }}>Mevcut Şifre:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                padding: '0.6rem',
                width: '100%',
                fontSize: '1rem',
                marginTop: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '1rem' }}>Yeni Şifre:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                padding: '0.6rem',
                width: '100%',
                fontSize: '1rem',
                marginTop: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold', fontSize: '1rem' }}>Yeni Şifre (Tekrar):</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                padding: '0.6rem',
                width: '100%',
                fontSize: '1rem',
                marginTop: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          {passwordError && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>{passwordError}</div>
          )}

          <button
            onClick={handlePasswordUpdate}
            style={{
              backgroundColor: '#2c3e50',
              color: 'white',
              padding: '0.6rem 1rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Şifreyi Güncelle
          </button>
        </div>
      </div>

      <div className="kontrol-menu">
        <h2>Menü</h2>
        <ul>
          <li>
            <button onClick={handleProfile}>Profil</button>
          </li>
          <li>
            <button onClick={handleBakiyeYukleme}>Bakiye Yükleme</button>
          </li>
          <li>
            <button onClick={handleHesapHareketleri}>Hesap Hareketleri</button>
          </li>
          <li>
            <button onClick={handleKartKayboldu}>Kartım Kayboldu</button>
          </li>
          <li>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profil;
