class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
        <div class="col-md">
          <div class="card" style="height: 700px;" alt="...">
            <img src="${this.image}" class="img-fluid card-img-top" style="width: 100%; height: 300px; object-fit: cover;" alt="..." />
            <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-light">${this.manufacture} ${this.model} / ${this.type}</h5>
            <p class="lead fw-bold">${this.rentPerDay} / hari</p>
              <p class="card-text"> ${this.description} </p>
          
              <div class="card-info d-flex flex-column gap-2">
                <div class="d-flex gap-3 justify-content-start">
                  <span><i class="icon" data-feather="users" style="color: #8a8a8a;" ></i></span>
                  <p>${this.capacity} Orang</p>
                </div>
                <div class="d-flex gap-3 justify-content-start">
                  <span><i class="icon" data-feather="settings" style="color: #8a8a8a;"></i></span>
                  <p>${this.transmission}</p>
                </div>
                <div class="d-flex gap-3 justify-content-start">
                  <span><i class="icon" data-feather="calendar" style="color: #8a8a8a;"></i></span>
                  <p>Tahun ${this.year}</p>
                </div>
              </div>
              <button class="btn btn-success w-100 mt-auto" style="background-color: limegreen; border-color: limegreen;">Pilih Mobil</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
