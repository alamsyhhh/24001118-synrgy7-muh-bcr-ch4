import Binar from '../scripts/binar.js';
import Car from '../scripts/car.js';

class App {
  constructor() {
    // Inisialisasi elemen-elemen DOM yang diperlukan
    this.inputTypeDriver = document.getElementById('Type-Driver');
    this.carContainerElement = document.getElementById('cars-container');
    this.inputTanggal = document.getElementById('input-Date');
    this.inputWaktu = document.getElementById('input-Time');
    this.penumpang = document.getElementById('total-passenger');
    this.loadButton = document.getElementById('search-btn');

    // Menonaktifkan tombol "Load" pada awalnya
    this.loadButton.disabled = true;
  }

  async init() {
    // Memuat data mobil saat aplikasi dimulai
    await this.load();

    this.loadButton.addEventListener('click', this.run);
    this.inputTypeDriver.addEventListener('input', this.checkInputs);
    this.inputTanggal.addEventListener('input', this.checkInputs);
    this.inputWaktu.addEventListener('input', this.checkInputs);
  }

  // Method untuk memeriksa apakah input telah diisi
  checkInputs = () => {
    // const isTypeDriver = this.inputTypeDriver.value.trim() !== '';
    const isTypeDriver =
      this.inputTypeDriver.value.trim() !== '' &&
      this.inputTypeDriver.value !== 'Pilih Tipe Driver';
    const isTanggalFilled = this.inputTanggal.value.trim() !== '';
    const isWaktuFilled = this.inputWaktu.value.trim() !== '';

    this.loadButton.disabled = !(
      isTypeDriver &&
      isTanggalFilled &&
      isWaktuFilled
    );
  };

  run = async () => {
    // Mendapatkan nilai dari input
    const valPenumpang = this.penumpang.value;
    const valTanggal = this.inputTanggal.value;
    const valWaktu = this.inputWaktu.value;
    const valTypeDriver = this.inputTypeDriver.value;

    console.log('Input Penumpang:', valPenumpang);
    console.log('Input Tanggal:', valTanggal);
    console.log('Input Waktu:', valWaktu);

    this.clear();

    // Memanggil method listCars dari Binar dengan filter yang diberikan
    const cars = await Binar.listCars((car) => {
      let result = true;

      // Logika filtering berdasarkan tipe driver, jumlah penumpang, tanggal, dan waktu
      if (valTypeDriver && valTypeDriver !== 'Pilih Tipe Driver') {
        result = car.typeDriver
          .toLowerCase()
          .includes(valTypeDriver.toLowerCase());
      }

      if (!isNaN(parseInt(valPenumpang))) {
        result = car.capacity === parseInt(valPenumpang);
      }

      if (valTanggal) {
        // Filter based on date only
        const carDate = new Date(car.availableAt);
        const selectedDate = new Date(valTanggal);

        result =
          result &&
          carDate.toISOString().split('T')[0] ===
            selectedDate.toISOString().split('T')[0];

        console.log('Car Date:', carDate.toISOString().split('T')[0]);
        console.log('Selected Date:', selectedDate.toISOString().split('T')[0]);
        console.log('Filter by Date:', result);
      }

      if (valWaktu) {
        const carTime = new Date(car.availableAt).toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
        });

        const selectedHour = parseInt(valWaktu.split(':')[0]);
        const selectedTime = new Date().setHours(selectedHour, 0);
        const selectedTimeString = new Date(selectedTime).toLocaleTimeString(
          'en-US',
          {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
          }
        );

        result = result && carTime === selectedTimeString;

        console.log('Car Time:', carTime);
        console.log('Selected Time:', selectedTimeString);
        console.log('Filter by Time:', result);
      }

      return result;
    });

    // Menampilkan mobil yang telah difilter atau pesan jika tidak ada mobil yang sesuai
    if (cars.length === 0) {
      this.carContainerElement.innerHTML = `
      <ul style="color: red;">
          <li>🚧 Karena AvailableAt diatur secara acak, hasil pencarian mobil tidak tersedia sesuai dengan kriteria yang Anda masukkan</li>
          <li>Harap coba lagi dengan memilih waktu dan tanggal yang berbeda.</li>
          <li>Atau anda dapat memilih waktu dan tanggal lain untuk menemukan mobil yang tersedia dalam kurun waktu 3 hari dihitung dari kemarin.</li>
          <li>Anda Bisa Periksa Jadwal Peminjaman Mobil pada Console Log</li>
          <li>Just, hack it bro!</li>
      </ul>
  `;
    } else {
      this.renderCars(cars);
      feather.replace();
    }
  };

  //   const valPenumpang = this.penumpang.value;

  //   // Bersihkan kontainer mobil sebelum menambahkan mobil baru
  //   this.clear();

  //   // Dapatkan daftar mobil dari Car.list
  //   Car.list.forEach((car) => {
  //     if (!isNaN(parseInt(valPenumpang))) {
  //       result = car.capacity === parseInt(valPenumpang);
  //     }

  //     // Buat elemen div untuk setiap mobil
  //     const node = document.createElement('div');
  //     // Render mobil dan tambahkan HTML-nya ke dalam elemen div
  //     node.innerHTML = car.render();
  //     // Tambahkan elemen div ke dalam kontainer mobil
  //     this.carContainerElement.appendChild(node);
  //   });
  // };

  // run = async () => {
  //   const valPenumpang = this.penumpang.value;
  //   const valTypeDriver = this.inputTypeDriver.value; // Mendapatkan nilai tipe driver dari input

  //   // Bersihkan kontainer mobil sebelum menambahkan mobil baru
  //   this.clear();

  //   // Memanggil method listCars dari Binar dengan filter yang diberikan
  //   const cars = await Binar.listCars((car) => {
  //     // Filter berdasarkan jumlah penumpang dan tipe driver
  //     return (
  //       !isNaN(parseInt(valPenumpang)) &&
  //       car.capacity === parseInt(valPenumpang) &&
  //       (!valTypeDriver ||
  //         car.typeDriver.toLowerCase().includes(valTypeDriver.toLowerCase())) // Jika valTypeDriver kosong, tidak melakukan filter berdasarkan tipe driver
  //     );
  //   });

  //   // Menampilkan mobil yang telah difilter atau pesan jika tidak ada mobil yang sesuai
  //   if (cars.length === 0) {
  //     this.carContainerElement.innerHTML =
  //       '<p>Tidak ada mobil yang sesuai dengan kriteria yang Anda masukkan.</p>';
  //   } else {
  //     this.renderCars(cars); // Render the cars
  //     // Refresh ikon setelah rendering mobil
  //     feather.replace();
  //     console.log(cars);
  //   }
  // };

  // Method untuk memuat daftar mobil
  async load() {
    const cars = await Binar.listCars();
    console.log(cars);
  }

  // Method untuk menampilkan mobil
  renderCars(cars) {
    cars.forEach((car) => {
      const carInstance = new Car(car);
      const carHTML = carInstance.render();
      this.carContainerElement.insertAdjacentHTML('beforeend', carHTML);
    });
  }

  // Method untuk menghapus tampilan mobil
  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}

// Membuat instance App dan memulai aplikasi
const app = new App();

export default app;
