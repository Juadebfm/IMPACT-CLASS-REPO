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
        availableItems: ["meat", "Fried Rice"],
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

// const checkout = async () => {
//   try {
//     const confirmedOrder = await placeOrder(order);

//     console.log("Confirmed", confirmedOrder);
//   } catch (error) {
//     console.error("Failed", error.message);
//   }
// };

// checkout();

const checkout = async () => {
  const confirmedOrder = await placeOrder(order).catch((err) => {
    console.error(err.message);
    return null; // prevent the function from crashing || herehrhehrherherh
  });

  if (!confirmedOrder) return;

  console.log(confirmedOrder);
};

checkout();
