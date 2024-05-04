class Binar {
  // Properti statis untuk menyimpan tipe driver untuk setiap mobil
  static typeDriverMap = {};

  // Method untuk mengisi properti typeDriver pada setiap mobil
  static populateCars = (cars) => {
    // Cek apakah typeDriver sudah ada dalam typeDriverMap
    return cars.map((car) => {
      // Cek apakah typeDriver sudah ada dalam typeDriverMap
      const typeDriver =
        this.typeDriverMap[car.id] || Binar.getRandomTypeDriver();

      // Simpan typeDriver ke typeDriverMap
      this.typeDriverMap[car.id] = typeDriver;

      // Mengembalikan objek mobil dengan properti typeDriver yang telah diisi
      return {
        ...car,
        typeDriver: typeDriver,
      };
    });
  };

  // Method untuk mendapatkan typeDriver secara acak
  static getRandomTypeDriver() {
    const typeDriverOptions = ['with driver', 'without driver'];
    return typeDriverOptions[
      Math.floor(Math.random() * typeDriverOptions.length)
    ];
  }

  // Memeriksa apakah daftar mobil telah disimpan di localStorage
  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem('CARS');

    if (!!cachedCarsString) {
      const cacheCars = JSON.parse(cachedCarsString);
      cars = this.populateCars(cacheCars);
    } else {
      const response = await fetch(
        'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json'
      );
      const body = await response.json();
      cars = this.populateCars(body);

      localStorage.setItem('CARS', JSON.stringify(cars));
    }

    if (filterer instanceof Function) return cars.filter(filterer);

    return cars;
  }
}

// export default Binar;
