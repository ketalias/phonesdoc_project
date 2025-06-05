const pool = require("../models/db");

exports.getPhones = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const {
    search,
    brands,
    prices,
    years,
    colors,
    ports,
    bluetooth,
    memory_sizes,
    screen_sizes,
    cpus,
    battery_capacities,
    refresh_rates,
    resolutions,
    screen_types,
    number_of_cores,
  } = req.query;

  console.log("GET /api/phones query:", req.query);

  const values = [];
  const conditions = [];

  if (search) {
    values.push(`%${search.toLowerCase()}%`);
    conditions.push(`LOWER(fullname) LIKE $${values.length}`);
  }

  if (brands) {
    const brandList = brands.split(",");
    const placeholders = brandList.map((_, i) => `$${values.length + i + 1}`);
    values.push(...brandList);
    conditions.push(`brand IN (${placeholders.join(",")})`);
  }

  if (prices) {
    const priceConditions = prices.split(",").map((range) => {
      const [min, max] = range.split("-").map(Number);
      if (!isNaN(min) && isFinite(max)) {
        values.push(min, max);
        return `(price >= $${values.length - 1} AND price <= $${
          values.length
        })`;
      } else {
        values.push(min);
        return `(price >= $${values.length})`;
      }
    });
    conditions.push(`(${priceConditions.join(" OR ")})`);
  }

  if (years) {
    const yearConditions = years.split(",").map((range) => {
      const [min, max] = range.split("-").map(Number);
      if (!isNaN(min) && isFinite(max)) {
        values.push(min, max);
        return `(release_year >= $${values.length - 1} AND release_year <= $${
          values.length
        })`;
      } else {
        values.push(min);
        return `(release_year >= $${values.length})`;
      }
    });
    conditions.push(`(${yearConditions.join(" OR ")})`);
  }

  if (colors) {
    const colorList = colors.split(",");
    const placeholders = colorList.map((_, i) => `$${values.length + i + 1}`);
    values.push(...colorList);
    conditions.push(`EXISTS (
      SELECT 1 FROM unnest(colors) AS c WHERE c IN (${placeholders.join(",")})
    )`);
  }

  if (ports) {
    const portValues = ports.split(",").map((v) => v === "true");
    const placeholders = portValues.map((_, i) => `$${values.length + i + 1}`);
    values.push(...portValues);
    conditions.push(`has_infrared IN (${placeholders.join(",")})`);
  }

  if (bluetooth) {
    const btValues = bluetooth.split(",").map((v) => v === "true");
    const placeholders = btValues.map((_, i) => `$${values.length + i + 1}`);
    values.push(...btValues);
    conditions.push(`has_bluetooth IN (${placeholders.join(",")})`);
  }

  if (memory_sizes) {
    const list = memory_sizes.split(",");
    const placeholders = list.map((_, i) => `$${values.length + i + 1}`);
    values.push(...list);
    conditions.push(`memory_size::text IN (${placeholders.join(",")})`);
  }

  if (screen_sizes) {
    const list = screen_sizes.split(",");
    const placeholders = list.map((_, i) => `$${values.length + i + 1}`);
    values.push(...list);
    conditions.push(`screen_size::text IN (${placeholders.join(",")})`);
  }

  if (cpus) {
    const list = cpus.split(",");
    const placeholders = list.map((_, i) => `$${values.length + i + 1}`);
    values.push(...list);
    conditions.push(`cpu IN (${placeholders.join(",")})`);
  }

  if (battery_capacities) {
    const batteryConditions = battery_capacities.split(",").map((range) => {
      const [min, max] = range.split("-").map(Number);
      if (!isNaN(min) && isFinite(max)) {
        values.push(min, max);
        return `(battery_capacity >= $${
          values.length - 1
        } AND battery_capacity <= $${values.length})`;
      } else {
        values.push(min);
        return `(battery_capacity >= $${values.length})`;
      }
    });
    conditions.push(`(${batteryConditions.join(" OR ")})`);
  }

  if (refresh_rates) {
    const list = refresh_rates.split(",");
    const placeholders = list.map((_, i) => `$${values.length + i + 1}`);
    values.push(...list);
    conditions.push(`refresh_rate::text IN (${placeholders.join(",")})`);
  }

  if (resolutions) {
    const list = resolutions.split(",");
    const placeholders = list.map((_, i) => `$${values.length + i + 1}`);
    values.push(...list);
    conditions.push(`resolution IN (${placeholders.join(",")})`);
  }

  if (screen_types) {
    const list = screen_types.split(",");
    const placeholders = list.map((_, i) => `$${values.length + i + 1}`);
    values.push(...list);
    conditions.push(`screen_type IN (${placeholders.join(",")})`);
  }

  if (number_of_cores) {
    const list = number_of_cores.split(",");
    const placeholders = list.map((_, i) => `$${values.length + i + 1}`);
    values.push(...list);
    conditions.push(`number_of_cores::text IN (${placeholders.join(",")})`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const phonesQuery = `SELECT * FROM phones ${whereClause} ORDER BY id LIMIT $${
    values.length + 1
  } OFFSET $${values.length + 2}`;
  const countQuery = `SELECT COUNT(*) FROM phones ${whereClause}`;

  console.log("📄 Final SQL:", phonesQuery);
  console.log("🔢 Values:", [...values, limit, offset]);

  try {
    const phonesResult = await pool.query(phonesQuery, [
      ...values,
      limit,
      offset,
    ]);
    const countResult = await pool.query(countQuery, values);

    const total = parseInt(countResult.rows[0].count);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: phonesResult.rows,
    });
  } catch (err) {
    console.error("❌ Error in getPhones:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPhone = async (req, res) => {
  const { id } = req.params;
  console.log("📥 GET /api/phones/:id", id);
  try {
    const result = await pool.query("SELECT * FROM phones WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error in getPhone:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createPhone = async (req, res) => {
  const data = req.body;
  console.log("📥 POST /api/phones", data);

  try {
    const result = await pool.query(
      `INSERT INTO phones 
        (fullname, brand, release_year, colors, has_bluetooth, has_infrared, price, old_price, photo_url,
         memory_size, screen_size, cpu, battery_capacity, description, refresh_rate, resolution, screen_type, number_of_cores)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9,
         $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING *`,
      [
        data.fullname,
        data.brand,
        data.release_year,
        data.colors,
        data.has_bluetooth,
        data.has_infrared,
        data.price,
        data.old_price,
        data.photo_url,
        data.memory_size,
        data.screen_size,
        data.cpu,
        data.battery_capacity,
        data.description,
        data.refresh_rate,
        data.resolution,
        data.screen_type,
        data.number_of_cores,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error in createPhone:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updatePhone = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log("📥 PUT /api/phones/:id", id, data);

  try {
    const result = await pool.query(
      `UPDATE phones SET 
        fullname=$1, brand=$2, release_year=$3, colors=$4, has_bluetooth=$5,
        has_infrared=$6, price=$7, old_price=$8, photo_url=$9,
        memory_size=$10, screen_size=$11, cpu=$12, battery_capacity=$13, description=$14,
        refresh_rate=$15, resolution=$16, screen_type=$17, number_of_cores=$18
       WHERE id=$19 RETURNING *`,
      [
        data.fullname,
        data.brand,
        data.release_year,
        data.colors,
        data.has_bluetooth,
        data.has_infrared,
        data.price,
        data.old_price,
        data.photo_url,
        data.memory_size,
        data.screen_size,
        data.cpu,
        data.battery_capacity,
        data.description,
        data.refresh_rate,
        data.resolution,
        data.screen_type,
        data.number_of_cores,
        id,
      ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error in updatePhone:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deletePhone = async (req, res) => {
  const { id } = req.params;
  console.log("🗑 DELETE /api/phones/:id", id);
  try {
    const result = await pool.query(
      "DELETE FROM phones WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deletePhone:", err);
    res.status(500).json({ error: err.message });
  }
};
