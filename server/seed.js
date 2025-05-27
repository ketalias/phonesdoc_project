const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mobile_db",
  password: "07042006",
  port: 5432,
});

const phones = [
  {
    fullname: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    release_year: 2021,
    color: "Black",
    has_bluetooth: true,
    has_infrared: false,
    price: 799.99,
    photo_url:
      "https://mobileplanet.ua/uploads/product/2023-2-3/xmagazin-mobileplanet-samsung-galaxy-s23-ultra-12-256gb-phanto-2653971.jpg.pagespeed.ic.NrxQQ8hd8y.jpg",
  },
  {
    fullname: "iPhone 15 Pro Max",
    brand: "Apple",
    release_year: 2021,
    color: "White",
    has_bluetooth: true,
    has_infrared: false,
    price: 999.99,
    photo_url:
      "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Green_PDP_Image_Position-1__en-IN_a957365d-0aa2-43da-88b1-fcaa9b0be4cf.jpg?v=1694606789&width=823",
  },
  {
    fullname: "Xiaomi Mi 11",
    brand: "Xiaomi",
    release_year: 2020,
    color: "Blue",
    has_bluetooth: true,
    has_infrared: true,
    price: 699.99,
    photo_url:
      "https://cdn.new-brz.net/app/public/models/REDMINOTE11-6128GGR/large/w/220822160017224759.webp",
  },
];

async function seedData() {
  try {
    for (let phone of phones) {
      await pool.query(
        `INSERT INTO phones 
        (fullname, brand, release_year, color, has_bluetooth, has_infrared, price, photo_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          phone.fullname,
          phone.brand,
          phone.release_year,
          phone.color,
          phone.has_bluetooth,
          phone.has_infrared,
          phone.price,
          phone.photo_url,
        ]
      );
    }
    console.log(" Дані успішно додано!");
  } catch (err) {
    console.error(" Помилка при додаванні даних:", err);
  } finally {
    await pool.end();
  }
}

seedData();
