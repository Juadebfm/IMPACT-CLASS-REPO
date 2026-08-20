// 1. Rewrite the function in a 3rd alternate way (not return or middleware)
// 2. ⁠Create a simple program similar to the example given

const product = {
  name: "iPhone",
  quantity: 1,
  version: "14 Pro Max",
  color: "Deep Purple",
};

const buyProduct = (product) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const store = {
        isOpen: true,
        products: ["iPhone", "Samsung", "Google Pixel"],
        versions: ["14 Pro Max", "13 Pro Max", "12 Pro Max"],
        colors: ["Deep Purple", "Midnight Blue", "Silver", "Gold"],
      };

      if (!store.isOpen) {
        return reject(new Error("The store is closed"));
      }

      const productAvailable = store.products.includes(product.name);
      if (!productAvailable) {
        return reject(new Error(`${product.name} is not available`));
      }

      const versionAvailable = store.versions.includes(product.version);
      if (!versionAvailable) {
        return reject(new Error(`${product.version} is not available`));
      }

      const colorAvailable = store.colors.includes(product.color);
      if (!colorAvailable) {
        return reject(new Error(`${product.color} is not available`));
      }

      resolve({
        orderId: Date.now(),
        ...product,
        status: "Purchase successful",
      });
    }, 2000);
  });
};

const checkoutProduct = async () => {
  try {
    const result = await buyProduct(product);

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

checkoutProduct();

// const buyProduct = (product) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const store = {
//         isOpen: true,
//         products: ["iPhone", "Samsung", "Google Pixel"],
//         versions: ["14 Pro Max", "13 Pro Max", "12 Pro Max"],
//         colors: ["Deep Purple", "Midnight Blue", "Silver", "Gold"],
//       };

//       if (!store.isOpen) {
//         reject(new Error("The store is closed"));
//       } else {
//         const productAvailable = store.products.includes(product.name);

//         if (!productAvailable) {
//           reject(new Error(`${product.name} is not available`));
//         } else {
//           const versionAvailable = store.versions.includes(product.version);

//           if (!versionAvailable) {
//             reject(new Error(`${product.version} is not available`));
//           } else {
//             const colorAvailable = store.colors.includes(product.color);

//             if (!colorAvailable) {
//               reject(new Error(`${product.color} is not available`));
//             } else {
//               resolve({
//                 orderId: Date.now(),
//                 ...product,
//                 status: "Purchase successful",
//               });
//             }
//           }
//         }
//       }
//     }, 2000);
//   });
// };
