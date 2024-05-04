class App {
  constructor() {
    this.loadButton = document.getElementById('load-btn');
    this.carContainerElement = document.getElementById('cars-container');
    this.penumpang = document.getElementById('jumlah-penumpang');
    this.inputTanggal = document.getElementById('inputElement');
    this.inputWaktu = document.getElementById('selectElementWaktu');
    this.inputTypeDriver = document.getElementById('selectElementd');

    this.loadButton.disabled = true;
    this.loadButton.addEventListener('click', this.run);
    this.inputTanggal.addEventListener('input', this.checkInputs);
    this.inputWaktu.addEventListener('input', this.checkInputs);
  }

  checkInputs = () => {
    const isTypeDriver = this.inputTypeDriver.value.trim() !== '';
    const isTanggalFilled = this.inputTanggal.value.trim() !== '';
    const isWaktuFilled = this.inputWaktu.value.trim() !== '';

    this.loadButton.disabled = !(
      isTypeDriver &&
      isTanggalFilled &&
      isWaktuFilled
    );
  };

  run = async () => {
    const valPenumpang = this.penumpang.value;
    const valTanggal = this.inputTanggal.value;
    const valWaktu = this.inputWaktu.value;
    const valTypeDriver = this.inputTypeDriver.value;

    this.clear();

    const cars = await Binar.listCars((car) => {
      let result = true;

      if (valTypeDriver && valTypeDriver !== 'Pilih Tipe Driver') {
        result = car.typeDriver
          .toLowerCase()
          .includes(valTypeDriver.toLowerCase());
      }

      if (!isNaN(parseInt(valPenumpang))) {
        result = car.capacity === parseInt(valPenumpang);
      }

      if (valTanggal) {
        const carDate = new Date(car.availableAt).setHours(0, 0, 0, 0);
        const selectedDate = new Date(valTanggal).setHours(0, 0, 0, 0);
        result = result && carDate.getTime() === selectedDate.getTime();
      }

      if (valWaktu) {
        const carTime = new Date(car.availableAt).getUTCHours();
        const selectedTime = parseInt(valWaktu.split(':')[0]);
        result = result && carTime === selectedTime;
      }

      return result;
    });

    if (cars.length === 0) {
      this.carContainerElement.innerHTML =
        '<p>Tidak ada mobil yang sesuai dengan kriteria yang Anda masukkan.</p>';
    } else {
      this.renderCars(cars);
    }
  };

  async init() {
    await this.load();
  }

  async load() {
    const cars = await Binar.listCars();
    console.log(cars);
  }

  renderCars(cars) {
    const fragment = document.createDocumentFragment();
    cars.forEach((car) => {
      const carInstance = new Car(car);
      const carHTML = carInstance.render();
      const carElement = document.createElement('div');
      carElement.innerHTML = carHTML;
      fragment.appendChild(carElement);
    });
    this.carContainerElement.appendChild(fragment);
  }

  clear = () => {
    this.carContainerElement.innerHTML = '';
  };
}

const app = new App();
app.init();

export default app;
