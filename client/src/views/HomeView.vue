<template>
  <div class="main-wrap mt-5">
    <section
      class="hero-section bg-dark text-white d-flex align-items-center position-relative"
    >
      <div class="container">
        <div class="content row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="text-white-50 mb-2">Welcome.Pro</p>
            <h1 class="display-1 fw-bold mb-3">Phone Catalog Number One</h1>
            <p class="lead mb-4 text-wrap">
              PhoneDoc is a web application that provides a comprehensive
              catalog of mobile phones.
            </p>
            <button class="btn btn-outline-light btn-lg">Get Started</button>
          </div>
          <div class="image-container col-md-6 position-relative">
            <img
              src="https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/6503838502c49-iphone%2015%20blue.png"
              alt="Phone Catalog"
              class="img-fluid rounded custom-img"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.hero-section {
  background: linear-gradient(135deg, #070009, #2c0227);
  height: 95vh;
  padding: 80px 0;
  overflow: hidden;

  .container {
    max-width: 1500px;
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

        .custom-img {
          position: absolute;
          bottom: -50px;
          right: 0;
          max-width: 100%;
          height: auto;
        }
      }
    }
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 40px 20px;
    text-align: center;

    .container {
      .content {
        .image-container {
          height: auto;

          .custom-img {
            position: relative;
            bottom: auto;
            right: auto;
            max-width: 70%;
            margin: 20px auto 0;
            display: block;
          }
        }

        .display-1 {
          font-size: 2.5rem;
        }

        .lead {
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 576px) {
    .container {
      .content {
        .display-1 {
          font-size: 2rem;
        }

        .btn-lg {
          padding: 8px 16px;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
