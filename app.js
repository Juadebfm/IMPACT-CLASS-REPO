const loginForm = document.querySelector("#loginForm");
const loginSection = document.querySelector("#loginSection");
const dashboard = document.querySelector("#dashboard");
const message = document.querySelector("#message");
const welcome = document.querySelector("#welcome");
const productContainer = document.querySelector("#productContainer");

// API URL
const API_URL = "https://dummyjson.com";

// Function to get products from the api
const getProducts = async () => {
  try {
    // Await here so the function waits or pauses un til the fetch comes back with response
    const response = await fetch(`${API_URL}/products`);

    // we ensure that there are no mistakes
    const data = await response.json();

    // Assume that we have the data data.products
    data.products.forEach((product) => {
      const productCard = document.createElement("div");

      productCard.innerHTML = `
      <h3>${product.title}</h3>

    <img src="${product.thumbnail}" width="120" alt="${product.title}" />

        <p>$${product.price}</p>
      `;

      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.log(error);
  }
};

// function that helps display by showing the dashboard section
const showDashboard = (user) => {
  // Hide login
  loginSection.hidden = true;

  // show dashboard
  dashboard.hidden = false;

  // We display info (success or failure) from the backend
  welcome.textContent = `Welcome, ${user.firstName}`;

  // Get actual product to be displayed in the dashboard immediately it shows

  getProducts();
};

// function that listens for or ensures execution of the login/ form submission

loginForm.addEventListener("submit", async (event) => {
  // forms refreshes itself, we use preventDefault()

  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // give the user a feedback while waitinf for the api response

  message.textContent = "Logging In ....";

  try {
  } catch (error) {}
});
