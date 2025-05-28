<template>
  <div class="wrapper bg-dark text-white mt-5">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="fw-bold">PhoneDoc</h5>
          <p>
            PhoneDoc — це веб-додаток, який пропонує повний каталог мобільних
            телефонів із детальною інформацією та зручним інтерфейсом.
          </p>
        </div>
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="fw-bold">Посилання</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#" class="text-white text-decoration-none"
                >Політика конфіденційності</a
              >
            </li>
            <li class="mb-2">
              <a href="#" class="text-white text-decoration-none"
                >Умови використання</a
              >
            </li>
            <li class="mb-2">
              <a href="#" class="text-white text-decoration-none">Допомога</a>
            </li>
          </ul>
          <div class="mt-3">
            <a href="#" class="text-white me-3"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a href="#" class="text-white me-3"
              ><i class="fab fa-twitter"></i
            ></a>
            <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="col-md-4">
          <h5 class="fw-bold">Контакти</h5>
          <p class="mb-1">Електронна пошта: support@phonedoc.com</p>
          <p class="mb-1">Телефон: +38 (050) 123-45-67</p>
          <p>Адреса: м. Київ, вул. Хрещатик 1</p>
        </div>
      </div>
    </div>
    <div class="container text-center py-3 border-top border-secondary">
      <p class="mb-0">© 2025 PhoneDoc. Усі права захищені.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  .container {
    .row {
      .col-md-4 {
        h5 {
          margin-bottom: 1.5rem;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 50px;
            height: 2px;
            background: #72077b;
            transition: width 0.3s ease;
          }

          &:hover::after {
            width: 100%;
          }
        }

        p {
          font-size: 0.9rem;
          line-height: 1.6;
        }

        ul {
          a {
            &:hover {
              color: #34032e;
            }
          }

          .fab {
            font-size: 1.5rem;
            transition: color 0.3s ease;

            &:hover {
              color: #55063c;
            }
          }
        }
      }
    }

    &.text-center {
      border-top: 1px solid #444;
      p {
        font-size: 0.85rem;
        color: #bbb;
      }
    }
  }
}
</style>
