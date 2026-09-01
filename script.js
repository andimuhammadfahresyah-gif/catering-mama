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

navItems.forEach(function(item) {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        // Ambil nama halaman
        const page = item.getAttribute("data-page");

        // Hilangkan status aktif dari semua tombol
        navItems.forEach(function(nav) {
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

    openBankMenu.addEventListener("click", function() {

        // Sembunyikan halaman lainnya
        hideAllPages();

        // Tampilkan Bank Menu
        bankMenuPage.style.display = "block";

    });

}


// ==========================================
// BAGIKAN MENU
// ==========================================

const shareMenuButton = document.getElementById("shareMenuButton");

if (shareMenuButton) {

    shareMenuButton.addEventListener("click", async function() {

        const menuText = `
🍱 MENU CATERING SEKOLAH
📅 1 - 5 September 2026

━━━━━━━━━━━━━━━━

🍗 SENIN
🍚 Nasi Putih
🍗 Ayam Kecap
🥬 Sayur Sop
🍌 Pisang

🐟 SELASA
🍚 Nasi Putih
🐟 Ikan Goreng
🥬 Tumis Kangkung
🍊 Jeruk

🥚 RABU
🍚 Nasi Putih
🥚 Telur Balado
🥬 Capcay
🍉 Semangka

🍗 KAMIS
🍚 Nasi Putih
🍗 Ayam Suwir
🥬 Sayur Bening
🍌 Pisang

🐟 JUMAT
🍚 Nasi Putih
🐟 Ikan Kuah
🥬 Tumis Wortel
🍊 Jeruk

━━━━━━━━━━━━━━━━

🍱 Catering Mama
        `;


        // Jika browser mendukung fitur Share
        if (navigator.share) {

            try {

                await navigator.share({
                    title: "Menu Catering Sekolah",
                    text: menuText
                });

            } catch (error) {

                console.log("Berbagi dibatalkan.");

            }

        }

        // Jika browser tidak mendukung Share
        else {

            try {

                await navigator.clipboard.writeText(menuText);

                alert("✅ Menu berhasil disalin!");

            } catch (error) {

                alert("❌ Tidak dapat menyalin menu.");

            }

        }

    });

}


// ==========================================
// TOMBOL TAMBAH SEKOLAH
// ==========================================

const addSchoolButton = document.getElementById("addSchoolButton");

if (addSchoolButton) {

    addSchoolButton.addEventListener("click", function() {

        alert("Fitur Tambah Sekolah akan kita buat selanjutnya.");

    });

}
// ==========================================
// TAMBAH MENU
// ==========================================

const addMenuButton = document.getElementById("addMenuButton");
const menuForm = document.getElementById("menuForm");

if (addMenuButton && menuForm) {

    addMenuButton.addEventListener("click", function () {

        menuForm.style.display = "block";

        addMenuButton.style.display = "none";

    });

}
// ==========================================
// BANK MENU - LOCAL STORAGE
// ==========================================

const saveMenuButton = document.getElementById("saveMenuButton");
const menuList = document.getElementById("menuList");


// Ambil menu yang sudah tersimpan
let menus = JSON.parse(localStorage.getItem("cateringMenus")) || [];


// ==========================================
// TAMPILKAN MENU
// ==========================================

function tampilkanMenu() {

    menuList.innerHTML = "";

    menus.forEach(function(menu, index) {

        const menuCard = document.createElement("div");

        menuCard.className = "menu-card";

        menuCard.innerHTML = `
            <h3>🍱 ${menu.nama}</h3>

            <p>🍚 ${menu.makanan}</p>
            <p>🍗 ${menu.lauk}</p>
            <p>🥬 ${menu.sayur}</p>
            <p>🍌 ${menu.buah}</p>

            <button
                class="menu-button"
                onclick="hapusMenu(${index})">

                🗑️ Hapus Menu

            </button>
        `;

        menuList.appendChild(menuCard);

    });

}


// ==========================================
// SIMPAN MENU
// ==========================================

if (saveMenuButton) {

    saveMenuButton.addEventListener("click", function() {

        const nama = document.getElementById("menuName").value.trim();
        const makanan = document.getElementById("mainFood").value.trim();
        const lauk = document.getElementById("sideDish").value.trim();
        const sayur = document.getElementById("vegetable").value.trim();
        const buah = document.getElementById("fruit").value.trim();


        // Cek form
        if (
            nama === "" ||
            makanan === "" ||
            lauk === "" ||
            sayur === "" ||
            buah === ""
        ) {

            alert("⚠️ Lengkapi semua data menu.");

            return;

        }


        // Buat data menu
        const menuBaru = {

            nama: nama,
            makanan: makanan,
            lauk: lauk,
            sayur: sayur,
            buah: buah

        };


        // Masukkan ke array
        menus.push(menuBaru);


        // Simpan ke Local Storage
        localStorage.setItem(
            "cateringMenus",
            JSON.stringify(menus)
        );


        // Tampilkan menu
        tampilkanMenu();


        // Kosongkan form
        document.getElementById("menuName").value = "";
        document.getElementById("mainFood").value = "";
        document.getElementById("sideDish").value = "";
        document.getElementById("vegetable").value = "";
        document.getElementById("fruit").value = "";


        // Tutup form
        menuForm.style.display = "none";

        addMenuButton.style.display = "block";


        alert("✅ Menu berhasil disimpan!");

    });

}


// ==========================================
// HAPUS MENU
// ==========================================

function hapusMenu(index) {

    if (confirm("Hapus menu ini?")) {

        menus.splice(index, 1);

        localStorage.setItem(
            "cateringMenus",
            JSON.stringify(menus)
        );

        tampilkanMenu();

    }

}


// ==========================================
// TAMPILKAN MENU SAAT APLIKASI DIBUKA
// ==========================================

tampilkanMenu();

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
            catatan: ""
        },
        {
            nama: "Citra",
            kelas: "5A",
            pesan: true,
            catatan: "Tidak bisa makan ayam"
        },
        {
            nama: "Dina",
            kelas: "5B",
            pesan: true,
            catatan: ""
        }
    ],

    "SDN 02 Palu": [
        {
            nama: "Budi",
            kelas: "4A",
            pesan: true,
            catatan: ""
        },
        {
            nama: "Eka",
            kelas: "4B",
            pesan: true,
            catatan: ""
        }
    ],

    "SDN 03 Palu": [],
    "SDN 04 Palu": [],
    "SDN 05 Palu": []

};


// ==========================================
// BUKA DATA SISWA
// ==========================================

document.addEventListener("click", function(event) {

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
    schoolStudents.forEach(function(student) {

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

    backToSchoolButton.addEventListener("click", function() {

        studentPage.style.display = "none";

        schoolPage.style.display = "block";

    });

}

// ==========================================
// DATA SEKOLAH DARI GOOGLE SHEETS
// ==========================================

const API_URL = "https://script.google.com/macros/s/AKfycbxwj4u0WyLrNRq61EZ4vkdj1PJ6hbF7C4Kq6twigv-uZ8eYXt1WTxMn0ailnfaDxl8/exec";

const schoolList = document.getElementById("schoolList");


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

    if (sekolah.length === 0) {

        schoolList.innerHTML = `
            <div class="menu-card">
                <p>🏫 Belum ada data sekolah.</p>
            </div>
        `;

        return;
    }


    sekolah.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "menu-card";

        card.innerHTML = `
            <h3>🏫 ${item.nama}</h3>

            <p>📍 ${item.alamat}</p>

            <p>📌 Status: ${item.status}</p>

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
        const siswaSekolah = result.data.filter(function(siswa) {

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

    siswa.forEach(function(student) {

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

schoolList.addEventListener("click", function(event) {

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