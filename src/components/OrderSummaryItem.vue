<template>
  <tr>
    <th scope="row" class="is-header">{{ item.quantity }}</th>
    <td>{{ item.name }}</td>
    <td>{{ itemPrice(item) }}</td>
  </tr>
</template>

<script>
export default {
  name: "OrderSummaryItem",
  props: ["item"],
  methods: {
    itemPrice(item) {
      const price = item.specialoffer
        ? item.offerprice * item.quantity
        : item.price * item.quantity;
      return parseFloat(price).toFixed(2);
    }
  }
};
</script>
