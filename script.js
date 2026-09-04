// ==========================================
// NAVIGASI CATERING MAMA
// ==========================================

// Ambil semua tombol navigasi
const navItems = document.querySelectorAll(".nav-item");

// Ambil semua halaman
const homePage = document.getElementById("homePage");
const menuPage = document.getElementById("menuPage");
const schoolPage = document.getElementById("schoolPage");
const portionPage = document.getElementById("portionPage");
const bankMenuPage = document.getElementById("bankMenuPage");
const morePage = document.getElementById("morePage");

// ==========================================
// FUNGSI UNTUK MENYEMBUNYIKAN SEMUA HALAMAN
// ==========================================

function hideAllPages() {
  homePage.style.display = "none";
  menuPage.style.display = "none";
  schoolPage.style.display = "none";
  portionPage.style.display = "none";
  bankMenuPage.style.display = "none";
  morePage.style.display = "none";
}

// ==========================================
// NAVIGASI
// ==========================================

navItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();

    // Ambil nama halaman
    const page = item.getAttribute("data-page");

    // Hilangkan status aktif dari semua tombol
    navItems.forEach(function (nav) {
      nav.classList.remove("active");
    });

    // Aktifkan tombol yang diklik
    item.classList.add("active");

    // Sembunyikan semua halaman
    hideAllPages();

    // ==================================
    // BERANDA
    // ==================================

    if (page === "home") {
      homePage.style.display = "block";
    }

    // ==================================
    // MENU
    // ==================================
    else if (page === "menu") {
      menuPage.style.display = "block";
    }

    // ==================================
    // SEKOLAH
    // ==================================
    else if (page === "school") {
      schoolPage.style.display = "block";
    }

    // ==================================
    // PORSI
    // ==================================
    else if (page === "portion") {
      portionPage.style.display = "block";
    }

    // ==================================
    // LAINNYA
    // ==================================
    else if (page === "more") {
      morePage.style.display = "block";
    }
  });
});

// ==========================================
// BANK MENU
// ==========================================

const openBankMenu = document.getElementById("openBankMenu");

if (openBankMenu) {
  openBankMenu.addEventListener("click", function () {
    // Sembunyikan halaman lainnya
    hideAllPages();

    // Tampilkan Bank Menu
    bankMenuPage.style.display = "block";
  });
}

// ==========================================
// TOMBOL TAMBAH SEKOLAH
// ==========================================

const addSchoolButton = document.getElementById("addSchoolButton");

if (addSchoolButton) {
  addSchoolButton.addEventListener("click", function () {
    alert("Fitur Tambah Sekolah akan kita buat selanjutnya.");
  });
}
// ==========================================
// TAMBAH MENU
// ==========================================

const addMenuButton = document.getElementById("addMenuButton");
const menuForm = document.getElementById("menuForm");

// ==========================================
// BANK MENU
// ==========================================

const saveBankMenuButton =
  document.getElementById("saveBankMenuButton");

if (saveBankMenuButton) {
  saveBankMenuButton.addEventListener("click", function () {

    const menuUtama =
      document.getElementById("bankMenuUtama").value;

    const laukTambahan =
      document.getElementById("bankLaukTambahan").value;

    const sayur =
      document.getElementById("bankSayur").value;

    const buah =
      document.getElementById("bankBuah").value;

    // Cek semua pilihan
    if (!menuUtama || !laukTambahan || !sayur || !buah) {
      alert("Silakan pilih semua menu terlebih dahulu.");
      return;
    }

    // Cek hari
    if (!selectedDay) {
      alert("Silakan pilih hari terlebih dahulu dari Menu Mingguan.");
      return;
    }

    // Simpan menu ke hari yang dipilih
    weeklyMenu[selectedDay] = [
      "Nasi Putih",
      menuUtama,
      laukTambahan,
      sayur,
      buah
    ];

    // Simpan ke Local Storage
    localStorage.setItem(
      "weeklyMenu",
      JSON.stringify(weeklyMenu)
    );

    alert("Menu berhasil disimpan untuk " + selectedDay);

    // Kembali ke Menu Mingguan
    selectedDay = null;

    hideAllPages();
    menuPage.style.display = "block";

    tampilkanMenuMingguan();
  });
}

// ==========================================
// DATA SISWA
// ==========================================

const studentPage = document.getElementById("studentPage");
const selectedSchool = document.getElementById("selectedSchool");
const studentList = document.getElementById("studentList");

const schoolButtons = document.querySelectorAll(".school-student-button");
const backToSchoolButton = document.getElementById("backToSchoolButton");

