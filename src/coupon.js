import moment from "moment";
import store from "./store";

const voucherValidator = voucher => {
  let shoppingCart = store.state.cart;
  let categoryid,
    subcategoryid,
    amount,
    affectedProducts,
    newprice,
    subTotalCost,
    percent;

  if (store.state.vouchercode) {
    return {
      status: 400,
      msg: "Only one code can be applied per order"
    };
  }
  // Check for expiration
  const dateNow = moment();
  const expiryDate = moment(voucher.enddate);

  if (dateNow.diff(expiryDate) > 0) {
    return {
      status: 400,
      msg: "Invalid voucher code"
    };
  }

  /*
   * Check for type 
   */

  // Money discount
  if (voucher.coupontype == 1) {
    // Specific Category
    if (voucher.applyto == "specific-category") {
      // Set variable values
      categoryid = voucher.categorymask;
      amount = voucher.amount;
      affectedProducts = 0;

      // Loop for product
      for (let i = 0; i < shoppingCart.length; i++) {
        if (
          (typeof shoppingCart[i].specialoffer === "undefined" ||
            shoppingCart[i].specialoffer === null) &&
          shoppingCart[i].catmask == categoryid
        ) {
          newprice = shoppingCart[i].price - amount; // Compute new price
          shoppingCart[i].couponprice = newprice; // Set new price
          affectedProducts++; // Increment affected
        }
      }

      //Calculate subtotal cost and total items in cart
      subTotalCost = shoppingCart.reduce((acc, cur) => {
        const currentPrice = cur.specialoffer
          ? cur.offerprice * cur.quantity
          : cur.couponprice * cur.quantity;

        const total = acc + currentPrice;
        return total;
      }, 0);

      // Affected
      if (affectedProducts) {
        store.state.vouchercode = voucher.code; // Set voucher code
        return {
          status: 200,
          msg: "Voucher code applied successfully - Money category",
          subtotal: parseFloat(subTotalCost)
        };
      } else {
        return {
          status: 400,
          msg: "Voucher code not valid for products in your cart"
        };
      }
    }

    // Specific Category
    if (voucher.applyto == "specific-subcategory") {
      // Set variable values
      subcategoryid = voucher.subcategorymask;
      amount = voucher.amount;
      affectedProducts = 0;

      // Loop for product
      for (let i = 0; i < shoppingCart.length; i++) {
        if (
          (typeof shoppingCart[i].specialoffer === "undefined" ||
            shoppingCart[i].specialoffer === null) &&
          shoppingCart[i].submask == subcategoryid
        ) {
          newprice = shoppingCart[i].price - amount; // Compute new price
          shoppingCart[i].couponprice = newprice; // Set new price
          affectedProducts++; // Increment affected
        }
      }

      //Calculate subtotal cost and total items in cart
      subTotalCost = shoppingCart.reduce((acc, cur) => {
        const currentPrice = cur.specialoffer
          ? cur.offerprice * cur.quantity
          : cur.couponprice * cur.quantity;

        const total = acc + currentPrice;
        return total;
      }, 0);

      // Affected
      if (affectedProducts) {
        store.state.vouchercode = voucher.code; // Set voucher code
        return {
          status: 200,
          msg: "Voucher code applied successfully - Money subcategory",
          subtotal: parseFloat(subTotalCost)
        };
      } else {
        return {
          status: 400,
          msg: "Voucher code not valid for products in your cart"
        };
      }
    }

    // minimum-subtotal
    if (voucher.applyto == "minimum-subtotal") {
      if (store.state.subtotalprice >= voucher.subtotal) {
        amount = store.state.subtotalprice - voucher.subtotal;
        store.state.vouchercode = voucher.code; // Set voucher code

        return {
          status: 200,
          msg: "Voucher code applied successfully - Money minimum",
          subtotal: parseFloat(amount)
        };
      } else {
        return {
          status: 400,
          msg: `This promo code is applicable to orders from AED ${
            voucher.subtotal
            }`
        };
      }
    }
  }

  // Percentage discount
  if (voucher.coupontype == 2) {
    // Specific Category
    if (voucher.applyto == "specific-category") {
      // Set variable values
      categoryid = voucher.categorymask;
      percent = voucher.percent;
      affectedProducts = 0;

      // Loop for product
      for (let i = 0; i < shoppingCart.length; i++) {
        if (
          (typeof shoppingCart[i].specialoffer === "undefined" ||
            shoppingCart[i].specialoffer === null) &&
          shoppingCart[i].catmask == categoryid
        ) {
          newprice = ((100 - percent) / 100) * shoppingCart[i].price; // Compute new price
          shoppingCart[i].couponprice = newprice; // Set new price
          affectedProducts++; // Increment affected
        }
      }

      //Calculate subtotal cost and total items in cart
      subTotalCost = shoppingCart.reduce((acc, cur) => {
        const currentPrice = cur.specialoffer
          ? cur.offerprice * cur.quantity
          : cur.couponprice * cur.quantity;

        const total = acc + currentPrice;
        return total;
      }, 0);

      // Affected
      if (affectedProducts) {
        store.state.vouchercode = voucher.code; // Set voucher code
        return {
          status: 200,
          msg: "Voucher code applied successfully - Percent category",
          subtotal: parseFloat(subTotalCost)
        };
      } else {
        return {
          status: 400,
          msg: "Voucher code not valid for products in your cart"
        };
      }
    }

    // Specific Category
    if (voucher.applyto == "specific-subcategory") {
      // Set variable values
      subcategoryid = voucher.subcategorymask;
      percent = voucher.percent;
      affectedProducts = 0;

      // Loop for product
      for (let i = 0; i < shoppingCart.length; i++) {
        if (
          (typeof shoppingCart[i].specialoffer === "undefined" ||
            shoppingCart[i].specialoffer === null) &&
          shoppingCart[i].submask == subcategoryid
        ) {
          newprice = ((100 - percent) / 100) * shoppingCart[i].price; // Compute new price
          shoppingCart[i].couponprice = newprice; // Set new price
          affectedProducts++; // Increment affected
        }
      }

      //Calculate subtotal cost and total items in cart
      subTotalCost = shoppingCart.reduce((acc, cur) => {
        const currentPrice = cur.specialoffer
          ? cur.offerprice * cur.quantity
          : cur.couponprice * cur.quantity;

        const total = acc + currentPrice;
        return total;
      }, 0);

      // Affected
      if (affectedProducts) {
        store.state.vouchercode = voucher.code; // Set voucher code
        return {
          status: 200,
          msg: "Voucher code applied successfully - Percent subcategory",
          subtotal: parseFloat(subTotalCost)
        };
      } else {
        return {
          status: 400,
          msg: "Voucher code not valid for products in your cart"
        };
      }
    }

    // minimum-subtotal
    if (voucher.applyto == "minimum-subtotal") {
      if (store.state.subtotalprice >= voucher.subtotal) {
        percent = voucher.percent;
        amount = ((100 - percent) / 100) * store.state.subtotalprice;
        store.state.vouchercode = voucher.code; // Set voucher code

        return {
          status: 200,
          msg: "Voucher code applied successfully - Percent minimum",
          subtotal: parseFloat(amount)
        };
      } else {
        return {
          status: 400,
          msg: `This promo code is applicable to orders from AED ${
            voucher.subtotal
            }`
        };
      }
    }
  }

  // Free shipping
  if (voucher.coupontype == 3) {
    // all orders
    if (voucher.applyto == "all-orders") {
      store.state.vouchercode = voucher.code; // Set voucher code
      return {
        status: 200,
        msg: "Voucher code applied successfully - Shipping all",
        shipping: 0
      };
    }

    //minimum subtotal
    if (voucher.applyto == "minimum-subtotal") {
      if (store.state.subtotalprice >= voucher.subtotal) {
        store.state.vouchercode = voucher.code; // Set voucher code
        return {
          status: 200,
          msg: "Voucher code applied successfully - Shipping minimum",
          shipping: 0
        };
      } else {
        return {
          status: 400,
          msg: `This promo code is applicable to orders from AED ${
            voucher.subtotal
            }`
        };
      }
    }
  }
};

export default voucherValidator;
