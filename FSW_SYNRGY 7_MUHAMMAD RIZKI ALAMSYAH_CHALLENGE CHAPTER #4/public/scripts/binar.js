// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

class Binar {
  // static populateCars = (cars) => {
  //   return cars.map((car) => {
  //     // const isPositive = getRandomInt(0, 1) === 1;
  //     // const timeAt = new Date();
  //     // const mutator = getRandomInt(1000000, 100000000);
  //     // const availableAt = new Date(
  //     //   timeAt.getTime() + (isPositive ? mutator : -1 * mutator)
  //     // );

  //     // const availableAt = timeAt;
  //     const availableAt = new Date(car.availableAt);

  //     return {
  //       ...car,
  //       availableAt,
  //     };
  //   });
  // };

  static populateCars = (cars) => {
    return cars.map((car) => {
      // const availableAt = new Date(car.availableAt);
      // Convert availableAt to Date object and then to ISO string
      // const availableAtUTC = new Date(Date.parse(car.availableAt));

      // Mendefinisikan pilihan untuk typeDriver
      const typeDriverOptions = ['dengan kunci', 'lepas kunci'];
      // Memilih secara acak salah satu dari pilihan tersebut
      const randomTypeDriver =
        typeDriverOptions[Math.floor(Math.random() * typeDriverOptions.length)];
      return {
        ...car,
        typeDriver: randomTypeDriver,
        // availableAt: availableAtUTC.toISOString(),
      };
    });
  };

  // static populateCars = (cars) => {
  //   return cars.map((car) => {
  //     // Parse availableAt string from JSON
  //     const dateString = car.availableAt.split('T')[0];
  //     const timeString = car.availableAt.split('T')[1].split('.')[0];
  //     const year = parseInt(dateString.split('-')[0]);
  //     const month = parseInt(dateString.split('-')[1]) - 1; // Months are zero indexed
  //     const day = parseInt(dateString.split('-')[2]);
  //     const hours = parseInt(timeString.split(':')[0]);
  //     const minutes = parseInt(timeString.split(':')[1]);
  //     const seconds = parseInt(timeString.split(':')[2]);

  //     // Create Date object using extracted information and set it to UTC
  //     const availableAtUTC = new Date(
  //       Date.UTC(year, month, day, hours, minutes, seconds)
  //     );

  //     return {
  //       ...car,
  //       availableAt: availableAtUTC.toISOString(), // Convert to ISO string
  //     };
  //   });
  // };

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
