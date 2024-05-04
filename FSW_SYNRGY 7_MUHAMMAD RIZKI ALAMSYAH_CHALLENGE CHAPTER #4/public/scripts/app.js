// import Binar from '../scripts/binar.js';
// import Car from '../scripts/car.js';

class App {
  constructor() {
    // Inisialisasi elemen-elemen DOM yang diperlukan
    this.loadButton = document.getElementById('load-btn');
    this.carContainerElement = document.getElementById('cars-container');
    this.penumpang = document.getElementById('jumlah-penumpang');
    this.inputTanggal = document.getElementById('inputElement');
    this.inputWaktu = document.getElementById('selectElementWaktu');
    this.inputTypeDriver = document.getElementById('selectElementd');

    // Menonaktifkan tombol "Load" pada awalnya
    this.loadButton.disabled = true;
  }

  async init() {
    // Memuat data mobil saat aplikasi dimulai
    await this.load();
    // Menambahkan event listener untuk tombol "Load"
    this.loadButton.addEventListener('click', this.run);

    // Menambahkan event listener untuk memeriksa input setiap kali terjadi perubahan
    this.inputTanggal.addEventListener('input', this.checkInputs);
    this.inputWaktu.addEventListener('input', this.checkInputs);
  }

  // Method untuk memeriksa apakah input telah diisi
  checkInputs = () => {
    // Memeriksa apakah setiap bidang yang diperlukan telah diisi
    // const isPenumpangFilled = this.penumpang.value.trim() !== '';
    const isTypeDriver = this.inputTypeDriver.value.trim() !== '';
    const isTanggalFilled = this.inputTanggal.value.trim() !== '';
    const isWaktuFilled = this.inputWaktu.value.trim() !== '';

    // Mengaktifkan atau menonaktifkan tombol Load berdasarkan hasil pemeriksaan
    this.loadButton.disabled = !(
      // isPenumpangFilled &&
      (isTypeDriver && isTanggalFilled && isWaktuFilled)
    );
  };

  run = async () => {
    // Mendapatkan nilai dari input
    const valPenumpang = this.penumpang.value;
    const valTanggal = this.inputTanggal.value;
    const valWaktu = this.inputWaktu.value;
    const valTypeDriver = this.inputTypeDriver.value;

    // console.log('Input Penumpang:', valPenumpang);
    // console.log('Input Tanggal:', valTanggal);
    // console.log('Input Waktu:', valWaktu);

    // Membersihkan tampilan mobil sebelum menampilkan hasil pencarian baru
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
        // Mengambil tanggal mobil dalam waktu setempat
        const carDate = new Date(car.availableAt);
        // Mengatur jam mobil ke 00:00:00 waktu setempat
        carDate.setHours(0, 0, 0, 0);

        // Mengambil tanggal yang dipilih dalam waktu setempat
        const selectedDate = new Date(valTanggal);
        // Mengatur jam tanggal yang dipilih ke 00:00:00 waktu setempat
        selectedDate.setHours(0, 0, 0, 0);

        // Membandingkan tanggal mobil dan tanggal yang dipilih
        result = result && carDate.getTime() === selectedDate.getTime();

        // console.log('Car Date:', carDate.toISOString().split('T')[0]);
        // console.log('Selected Date:', selectedDate.toISOString().split('T')[0]);
        // console.log('Filter by Date:', result);
      }

      if (valWaktu) {
        // Filter based on time only
        const carTime = new Date(car.availableAt).getUTCHours(); // Ambil jam dari availableAt
        const selectedTime = parseInt(valWaktu.split(':')[0]); // Ambil jam dari waktu yang dipilih oleh pengguna
        result = result && carTime === selectedTime;
        // console.log(result);
        // console.log('Car Time:', carTime);
        // console.log('Selected Time:', selectedTime);
        // console.log('Filter by Time:', result);
      }

      return result;
    });

    // this.renderCars(cars); // Render the cars
    // feather.replace();

    // Menampilkan mobil yang telah difilter atau pesan jika tidak ada mobil yang sesuai
    if (cars.length === 0) {
      this.carContainerElement.innerHTML =
        '<p>Tidak ada mobil yang sesuai dengan kriteria yang Anda masukkan.</p>';
    } else {
      this.renderCars(cars); // Render the cars
      // Refresh ikon setelah rendering mobil
      feather.replace();
      console.log(cars);
    }
  };

  // Method untuk memuat daftar mobil
  async load() {
    // const cars = await Binar.listCars();
    Car.init(cars);
    console.log(cars);
  }

  // Method untuk menampilkan mobil
  renderCars(cars) {
    cars.forEach((car) => {
      const carInstance = new Car(car); // Create an instance of Car
      const carHTML = carInstance.render(); // Call the render method from Car instance
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
app.init();

// export default app;
