# RN MOVIE APP

RN Movie App adalah aplikasi mobile untuk melihat berbagai film di dunia, baik film yang sudah ada maupun yang akan datang dan akan terus up-to-date.

## Our Contributor

- Rio Maulana Fathurrahman
- Anggriawan Rayzadmiko
- Samuel
- Meilinda Stephani Raharja
- Lucky Salam

## Installation

Instalasi awal, gunakan:

```bash
npm install
```

kemudian salin file `.env.example` menjadi `.env`, lalu masukkan environment yang dibutuhkan.

Install extention prettier di VS Code untuk auto-formatter berdasarkan aturan yang ada di file `prettier.config.js`.

## Contributing

Buat branch baru jika ingin membuat fitur baru. Misal ingin membuat fitur home screen, gunakan command:

```bash
git checkout -b "feat/home-screen/nama"
# Mengerjakan fitur baru...
# Kemudian
git add .
git commit -m "feat: tambah fitur home screen"
git push origin feat/home-screen/nama
```

Dan jika ingin memperbaiki bug:

```bash
# Berada di branch feat/search/nama
git commit -m "fix: memperbaiki search tidak bisa diinput"
git push origin feat/search/nama
```
