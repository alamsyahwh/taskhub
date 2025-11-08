#!/usr/bin/env node

const axios = require("axios");
const chalk = require("chalk");

// Ambil token dari argument CLI
const token = process.argv[2];

if (!token) {
  console.log("Usage: node reminder.js <token>");
  process.exit(1);
}

// API endpoint Laravel
const API = "http://localhost:8000/api/tasks";

// Hitung tanggal besok (format yyyy-mm-dd)
const besok = new Date();
besok.setDate(besok.getDate() + 1);
const yyyy = besok.getFullYear();
const mm = String(besok.getMonth() + 1).padStart(2, "0");
const dd = String(besok.getDate()).padStart(2, "0");
const tanggalBesok = `${yyyy}-${mm}-${dd}`;

(async () => {
  try {
    // Ambil semua task
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const tasks = res.data;

    // Filter task yang deadlinenya besok
    const reminderList = tasks.filter(t => t.tanggal_deadline === tanggalBesok);

    if (reminderList.length === 0) {
      console.log("Tidak ada task dengan deadline besok.");
      return;
    }

    console.log("Task dengan deadline besok:\n");

    reminderList.forEach(t => {
      if (t.butuh_perhatian) {
        console.log(
          chalk.red(`PERHATIAN: ${t.judul} - Deadline Besok`)
        );
      } else {
        console.log(`${t.judul} - Deadline Besok`);
      }
    });

  } catch (err) {
    console.log("Gagal mengambil data task");
    console.log(err.message);
  }
})();
