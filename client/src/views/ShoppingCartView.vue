<template>
  <div class="shopping-cart-view">
    <div class="container-fluid row py-5" style="min-height: 60vh">
      <div v-if="cartItems.length > 0" class="items col-12 col-md-6">
        <h2 class="mb-4 text-start">Ваш кошик</h2>
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="card mb-3 p-3 border-0"
        >
          <div class="row g-3 align-items-center border-bottom py-3">
            <div class="col-md-2">
              <img
                :src="item.photo"
                :alt="item.name"
                class="img-fluid rounded"
              />
            </div>
            <div
              class="col-md-10 d-flex align-items-center justify-content-between flex-wrap"
            >
              <h5 class="mb-0 me-3">{{ item.name }}</h5>

              <div class="d-flex align-items-center me-3">
                <span
                  :style="{ color: item.color, fontSize: '1.5rem' }"
                  class="me-1"
                  >●</span
                >
              </div>

              <p class="mb-0 me-3">{{ item.memory }}</p>

              <div class="d-flex align-items-center me-3">
                <button
                  class="btn btn-outline-secondary btn-sm"
                  @click="decreaseQuantity(index)"
                  :disabled="item.quantity <= 1"
                  style="width: 30px; height: 30px; padding: 0"
                >
                  -
                </button>
                <span class="mx-2">{{ item.quantity }}</span>
                <button
                  class="btn btn-outline-secondary btn-sm"
                  @click="increaseQuantity(index)"
                  style="width: 30px; height: 30px; padding: 0"
                >
                  +
                </button>
              </div>

              <p class="mb-0 fw-bold me-3">
                Ціна: ${{ (item.price * item.quantity).toFixed(2) }}
              </p>

              <button
                class="btn btn-dark text-white btn-sm"
                @click="removeItem(index)"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="summary col-12 col-md-6">
        <h2 class="mb-4 text-start">Загальна вартість</h2>
        <div class="discounts mb-3 text-start text-muted">
          <label for="promoCode">Код знижки / Промокод</label>
          <input
            id="promoCode"
            type="text"
            class="form-control mb-2"
            placeholder="код"
            v-model="promoCode"
          />

          <label for="bonusCard">Бонусна картка</label>
          <input
            id="bonusCard"
            type="text"
            class="form-control mb-3"
            placeholder="Номер картки"
            v-model="bonusCard"
          />
        </div>

        <h5 class="mb-4 text-start">
          Передвартість: ${{ totalPrice.toFixed(2) }}
        </h5>
        <p class="text-start text-muted">
          Сума знижки: -${{ discountAmount.toFixed(2) }}
        </p>
        <p class="text-start text-muted">
          Доставка: ${{ shippingCost.toFixed(2) }}
        </p>
        <h4 class="text-start">До сплати: ${{ finalPrice.toFixed(2) }}</h4>
        <button
          class="btn btn-dark w-100 mt-3 py-4"
          :disabled="cartItems.length === 0"
        >
          Оформити замовлення
        </button>
      </div>
    </div>
    <footer-comp class="mt-5" />
  </div>
</template>

<script>
import FooterComp from "../components/FooterComp.vue";

export default {
  name: "ShoppingCartView",
  components: {
    FooterComp,
  },
  data() {
    return {
      cartItems: [],
      promoCode: "",
      bonusCard: "",
      discountAmount: 0,
      shippingCost: 0,
      validPromoCodes: {
        DISCOUNT10: 0.1,
        SALE20: 0.2,
      },
      validBonusCards: {
        123456: 5,
        654321: 10,
      },
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    finalPrice() {
      const priceAfterDiscount = Math.max(
        this.totalPrice - this.discountAmount,
        0
      );
      return priceAfterDiscount + this.shippingCost;
    },
  },
  watch: {
    cartItems: {
      handler() {
        this.calculateShipping();
        this.calculateDiscount();
        this.saveCart();
      },
      deep: true,
    },
    promoCode() {
      this.calculateDiscount();
    },
    bonusCard() {
      this.calculateDiscount();
    },
  },
  created() {
    this.loadCart();
    this.calculateShipping();
    this.calculateDiscount();
  },
  methods: {
    loadCart() {
      const savedCart = localStorage.getItem("cart");
      this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
      this.saveCart();
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.saveCart();
      }
    },
    calculateShipping() {
      this.shippingCost = this.totalPrice >= 700 ? 0 : 5;
    },
    calculateDiscount() {
      let discount = 0;
      const promo = this.promoCode.toUpperCase();
      if (this.validPromoCodes[promo]) {
        discount += this.totalPrice * this.validPromoCodes[promo];
      }
      if (this.validBonusCards[this.bonusCard]) {
        discount += this.validBonusCards[this.bonusCard];
      }
      this.discountAmount = discount;
    },
  },
};
</script>

<style scoped>
@media (max-width: 1400px) {
  .items,
  .summary {
    width: 100%;
  }
}

img {
  max-height: 100px;
}
</style>