// ==========================================
// DATA CONTOH SISWA
// ==========================================

const students = {
  "SDN 01 Palu": [
    {
      nama: "Andi",
      kelas: "5A",
      pesan: true,
      catatan: "",
    },
    {
      nama: "Citra",
      kelas: "5A",
      pesan: true,
      catatan: "Tidak bisa makan ayam",
    },
    {
      nama: "Dina",
      kelas: "5B",
      pesan: true,
      catatan: "",
    },
  ],

  "SDN 02 Palu": [
    {
      nama: "Budi",
      kelas: "4A",
      pesan: true,
      catatan: "",
    },
    {
      nama: "Eka",
      kelas: "4B",
      pesan: true,
      catatan: "",
    },
  ],

  "SDN 03 Palu": [],
  "SDN 04 Palu": [],
  "SDN 05 Palu": [],
};

// ==========================================
// BUKA DATA SISWA
// ==========================================

document.addEventListener("click", function (event) {
  const button = event.target.closest(".school-student-button");

  if (!button) return;

  const schoolName = button.getAttribute("data-school");

  // Sembunyikan semua halaman
  hideAllPages();

  // Tampilkan halaman siswa
  studentPage.style.display = "block";

  // Tampilkan nama sekolah
  selectedSchool.textContent = schoolName;

  // Tampilkan siswa
  tampilkanSiswa(schoolName);
});

// ==========================================
// TAMPILKAN SISWA
// ==========================================

function tampilkanSiswa(schoolName) {
  studentList.innerHTML = "";

  const schoolStudents = students[schoolName] || [];

  // Kalau belum ada siswa
  if (schoolStudents.length === 0) {
    studentList.innerHTML = `
            <div class="menu-card">
                <p>👨‍🎓 Belum ada data siswa.</p>
            </div>
        `;

    return;
  }

  // Tampilkan siswa
  schoolStudents.forEach(function (student) {
    const card = document.createElement("div");

    card.className = "student-card";

    if (student.catatan !== "") {
      card.classList.add("student-warning");
    }

    card.innerHTML = `

            <h3>
                ${student.nama}
                ${student.catatan !== "" ? "⚠️" : ""}
            </h3>

            <p>👨‍🎓 Kelas ${student.kelas}</p>

            <p>
                ${student.pesan ? "🍱 Pesan Catering" : "❌ Tidak Pesan"}
            </p>

            ${
              student.catatan !== ""
                ? `
                    <div class="special-note">
                        ⚠️ ${student.catatan}
                    </div>
                  `
                : ""
            }

        `;

    studentList.appendChild(card);
  });
}

// ==========================================
// KEMBALI KE SEKOLAH
// ==========================================

if (backToSchoolButton) {
  backToSchoolButton.addEventListener("click", function () {
    studentPage.style.display = "none";

    schoolPage.style.display = "block";
  });
}

// ==========================================
// DATA SEKOLAH DARI GOOGLE SHEETS
// ==========================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbwG-K7ZZto2P2QzWn60HD8ESDJXTPsVqe-RRJW8XpRZ9xM7t1aBMAdBe2Gb3tkHN5if/exec";

  // ==========================================
// BANK MENU
// ==========================================

