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
const screenTypes = ["AMOLED", "IPS", "LCD", "OLED"];
const resolutions = ["2400x1080", "2280x1080", "1920x1080", "2560x1440"];
const memorySizes = ["4 GB", "6 GB", "8 GB", "12 GB"];
const screenSizes = ['5.5"', '6.1"', '6.5"', '6.8"'];
const cpus = [
  "Snapdragon 888",
  "A16 Bionic",
  "Exynos 2100",
  "MediaTek Dimensity 920",
];
const batteryCapacities = ["4000 mAh", "4500 mAh", "5000 mAh", "6000 mAh"];
const refreshRates = [60, 90, 120, 144];

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

function getRandomColors() {
  const shuffled = [...colors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1); // 1-3 кольори
}

function generatePhones(count = 50) {
  const phones = [];

  for (let i = 1; i <= count; i++) {
    const brand = getRandomItem(brands);
    const price = +(Math.random() * 1000 + 200).toFixed(2);

    phones.push({
      fullname: `${brand} Model ${i}`,
      brand,
      release_year: getRandomItem(years),
      colors: getRandomColors(),
      has_bluetooth: Math.random() > 0.1,
      has_infrared: Math.random() > 0.7,
      price,
      old_price: +(price + Math.random() * 300).toFixed(2),
      photo_url:
        brandImages[brand] || "https://via.placeholder.com/150?text=Phone",
      memory_size: getRandomItem(memorySizes),
      screen_size: getRandomItem(screenSizes),
      cpu: getRandomItem(cpus),
      battery_capacity: getRandomItem(batteryCapacities),
      description:
        "Цей смартфон має чудовий дисплей, камеру та продуктивність.",
      refresh_rate: getRandomItem(refreshRates),
      resolution: getRandomItem(resolutions),
      screen_type: getRandomItem(screenTypes),
      number_of_cores: Math.floor(Math.random() * 4 + 4), // 4-7 ядер
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
        (fullname, brand, release_year, colors, has_bluetooth, has_infrared, price, photo_url,
         memory_size, screen_size, cpu, battery_capacity, description, refresh_rate, resolution, 
         screen_type, number_of_cores, old_price) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8,
         $9, $10, $11, $12, $13, $14, $15,
         $16, $17, $18)`,
        [
          phone.fullname,
          phone.brand,
          phone.release_year,
          phone.colors,
          phone.has_bluetooth,
          phone.has_infrared,
          phone.price,
          phone.photo_url,
          phone.memory_size,
          phone.screen_size,
          phone.cpu,
          phone.battery_capacity,
          phone.description,
          phone.refresh_rate,
          phone.resolution,
          phone.screen_type,
          phone.number_of_cores,
          phone.old_price,
        ]
      );
    }

    console.log("📱 Нові телефони успішно додано!");
  } catch (err) {
    console.error("❌ Помилка при додаванні даних:", err);
  } finally {
    await pool.end();
  }
}

seedData();
