const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mobile_db",
  password: "07042006",
  port: 5432,
});

const brands = ["Samsung", "Apple", "Xiaomi", "OnePlus", "Motorola", "Nokia"];
const colors = [
  "Black",
  "White",
  "Blue",
  "Green",
  "Red",
  "Silver",
  "Gold",
  "Gray",
];
const years = [2019, 2020, 2021, 2022, 2023, 2024];

const brandImages = {
  Samsung:
    "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/s/m/sm-s931_galaxys25_front_navy_241108.jpg/w_600",
  Apple:
    "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/i/p/iphone_16_pro_max_desert_titanium_pdp_image_position_1__ce-ww.jpg/w_600",
  Xiaomi:
    "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/3/4/345_6.jpg/w_600",
  OnePlus:
    "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/5/0/5011102564_001.jpg/w_600",
  Motorola:
    "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/1/4/14141414141414_2.jpg/w_600",
  Nokia:
    "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/1/4/14141414141414_2.jpg/w_600",
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePhones(count = 50) {
  const phones = [];

  for (let i = 1; i <= count; i++) {
    const brand = getRandomItem(brands);
    phones.push({
      fullname: `${brand} Model ${i}`,
      brand,
      release_year: getRandomItem(years),
      color: getRandomItem(colors),
      has_bluetooth: Math.random() > 0.1,
      has_infrared: Math.random() > 0.7,
      price: +(Math.random() * 1000 + 200).toFixed(2),
      photo_url:
        brandImages[brand] || "https://via.placeholder.com/150?text=Phone",
    });
  }

  return phones;
}

async function seedData() {
  const phones = generatePhones(50);

  try {
    await pool.query("DELETE FROM phones");
    console.log("🧹 Таблиця 'phones' очищена");

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

    console.log("📱 50 брендованих телефонів успішно додано!");
  } catch (err) {
    console.error("❌ Помилка при додаванні даних:", err);
  } finally {
    await pool.end();
  }
}

seedData();