async function loadBankMenu() {

  try {

    const response = await fetch(
      API_URL + "?action=bank_menu"
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    const data = result.data;

    isiPilihanMenu(
      "bankMenuUtama",
      data.menuUtama,
      "Pilih Menu Utama"
    );

    isiPilihanMenu(
      "bankLaukTambahan",
      data.laukTambahan,
      "Pilih Lauk Tambahan"
    );

    isiPilihanMenu(
      "bankSayur",
      data.sayur,
      "Pilih Sayur"
    );

    isiPilihanMenu(
      "bankBuah",
      data.buah,
      "Pilih Buah"
    );

  } catch (error) {

    console.error(
      "Gagal memuat Bank Menu:",
      error
    );

  }

}


// ==========================================
// ISI DROPDOWN
// ==========================================

function isiPilihanMenu(
  id,
  daftarMenu,
  teksAwal
) {

  const select =
    document.getElementById(id);

  if (!select) return;

  select.innerHTML = "";

  const pilihanAwal =
    document.createElement("option");

  pilihanAwal.value = "";
  pilihanAwal.textContent = teksAwal;

  select.appendChild(pilihanAwal);


  daftarMenu.forEach(function(menu) {

    const option =
      document.createElement("option");

    option.value = menu;
    option.textContent = menu;

    select.appendChild(option);

  });

}

// ==========================================
// AMBIL DATA SEKOLAH
// ==========================================

async function ambilDataSekolah() {
  if (!schoolList) return;

  try {
    schoolList.innerHTML = `
            <div class="menu-card">
                <p>⏳ Memuat data sekolah...</p>
            </div>
        `;

    const response = await fetch(API_URL);

    const result = await response.json();

    if (!result.success) {
      throw new Error("Data sekolah gagal diambil.");
    }

    tampilkanSekolah(result.data);
  } catch (error) {
    console.error(error);

    schoolList.innerHTML = `
            <div class="menu-card">
                <p>❌ Gagal mengambil data sekolah.</p>
            </div>
        `;
  }
}

// ==========================================
// TAMPILKAN SEKOLAH
// ==========================================

function tampilkanSekolah(sekolah) {
  schoolList.innerHTML = "";

  const totalSchools = document.getElementById("totalSchools");

  if (totalSchools) {
    totalSchools.textContent = sekolah.length;
  }

  if (sekolah.length === 0) {
    schoolList.innerHTML = `
            <div class="menu-card">
                <p>🏫 Belum ada data sekolah.</p>
            </div>
        `;

    return;
  }

  sekolah.forEach(function (item) {
    const card = document.createElement("div");

    card.className = "menu-card";

    card.innerHTML = `
   <h3>${item.nama}</h3>

<p>Alamat: ${item.alamat}</p>

<p>Status Catering: ${item.status}</p>
            <button
                class="menu-button school-student-button"
                data-school-id="${item.id}"
                data-school="${item.nama}">

                Lihat Siswa

            </button>
        `;

    schoolList.appendChild(card);
  });
}

// ==========================================
// JALANKAN SAAT WEBSITE DIBUKA
// ==========================================

ambilDataSekolah();

// ==========================================
// AMBIL DATA SISWA DARI GOOGLE SHEETS
// ==========================================

async function ambilDataSiswa(namaSekolah) {
  try {
    studentList.innerHTML = `
            <div class="menu-card">
                <p>⏳ Memuat data siswa...</p>
            </div>
        `;

    const response = await fetch(API_URL + "?action=siswa");

    const result = await response.json();

    if (!result.success) {
      throw new Error("Data siswa gagal diambil.");
    }

    // Filter siswa berdasarkan sekolah
    const siswaSekolah = result.data.filter(function (siswa) {
      return siswa.sekolah === namaSekolah;
    });

    tampilkanSiswaAPI(siswaSekolah);
  } catch (error) {
    console.error(error);

    studentList.innerHTML = `
            <div class="menu-card">
                <p>❌ Gagal mengambil data siswa.</p>
            </div>
        `;
  }
}

// ==========================================
// TAMPILKAN SISWA
// ==========================================

function tampilkanSiswaAPI(siswa) {
  studentList.innerHTML = "";

  if (siswa.length === 0) {
    studentList.innerHTML = `
            <div class="menu-card">
                <p>👨‍🎓 Belum ada data siswa.</p>
            </div>
        `;

    return;
  }

  siswa.forEach(function (student) {
    const card = document.createElement("div");

    card.className = "student-card";

    card.innerHTML = `
            <h3>👨‍🎓 ${student.nama}</h3>

            <p>🏫 ${student.sekolah}</p>

            <p>📚 Kelas: ${student.kelas}</p>

            <p>🍱 Status Catering: ${student.status}</p>
        `;

    studentList.appendChild(card);
  });
}

// ==========================================
// KLIK LIHAT SISWA
// ==========================================

schoolList.addEventListener("click", function (event) {
  const button = event.target.closest(".school-student-button");

  if (!button) return;

  const schoolName = button.getAttribute("data-school");

  // Sembunyikan halaman lain
  homePage.style.display = "none";
  menuPage.style.display = "none";
  schoolPage.style.display = "none";
  portionPage.style.display = "none";
  bankMenuPage.style.display = "none";
  morePage.style.display = "none";

  // Tampilkan halaman siswa
  studentPage.style.display = "block";

  // Tampilkan nama sekolah
  selectedSchool.textContent = schoolName;

  // Ambil siswa dari Google Sheets
  ambilDataSiswa(schoolName);
});

// ==========================================
// DATA MENU MINGGUAN
// ==========================================

const defaultWeeklyMenu = {
  senin: ["Nasi Putih", "Ayam Kecap", "Sayur Sop", "Pisang"],

  selasa: ["Nasi Putih", "Ikan Goreng", "Tumis Kangkung", "Jeruk"],

  rabu: ["Nasi Putih", "Telur Balado", "Capcay", "Semangka"],

  kamis: ["Nasi Putih", "Ayam Suwir", "Sayur Bening", "Pisang"],

  jumat: ["Nasi Putih", "Ikan Kuah", "Tumis Wortel", "Jeruk"],
};

// ==========================================
// MENU MINGGUAN YANG TERSIMPAN
// ==========================================

let weeklyMenu =
  JSON.parse(localStorage.getItem("weeklyMenu")) || defaultWeeklyMenu;

// ==========================================
// HARI YANG SEDANG DIPILIH
// ==========================================

let selectedDay = null;

// ==========================================
// TAMPILKAN MENU MINGGUAN
// ==========================================

function displayWeeklyMenu() {
  const menuElements = {
    senin: document.getElementById("mondayMenu"),
    selasa: document.getElementById("tuesdayMenu"),
    rabu: document.getElementById("wednesdayMenu"),
    kamis: document.getElementById("thursdayMenu"),
    jumat: document.getElementById("fridayMenu"),
  };

  Object.keys(menuElements).forEach(function (day) {
    const element = menuElements[day];

    if (!element) return;

    element.innerHTML = "";

    weeklyMenu[day].forEach(function (food) {
      const p = document.createElement("p");

      p.textContent = food;

      element.appendChild(p);
    });
  });
}

// ==========================================
// UBAH MENU
// ==========================================

document.querySelectorAll(".edit-day-button").forEach(function (button) {
  button.addEventListener("click", function () {
    selectedDay = this.dataset.day;

    hideAllPages();
    bankMenuPage.style.display = "block";

    // Ambil menu terbaru dari Google Sheet
    loadBankMenu();
  });
});

// ==========================================
// BAGIKAN MENU KE WHATSAPP
// ==========================================

const shareMenuButton =
  document.getElementById("shareMenuButton");

if (shareMenuButton) {

  shareMenuButton.addEventListener("click", function () {

    const dates = getWeekDates();

    // Emoji dibuat dengan Unicode agar tidak berubah menjadi �
    const EMOJI_BOX = String.fromCodePoint(0x1F371);      // 🍱
    const EMOJI_CALENDAR = String.fromCodePoint(0x1F4C5); // 📅
    const EMOJI_FOOD = String.fromCodePoint(0x1F37D);     // 🍽️

    function formatTanggal(tanggal) {
      return tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }

    const tanggalAwal =
      formatTanggal(dates.monday);

    const tanggalAkhir =
      formatTanggal(dates.friday);

    let text = "";

    // JUDUL
    text += EMOJI_BOX + " MENU CATERING SEKOLAH\n\n";

    // PERIODE
    text += EMOJI_CALENDAR + " MENU MINGGUAN\n";
    text += tanggalAwal + " - " + tanggalAkhir + "\n\n";

    // NAMA HARI + MENU
    const dayNames = {
      senin: EMOJI_FOOD + " SENIN",
      selasa: EMOJI_FOOD + " SELASA",
      rabu: EMOJI_FOOD + " RABU",
      kamis: EMOJI_FOOD + " KAMIS",
      jumat: EMOJI_FOOD + " JUMAT"
    };

    Object.keys(dayNames).forEach(function (day) {

      text += dayNames[day] + "\n";

      if (
        weeklyMenu[day] &&
        weeklyMenu[day].length > 0
      ) {

        weeklyMenu[day].forEach(function (food) {
          text += "• " + food + "\n";
        });

      } else {

        text += "• Menu belum tersedia\n";

      }

      text += "\n";
    });

    // FOOTER
    text += "━━━━━━━━━━━━━━━━\n";
    text += EMOJI_BOX + " Catering Sekolah";

    // Buka WhatsApp
    const whatsappURL =
  "https://api.whatsapp.com/send?text=" +
  encodeURIComponent(text);

window.location.href = whatsappURL;

  });

}

// ==========================================
// TAMPILKAN MENU SAAT APLIKASI DIBUKA
// ==========================================

// ==========================================
// TANGGAL MENU MINGGUAN OTOMATIS
// ==========================================

function getWeekDates() {
  const today = new Date();

  // Senin = awal minggu
  const day = today.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);

  monday.setDate(today.getDate() + difference);

  const friday = new Date(monday);

  friday.setDate(monday.getDate() + 4);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return {
    monday: monday,
    friday: friday,

    mondayText: monday.toLocaleDateString("id-ID", options),

    fridayText: friday.toLocaleDateString("id-ID", options),
  };
}

