const order = {
  customer: "Ada",
  item: "Jollof Rice",
  quantity: 2,
};

// FE(Client)---->(rq) <---- Async(takes request) ----> BE(business logic) (Works on it) <----DB---->
const placeOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const restaurant = {
        isOpen: true,
        availableItems: ["Jollof Rice", "Fried Rice"],
      };

      if (!restaurant.isOpen) {
        // add return here
        reject(new Error("Restaurant Is Closed"));
      }

      const itemAvailable = restaurant.availableItems.includes(order.item);

      if (!itemAvailable) {
        // add return here
        reject(new Error(`${order.item} is unavailable`));
      }

      resolve({
        id: Date.now(),
        ...order, // destructuring
        status: "confirmed",
      });
    }, 1500);
  });
};

// middleware
// placeOrder(order)
//   .then((confirmedOrder) => {
//     console.log("Confirmed", confirmedOrder);
//   })
//   .catch((error) => {
//     console.error("Failed", error.message);
//   });

// Checkout - {}
// const checkout = async () => {
//   try {
//     const confirmedOrder = await placeOrder(order);
//     console.log(`Confirmed ${confirmedOrder.id} order`);
//     // console.log(confirmedOrder, `confirmed`);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// checkout();

const checkout = async () => {
  try {
    const confirmedOrder = await placeOrder(order);

    console.log("Confirmed", confirmedOrder);
  } catch (error) {
    console.error("Failed", error.message);
  }
};

checkout();
