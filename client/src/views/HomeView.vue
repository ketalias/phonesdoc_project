<template>
  <div class="main-wrap">
    <section
      class="hero-section bg-dark text-white d-flex align-items-center position-relative"
    >
      <div class="container">
        <div class="content row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="text-white-50">Welcome.Friend</p>
            <h1 class="display-1 fw-bold mb-1 text-wrap">
              <span class="fw-light">Phone Store</span> Number One
            </h1>
            <p class="lead mb-5 text-wrap">
              Від смартфонів до навушників — у нас є все, що потрібно для
              сучасного життя. Оформлюй замовлення швидко, зручно та безпечно.
            </p>
            <router-link
              to="/catalog"
              class="btn btn-outline-light btn-lg px-5"
            >
              Почати
            </router-link>
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
                class="img-fluid product-img col-12 col-md-6 mb-3 mb-md-0 me-md-4"
                style="width: 80%; max-width: 400px; height: auto"
              />
              <div class="product-info">
                <h2 class="h1 fw-bold">Apple</h2>
                <p class="text fs-6">
                  Досліджуй повну лінійку смартфонів Apple — від iPhone SE до
                  новітнього iPhone 16 Pro Max. Порівнюй характеристики, обирай
                  і купуй.
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
                class="img-fluid col-12 col-md-6 product-img mb-3 mb-md-0 me-md-4"
                style="width: 50%; max-width: 400px; height: auto"
              />
              <div class="product-info">
                <h3 class="h2 fw-bold">Електронні годинники</h3>
                <p class="fs-6">Скоро у продажу — слідкуй за оновленнями!</p>
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
                class="img-fluid product-img mb-3 mb-md-0 me-md-4 col-12 col-md-6"
                style="width: 40%; max-width: 400px; height: auto"
              />
              <div class="product-info">
                <h3 class="h2 fw-bold">Навушники</h3>
                <p class="fs-6">
                  Скоро у продажу — найкращий звук для твого ритму життя.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-dark text-white py-5 mt-5">
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
          <h1 class="display-2 mb-3">Оновлюй техніку з нами</h1>
          <p class="lead mb-4">
            Обирай із сотень перевірених гаджетів: смартфони, аксесуари,
            годинники. Вигідні ціни, швидка доставка, гарантія.
          </p>

          <router-link to="/catalog" class="btn btn-outline-light btn-lg px-5">
            Перейти до каталогу
          </router-link>
        </div>
        <div class="col-md-3 d-flex justify-content-center">
          <img
            class="img-fluid"
            style="max-width: 500px; max-height: 40vh; object-fit: cover"
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
