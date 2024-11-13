import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATgcvem8XVd_Au44mcR2FKjKctx1MmZsQ",
  authDomain: "produl.firebaseapp.com",
  projectId: "produl",
  storageBucket: "produl.appspot.com",
  messagingSenderId: "77023582951",
  appId: "1:77023582951:web:5fd60105e5b08cda366042",
  measurementId: "G-G6X2VN52QK"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "nabawi");
  const kueri = query(refDokumen, orderBy("namabarang"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
    });
  });



  return hasil;
}
//################$#######

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//fungsi untuk menambahkan data
export async function tambahnabawi(nama, harga,) {
  try {
    const dokRef = await addDoc(collection(db, 'nabawi'), {
      nama: nama,
      harga: harga,
    });
    console.log('berhasil menembah nabawi ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah nabawi ' + e);
  }
}
//#####################
//fungsi untuk hapus data
export async function hapusnabawi(docId) {
  await deleteDoc(doc(db, "nabawi", docId));
}
//fungsi untuk ubah data
export async function ubahnabawi(docId, nama, harga,) {
  await updateDoc(doc(db, "nabawi", docId), {
    nama: nama,
    harga: harga,
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilnabawi(docId) {
  const docRef = await doc(db, "nabawi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}