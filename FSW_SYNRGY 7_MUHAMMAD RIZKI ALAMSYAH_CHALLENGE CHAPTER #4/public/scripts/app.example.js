class App {
  constructor() {
    this.loadButton = document.getElementById('load-btn');
    this.carContainerElement = document.getElementById('cars-container');
    this.penumpang = document.getElementById('jumlah-penumpang');
    this.inputTanggal = document.getElementById('inputElement');
    this.inputWaktu = document.getElementById('selectElementWaktu');

    this.loadButton.disabled = true;
  }

  async init() {
    await this.load();
    this.loadButton.addEventListener('click', this.run);

    // Menambahkan event listener untuk memeriksa input setiap kali terjadi perubahan
    this.inputTanggal.addEventListener('input', this.checkInputs);
    // this.inputWaktu.addEventListener('input', this.checkInputs);
  }

  checkInputs = () => {
    // Memeriksa apakah setiap bidang yang diperlukan telah diisi
    // const isPenumpangFilled = this.penumpang.value.trim() !== '';
    const isTanggalFilled = this.inputTanggal.value.trim() !== '';
    // const isWaktuFilled = this.inputWaktu.value.trim() !== '';

    // Mengaktifkan atau menonaktifkan tombol Load berdasarkan hasil pemeriksaan
    this.loadButton.disabled = !(
      // isPenumpangFilled &&
      isTanggalFilled
      // &&isWaktuFilled
    );
  };

  run = async () => {
    const valPenumpang = this.penumpang.value;
    const valTanggal = this.inputTanggal.value;
    const valWaktu = this.inputWaktu.value;

    console.log('Input Penumpang:', valPenumpang);
    console.log('Input Tanggal:', valTanggal);
    console.log('Input Waktu:', valWaktu);

    this.clear();

    const cars = await Binar.listCars((car) => {
      let result = true;

      if (!isNaN(parseInt(valPenumpang))) {
        result = car.capacity === parseInt(valPenumpang);
      }

      // if (valTanggal) {
      //   // Filter based on date only
      //   const carDate = new Date(car.availableAt);
      //   const selectedDate = new Date(valTanggal);

      //   result =
      //     result &&
      //     carDate.toISOString().split('T')[0] ===
      //       selectedDate.toISOString().split('T')[0];

      //   console.log('Car Date:', carDate.toISOString().split('T')[0]);
      //   console.log('Selected Date:', selectedDate.toISOString().split('T')[0]);
      //   console.log('Filter by Date:', result);
      // }

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

        console.log('Car Date:', carDate.toISOString().split('T')[0]);
        console.log('Selected Date:', selectedDate.toISOString().split('T')[0]);
        console.log('Filter by Date:', result);
      }

      if (valWaktu) {
        // Filter based on time only
        const carTime = new Date(car.availableAt).getUTCHours(); // Ambil jam dari availableAt
        const selectedTime = parseInt(valWaktu.split(':')[0]); // Ambil jam dari waktu yang dipilih oleh pengguna
        result = result && carTime === selectedTime;
        // console.log(result);
        console.log('Car Time:', carTime);
        console.log('Selected Time:', selectedTime);
        console.log('Filter by Time:', result);
      }

      // if (valWaktu) {
      //   const carTime = new Date(car.availableAt).toLocaleTimeString('en-US', {
      //     timeZone: 'Asia/Jakarta',
      //     hour: '2-digit',
      //     // minute: '2-digit',
      //   }); // Ambil waktu lokal dari availableAt dalam format jam menit

      //   const selectedHour = parseInt(valWaktu.split(':')[0]); // Ambil jam dari waktu yang dipilih oleh pengguna
      //   const selectedTime = new Date().setHours(selectedHour, 0); // Menjadikan menit menjadi 00
      //   const selectedTimeString = new Date(selectedTime).toLocaleTimeString(
      //     'en-US',
      //     {
      //       timeZone: 'Asia/Jakarta',
      //       hour: '2-digit',
      //       // minute: '2-digit',
      //     }
      //   ); // Waktu yang dipilih oleh pengguna dalam format 'HH:00'

      //   result = result && carTime === selectedTimeString;

      //   console.log('Car Time:', carTime);
      //   console.log('Selected Time:', selectedTimeString);
      //   console.log('Filter by Time:', result);
      // }

      return result;
    });

    this.renderCars(cars); // Render the cars
    console.log(cars);
  };

  async load() {
    const cars = await Binar.listCars();
    console.log(cars);
  }

  // Method to render cars
  renderCars(cars) {
    cars.forEach((car) => {
      const carInstance = new Car(car); // Create an instance of Car
      const carHTML = carInstance.render(); // Call the render method from Car instance
      this.carContainerElement.insertAdjacentHTML('beforeend', carHTML);
    });
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}

const app = new App();
app.init();