// ==========================================
// TAMPILKAN TANGGAL MINGGU INI
// ==========================================

function displayWeekDate() {
  const weekDate = document.getElementById("weekDate");

  if (!weekDate) return;

  const dates = getWeekDates();

  weekDate.textContent = dates.mondayText + " - " + dates.fridayText;
}

function tampilkanTanggalMingguan() {
  const hari = [
    "dateSenin",
    "dateSelasa",
    "dateRabu",
    "dateKamis",
    "dateJumat",
  ];

  const sekarang = new Date();

  const nomorHari = sekarang.getDay();

  // Menentukan tanggal Senin
  const selisih = nomorHari === 0 ? -6 : 1 - nomorHari;

  const senin = new Date(sekarang);

  senin.setDate(sekarang.getDate() + selisih);

  hari.forEach(function (id, index) {
    const tanggal = new Date(senin);

    tanggal.setDate(senin.getDate() + index);

    const element = document.getElementById(id);

    if (element) {
      element.textContent = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  });

  // Tanggal awal dan akhir minggu
  const jumat = new Date(senin);

  jumat.setDate(senin.getDate() + 4);

  const tanggalAwal = senin.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const tanggalAkhir = jumat.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const weekDate = document.getElementById("weekDate");

  if (weekDate) {
    weekDate.textContent = tanggalAwal + " - " + tanggalAkhir;
  }
}

// ==========================================
// BERANDA DINAMIS
// ==========================================

function tampilkanBeranda() {
  const sekarang = new Date();

  // ======================================
  // TANGGAL HARI INI
  // ======================================

  const homeDate = document.getElementById("homeDate");

  if (homeDate) {
    homeDate.textContent = sekarang.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // ======================================
  // TENTUKAN HARI
  // ======================================

  const namaHari = [
    "minggu",
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
  ];

  const hariIni = namaHari[sekarang.getDay()];

  // ======================================
  // TAMPILKAN MENU HARI INI
  // ======================================

  const todayMenu = document.getElementById("todayMenu");

  if (todayMenu) {
    todayMenu.innerHTML = "";

    // Hanya Senin-Jumat
    if (
      hariIni === "senin" ||
      hariIni === "selasa" ||
      hariIni === "rabu" ||
      hariIni === "kamis" ||
      hariIni === "jumat"
    ) {
      const menuHariIni = weeklyMenu[hariIni];

      menuHariIni.forEach(function (food) {
        const p = document.createElement("p");

        p.textContent = food;

        todayMenu.appendChild(p);
      });
    } else {
      todayMenu.innerHTML = "<p>Tidak ada menu catering hari ini.</p>";
    }
  }
}

// ==========================================
// TOMBOL LIHAT MENU MINGGUAN
// ==========================================

const viewWeeklyMenuButton = document.getElementById("viewWeeklyMenuButton");

if (viewWeeklyMenuButton) {
  viewWeeklyMenuButton.addEventListener("click", function () {
    hideAllPages();

    menuPage.style.display = "block";
  });
}

// ==========================================
// JALANKAN BERANDA
// ==========================================

tampilkanBeranda();

tampilkanTanggalMingguan();
displayWeeklyMenu();

// ==========================================
// SISTEM PORSI
// ==========================================

const portionDate = document.getElementById("portionDate");

const portionList = document.getElementById("portionList");

const totalPortion = document.getElementById("totalPortion");

const summaryPortion = document.getElementById("summaryPortion");

const portionSchoolCount = document.getElementById("portionSchoolCount");

const savePortionButton = document.getElementById("savePortionButton");

// ==========================================
// DATA CABANG SEMENTARA
// ==========================================

const portionSchools = [
  "KUN ANTA Cabang Lasoso",
  "KUN ANTA Cabang kasturi",
  "KUN ANTA Cabang Puskud",
  "KUN ANTA Cabang kalukubula",
  "KUN ANTA Cabang Mutiara TK",
  "KUN ANTA Cabang Mutiara SD",
  "KUN ANTA Cabang Domba",
  "KUN ANTA Cabang Happy Shine",
];

// ==========================================
// TANGGAL HARI INI
// ==========================================

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ==========================================
// TAMPILKAN DAFTAR CABANG + CATATAN
// ==========================================

function tampilkanDaftarPorsi() {
  if (!portionList) return;

  portionList.innerHTML = "";

  portionSchools.forEach(function (school) {
    const card = document.createElement("div");

    card.className = "menu-card";

    card.innerHTML = `
      <div class="portion-row">

        <span>
          ${school}
        </span>

        <input
          type="number"
          class="portion-input"
          data-school="${school}"
          min="0"
          value="0"
          placeholder="0"
        >

      </div>

      <div class="school-notes">

        <h4>📝 Catatan Siswa</h4>

        <div
          class="note-list"
          data-note-list="${school}">
        </div>

        <button
          type="button"
          class="menu-button add-note-button"
          data-school="${school}">
          ➕ Tambah Catatan
        </button>

        <div
          class="note-form"
          data-note-form="${school}"
          style="display: none;">

          <label>Nama Siswa</label>

          <input
            type="text"
            class="note-student-name"
            placeholder="Contoh: Citra"
          >

          <label>Catatan</label>

          <textarea
            class="note-text"
            placeholder="Contoh: Tidak bisa makan ayam"
            rows="3">
          </textarea>

          <button
            type="button"
            class="menu-button save-note-button"
            data-school="${school}">
            💾 Simpan Catatan
          </button>

        </div>

      </div>
    `;

    portionList.appendChild(card);
  });

  if (portionSchoolCount) {
    portionSchoolCount.textContent = portionSchools.length;
  }

  document.querySelectorAll(".portion-input").forEach(function (input) {
    input.addEventListener("input", hitungTotalPorsi);
  });

  tampilkanSemuaCatatan();
}

// ==========================================
// SISTEM CATATAN SISWA
// ==========================================

function getNoteKey(tanggal, school) {
  return "notes_" + tanggal + "_" + school;
}

// ==========================================
// TAMPILKAN CATATAN DARI GOOGLE SHEETS
// ==========================================

async function tampilkanSemuaCatatan() {
  if (!portionDate) return;

  const tanggal = portionDate.value;

  document.querySelectorAll(".note-list").forEach(function (list) {
    list.innerHTML = `
      <p class="no-note">
        ⏳ Memuat catatan...
      </p>
    `;
  });

  try {
    const response = await fetch(API_URL + "?action=catatan");

    const result = await response.json();

    if (!result.success) {
      throw new Error("Catatan gagal diambil.");
    }

    document.querySelectorAll(".note-list").forEach(function (list) {
      const school = list.getAttribute("data-note-list");

      const notes = result.data.filter(function (note) {
        return (
          String(note.tanggal).includes(tanggal) &&
          note.cabang === school &&
          note.status !== "Dibatalkan"
        );
      });

      list.innerHTML = "";

      // ==================================
      // BELUM ADA CATATAN
      // ==================================

      if (notes.length === 0) {
        list.innerHTML = `
          <p class="no-note">
            Belum ada catatan.
          </p>
        `;

        return;
      }

      // ==================================
      // TAMPILKAN CATATAN
      // ==================================

      notes.forEach(function (note) {
        const noteCard = document.createElement("div");

        noteCard.className = "student-note";

        noteCard.innerHTML = `

          <div class="note-content">

            <strong>
              ⚠️ ${note.nama}
            </strong>

            <p>
              ${note.catatan}
            </p>

          </div>

          <div class="note-actions">

            <button
              type="button"
              class="edit-note-button"
              data-row="${note.row}"
              data-tanggal="${note.tanggal}"
              data-school="${note.cabang}"
              data-nama="${note.nama}"
              data-catatan="${note.catatan}">
              ✏️ Edit
            </button>

            <button
              type="button"
              class="cancel-note-button"
              data-row="${note.row}">
              ↩️ Batalkan
            </button>

          </div>

        `;

        list.appendChild(noteCard);
      });
    });
  } catch (error) {
    console.error(error);

    document.querySelectorAll(".note-list").forEach(function (list) {
      list.innerHTML = `
        <p class="no-note">
          ❌ Gagal mengambil catatan.
        </p>
      `;
    });
  }
}

// ==========================================
// BUKA FORM CATATAN
// ==========================================

document.addEventListener("click", function (event) {
  const button = event.target.closest(".add-note-button");

  if (!button) return;

  const school = button.getAttribute("data-school");

  const form = document.querySelector(
    `[data-note-form="${CSS.escape(school)}"]`,
  );

  if (form) {
    form.style.display = "block";

    button.style.display = "none";
  }
});

// ==========================================
// SIMPAN CATATAN KE GOOGLE SHEETS
// ==========================================

document.addEventListener("click", async function (event) {
  const button = event.target.closest(".save-note-button");

  if (!button) return;

  const school = button.getAttribute("data-school");

  const form = document.querySelector(
    `[data-note-form="${CSS.escape(school)}"]`,
  );

  if (!form) return;

  const namaInput = form.querySelector(".note-student-name");
  const catatanInput = form.querySelector(".note-text");

  const nama = namaInput.value.trim();
  const catatan = catatanInput.value.trim();

  if (nama === "" || catatan === "") {
    alert("Nama siswa dan catatan harus diisi.");
    return;
  }

  const tanggal = portionDate.value;

  if (!tanggal) {
    alert("Pilih tanggal terlebih dahulu.");
    return;
  }

  const data = {
    jenis: "catatan",
    tanggal: tanggal,
    cabang: school,
    nama: nama,
    catatan: catatan,
  };

  try {
    button.disabled = true;
    button.textContent = "⏳ Menyimpan...";

    await fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    namaInput.value = "";
    catatanInput.value = "";

    form.style.display = "none";

    const addButton = document.querySelector(
      `.add-note-button[data-school="${CSS.escape(school)}"]`,
    );

    if (addButton) {
      addButton.style.display = "block";
    }

    button.disabled = false;
    button.textContent = "💾 Simpan Catatan";

    alert("✅ Catatan berhasil dikirim ke Google Sheets.");
    setTimeout(function () {
      tampilkanSemuaCatatan();
    }, 1000);
  } catch (error) {
    console.error(error);

    button.disabled = false;
    button.textContent = "💾 Simpan Catatan";

    alert("❌ Catatan gagal disimpan.");
  }
});

// ==========================================
// EDIT CATATAN
// ==========================================

document.addEventListener("click", function (event) {

  const button =
    event.target.closest(".edit-note-button");

  if (!button) return;

  const row =
    button.getAttribute("data-row");

  const tanggal =
    button.getAttribute("data-tanggal");

  const school =
    button.getAttribute("data-school");

  const namaLama =
    button.getAttribute("data-nama");

  const catatanLama =
    button.getAttribute("data-catatan");


  const namaBaru =
    prompt("Nama siswa:", namaLama);

  if (namaBaru === null) {
    return;
  }


  const catatanBaru =
    prompt("Catatan:", catatanLama);

  if (catatanBaru === null) {
    return;
  }


  if (
    namaBaru.trim() === "" ||
    catatanBaru.trim() === ""
  ) {

    alert("Nama dan catatan tidak boleh kosong.");

    return;
  }


  if (!confirm("Simpan perubahan catatan?")) {
    return;
  }


  fetch(API_URL, {

    method: "POST",

    mode: "no-cors",

    headers: {
      "Content-Type":
        "text/plain;charset=utf-8"
    },

    body: JSON.stringify({

      jenis: "edit_catatan",

      row: Number(row),

      tanggal: tanggal,

      cabang: school,

      nama: namaBaru.trim(),

      catatan: catatanBaru.trim()

    })

  })

    .then(function () {

      alert("✅ Catatan berhasil diubah.");

      setTimeout(function () {

        tampilkanSemuaCatatan();

      }, 1000);

    })

    .catch(function (error) {

      console.error(error);

      alert("❌ Gagal mengubah catatan.");

    });

});

// ==========================================
// BATALKAN CATATAN
// ==========================================

document.addEventListener("click", function (event) {

  const button =
    event.target.closest(".cancel-note-button");

  if (!button) return;


  const row =
    button.getAttribute("data-row");


  if (
    !confirm(
      "Batalkan catatan siswa ini?\n\n" +
      "Catatan tidak akan dihapus dari riwayat."
    )
  ) {

    return;

  }


  fetch(API_URL, {

    method: "POST",

    mode: "no-cors",

    headers: {

      "Content-Type":
        "text/plain;charset=utf-8"

    },

    body: JSON.stringify({

      jenis: "batalkan_catatan",

      row: Number(row)

    })

  })

    .then(function () {

      alert("↩️ Catatan berhasil dibatalkan.");

      setTimeout(function () {

        tampilkanSemuaCatatan();

      }, 1000);

    })

    .catch(function (error) {

      console.error(error);

      alert("❌ Gagal membatalkan catatan.");

    });

});


// ==========================================
// HITUNG TOTAL PORSI
// ==========================================

function hitungTotalPorsi() {
  let total = 0;

  document.querySelectorAll(".portion-input").forEach(function (input) {
    const jumlah = Number(input.value) || 0;

    total += jumlah;
  });

  if (totalPortion) {
    totalPortion.textContent = total;
  }

  if (summaryPortion) {
    summaryPortion.textContent = total;
  }
}

// ==========================================
// SIMPAN DATA PORSI
// ==========================================

function simpanPorsi() {
  const tanggal = portionDate.value;

  if (!tanggal) {
    alert("Pilih tanggal terlebih dahulu.");
    return;
  }

  const dataPorsi = {};

  document.querySelectorAll(".portion-input").forEach(function (input) {
    const school = input.dataset.school;
    const jumlah = Number(input.value) || 0;

    dataPorsi[school] = jumlah;
  });

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      jenis: "porsi",
      tanggal: tanggal,
      data: dataPorsi,
    }),
  })
    .then((response) => response.text())
    .then((text) => {
      console.log("Respons dari server:", text);

      let result;

      try {
        result = JSON.parse(text);
      } catch (error) {
        throw new Error("Respons server bukan JSON: " + text);
      }

      if (result.success) {
        alert("Data porsi berhasil disimpan.");
        tampilkanPorsiHariIni();
      } else {
        alert("Gagal menyimpan: " + (result.message || "Terjadi kesalahan."));
      }
    })
    .catch((error) => {
      console.error("Error simpan porsi:", error);
      alert("Terjadi kesalahan saat menyimpan data porsi.");
    });
}
// ==========================================
// AMBIL DATA PORSI
// ==========================================

