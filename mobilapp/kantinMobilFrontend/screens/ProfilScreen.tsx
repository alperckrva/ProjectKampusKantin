import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilScreen: React.FC = () => {
  const [kullanici, setKullanici] = useState<any>(null);
  const [mevcutSifre, setMevcutSifre] = useState("");
  const [yeniSifre, setYeniSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [loading, setLoading] = useState(true);  // Loading durumu
  const navigation = useNavigation();
  const API_BASE = "http://192.168.110.56:3005/api/kullanici";

  useEffect(() => {
    const fetchKullanici = async () => {
      try {
        const ogrenciNo = await AsyncStorage.getItem("ogrenciNo");
        if (!ogrenciNo) return;

        const response = await axios.get(`${API_BASE}/me?ogrenciNo=${ogrenciNo}`);
        setKullanici(response.data);
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı:", error);
        setMesaj("Kullanıcı bilgileri alınamadı.");
      } finally {
        setLoading(false);  // Veriler yüklendikten sonra loading durumunu kapat
      }
    };

    fetchKullanici();
  }, []);

  const handleSifreGuncelle = async () => {
    // Şifrelerin uyumlu olup olmadığını kontrol et
    if (yeniSifre !== sifreTekrar) {
      setMesaj("Yeni şifreler uyuşmuyor.");
      return;
    }
  
    // Şifre boşluk kontrolü
    if (!mevcutSifre || !yeniSifre || !sifreTekrar) {
      setMesaj("Tüm şifre alanları doldurulmalıdır!");
      return;
    }
  
    try {
      // AsyncStorage'dan öğrenci numarasını al
      const ogrenciNo = await AsyncStorage.getItem("ogrenciNo");
      if (!ogrenciNo) {
        setMesaj("Öğrenci numarası alınamadı.");
        return;
      }
  
      // Şifre güncelleme API'sine istek gönder
      const response = await axios.post(`${API_BASE}/sifre-guncelle`, {
        OgrenciNo: ogrenciNo,
        mevcutSifre,
        yeniSifre,
      });
  
      // API'den gelen yanıtı kontrol et
      if (response.data.success) {
        setMesaj("Şifre başarıyla güncellendi.");
        setMevcutSifre("");
        setYeniSifre("");
        setSifreTekrar("");
      } else {
        // Hata durumu
        setMesaj(` ${response.data.message || "Bilinmeyen hata"}`);
      }
  
    } catch (error: any) {
      // Hata yönetimi
      if (error.response) {
        // Sunucudan gelen hata mesajını göster
        setMesaj(`${error.response?.data?.message || "Bilinmeyen hata"}`);
        console.error("Backend Hatası:", error.response?.data);
      } else if (error.request) {
        // Sunucuya istek gitmedi
        setMesaj("Şifre güncellenemedi: Sunucuya ulaşılamadı.");
        console.error("Sunucuya istek gönderilemedi:", error.request);
      } else {
        // Diğer hatalar
        setMesaj("" + error.message);
        console.error("Hata:", error.message);
      }
    }
  };
  
  
  
  
  
 

  
  

  const handleCikis = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Giriş" as never);
  };

  if (loading) return <Text style={styles.loading}>Yükleniyor...</Text>;

  if (!kullanici) return <Text style={styles.loading}>Kullanıcı bilgileri bulunamadı.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👤 Profil Bilgileri</Text>

      <Text style={styles.item}><Text style={styles.label}>Kart ID:</Text> {kullanici.KartId}</Text>
      <Text style={styles.item}><Text style={styles.label}>Ad:</Text> {kullanici.Ad}</Text>
      <Text style={styles.item}><Text style={styles.label}>Soyad:</Text> {kullanici.Soyad}</Text>
      <Text style={styles.item}><Text style={styles.label}>Öğrenci No:</Text> {kullanici.OgrenciNo}</Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Bakiye:</Text>{" "}
        {typeof kullanici.Bakiye === "number" ? `${kullanici.Bakiye.toFixed(2)} ₺` : "Bilinmiyor"}
      </Text>

      <Text style={styles.subtitle}>🔒 Şifre Güncelle</Text>

      <TextInput
        style={styles.input}
        placeholder="Mevcut Şifre"
        secureTextEntry
        value={mevcutSifre}
        onChangeText={setMevcutSifre}
      />
      <TextInput
        style={styles.input}
        placeholder="Yeni Şifre"
        secureTextEntry
        value={yeniSifre}
        onChangeText={setYeniSifre}
      />
      <TextInput
        style={styles.input}
        placeholder="Yeni Şifre (Tekrar)"
        secureTextEntry
        value={sifreTekrar}
        onChangeText={setSifreTekrar}
      />

      <TouchableOpacity style={styles.button} onPress={handleSifreGuncelle}>
        <Text style={styles.buttonText}>Şifreyi Güncelle</Text>
      </TouchableOpacity>

      {mesaj ? <Text style={styles.message}>{mesaj}</Text> : null}

      
    </ScrollView>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 24, marginBottom: 8 },
  item: { fontSize: 16, marginBottom: 4 },
  label: { fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1e3a8a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  message: { marginTop: 10, color: "red" },
  loading: { marginTop: 40, textAlign: "center" },
});
