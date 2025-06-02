<template>
  <div class="main-wrap">
    <section
      class="hero-section bg-dark text-white d-flex align-items-center position-relative"
    >
      <div class="container">
        <div class="content row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="text-white-50">Welcome.Pro</p>
            <h1 class="display-1 fw-bold mb-1 text-wrap">
              <span class="fw-light">Phone Catalog</span> Number One
            </h1>
            <p class="lead mb-4 text-wrap">
              PhoneDoc це веб додаток для керування телефонним бізнесом за
              допомогою довідника, швидко та зручно.
            </p>
            <button class="btn btn-outline-light btn-lg">Почати</button>
          </div>
          <div class="image-container col-md-6 position-relative">
            <img
              src="../assets/hero-model.png"
              alt="Phone Catalog"
              class="img-fluid rounded custom-img"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="products-section py-5 bg-light text-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div
              class="product-card bg-dark text-light p-4 h-100 d-flex flex-column flex-md-row align-items-center"
            >
              <img
                src="https://my-apple.com.ua/image/catalog/products/iphone/iphone-16-pro-16-pro-max/desert-titanium-1.png"
                alt="Apple iPhone"
                class="img-fluid product-img col-6 mb-3 mb-md-0 me-md-4"
                style="width: 25vw; height: auto"
              />
              <div class="product-info">
                <h2 class="h3">Apple</h2>
                <p class="text">
                  Готова база даних, що містить детальну інформацію про всі
                  смартфони, випущені компанією Apple. Ця база охоплює технічні
                  характеристики, дати випуску, особливості моделей, а також їх
                  еволюцію від першого iPhone до найновіших пристроїв.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div
              class="product-card bg-light text-dark p-4 h-100 d-flex flex-column flex-md-row align-items-center"
            >
              <img
                src="https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111853_apple-watch-se-2nd-gen.png"
                alt="AppleWatch"
                class="img-fluid col-6 product-img mb-3 mb-md-0 me-md-4"
              />
              <div class="product-info">
                <h3 class="h4">Електронні годинники</h3>
                <p>Скоро у мережі!</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-4 mb-md-0">
            <div
              class="product-card bg-secondary text-white p-4 h-100 d-flex flex-column flex-md-row align-items-center"
            >
              <img
                src="https://applehome.te.ua/wp-content/uploads/2021/01/airpods-max-select-spacegray-202011.png"
                alt="AirPods Max"
                class="img-fluid product-img mb-3 mb-md-0 me-md-4"
              />
              <div class="product-info">
                <h3 class="h4">Навушники</h3>
                <p>Скоро стане доступним для додавання!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="bg-dark text-white py-5 mt-5"
      style="
        background-image: url('assets/images/bg-hero.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      "
    >
      <div
        class="d-flex flex-column flex-md-row align-items-center justify-content-between text-center"
      >
        <div
          class="col-md-3 mb-4 mb-md-0 d-none d-md-flex justify-content-center"
        >
          <img
            class="img-fluid"
            style="max-width: 500px; object-fit: cover"
            src="../assets/photo1.png"
            alt="Phone Left"
          />
        </div>
        <div class="col-md-6 mb-4 mb-md-0">
          <h1 class="display-2 mb-3">Керуйте бізнесом разом з нами</h1>
          <p class="lead mb-4">
            Долучайтесь до нашої мережі та користуйтесь платними планами для ще
            кращої продуктивності
          </p>
          <button class="btn btn-outline-light btn-lg">
            Перейти в каталог!
          </button>
        </div>
        <div class="col-md-3 d-flex justify-content-center">
          <img
            class="img-fluid"
            style="max-width: 500px; object-fit: cover"
            src="../assets/photo2.png"
            alt="Phone Right"
          />
        </div>
      </div>
    </section>

    <footer>
      <footer-comp />
    </footer>
  </div>
</template>

<script>
import FooterComp from "@/components/FooterComp.vue";
export default {
  name: "HomeView",
  components: {
    FooterComp,
  },
  data() {
    return {
      phones: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/api/phones")
      .then((res) => res.json())
      .then((data) => (this.phones = data))
      .catch((err) => console.error("Помилка:", err));
  },
  methods: {
    remove(id) {
      fetch(`http://localhost:3000/api/phones/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          this.phones = this.phones.filter((p) => p.id !== id);
        })
        .catch((err) => console.error("Помилка видалення:", err));
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  //border: 1px solid white;
  box-sizing: border-box;
}

h1 {
  font-weight: 700;
  font-size: 6rem;
  span {
    font-weight: 100;
  }
}

.hero-section {
  background: linear-gradient(150deg, #070009, #303030);
  height: 95vh;
  padding: 80px 0;
  overflow: hidden;

  .container {
    max-width: 1700px;
    width: 100%;
    padding: 0 15px;

    .content {
      .text-wrap {
        overflow-wrap: break-word;
        max-width: 100%;
      }

      .image-container {
        position: relative;
        height: 100vh;
        display: flex;
        justify-content: center;

        .custom-img {
          position: absolute;
          bottom: -50px;
          right: 0;
          height: 90%;
          width: auto;
        }
      }
    }
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 40px 20px 0 20px;
    text-align: center;

    .container {
      .content {
        .image-container {
          height: auto;

          .custom-img {
            position: relative;
            bottom: auto;
            right: auto;
            max-width: 80%;
            margin: 20px 0 0 0;
            display: block;
          }
        }

        .lead {
          font-size: 1rem;
        }
      }
    }
  }
}

.products-section {
  img {
    width: 15vw;
    height: auto;
  }
}

.display-1 {
  font-size: 7rem;

  @media (max-width: 1200px) {
    font-size: 6rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
}
.display-2 {
  font-size: 6rem;

  @media (max-width: 1200px) {
    font-size: 4.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}
</style>