function ambilPorsi(tanggal) {
  if (!tanggal) return;

  const data = JSON.parse(localStorage.getItem("portion_" + tanggal)) || {};

  document.querySelectorAll(".portion-input").forEach(function (input) {
    const school = input.dataset.school;

    input.value = data[school] ?? 0;
  });

  hitungTotalPorsi();
}

// ==========================================
// EVENT SIMPAN
// ==========================================

if (savePortionButton) {
  savePortionButton.addEventListener("click", simpanPorsi);
}

// ==========================================
// EVENT GANTI TANGGAL
// ==========================================

if (portionDate) {
  portionDate.value = getTodayDate();

  portionDate.addEventListener("change", function () {
    ambilPorsi(portionDate.value);

    tampilkanSemuaCatatan();

    tampilkanMenuUntukPorsi();
  });
}

// ==========================================
// TAMPILKAN MENU PADA HALAMAN PORSI
// ==========================================

function tampilkanMenuUntukPorsi() {
  const menuContainer = document.getElementById("portionTodayMenu");

  if (!menuContainer || !portionDate) return;

  const tanggal = new Date(portionDate.value + "T00:00:00");

  const namaHari = [
    "minggu",
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
  ];

  const hari = namaHari[tanggal.getDay()];

  if (hari === "sabtu" || hari === "minggu") {
    menuContainer.innerHTML = "<p>Tidak ada menu catering hari ini.</p>";

    return;
  }

  const menu = weeklyMenu[hari];

  if (!menu || menu.length === 0) {
    menuContainer.innerHTML = "<p>Menu belum tersedia.</p>";

    return;
  }

  menuContainer.innerHTML = "";

  menu.forEach(function (food) {
    const p = document.createElement("p");

    p.textContent = "• " + food;

    menuContainer.appendChild(p);
  });
}

// ==========================================
// JALANKAN SISTEM PORSI
// ==========================================

tampilkanDaftarPorsi();

ambilPorsi(getTodayDate());

tampilkanMenuUntukPorsi();

// ==========================================
// HUBUNGKAN TOTAL PORSI KE BERANDA
// ==========================================

function tampilkanPorsiHariIni() {
  const todayPortion = document.getElementById("todayPortion");

  if (!todayPortion) return;

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const tanggalHariIni = `${year}-${month}-${day}`;

  // Ambil data porsi dari Google Sheets
  fetch(API_URL + "?action=porsi")
    .then((response) => response.json())
    .then((result) => {
      if (!result.success) {
        console.error(result.message);
        todayPortion.textContent = "0";
        return;
      }

      // Hanya ambil data untuk tanggal hari ini
      const dataHariIni = result.data.filter(function (item) {
        return item.tanggal === tanggalHariIni;
      });

      // Hitung total porsi hari ini
      let total = 0;

      dataHariIni.forEach(function (item) {
        total += Number(item.jumlah) || 0;
      });

      // Tampilkan total di Beranda
      todayPortion.textContent = total;
    })
    .catch((error) => {
      console.error("Gagal mengambil data porsi:", error);
      todayPortion.textContent = "0";
    });
}

tampilkanPorsiHariIni();
// Jalankan Bank Menu
loadBankMenu();