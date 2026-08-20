const loginForm = document.querySelector("#loginForm");
const loginSection = document.querySelector("#loginSection");
const dashboard = document.querySelector("#dashboard");
const message = document.querySelector("#message");
const welcome = document.querySelector("#welcome");
const productContainer = document.querySelector("#productContainer");
const logoutBtn = document.getElementById("logoutBtn");

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

      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <div class="product-image">
          <img 
            src="${product.thumbnail}" 
            alt="${product.title}" 
          />
        </div>

        <div class="product-info">
          <span class="product-category">
            ${product.category}
          </span>

          <h3>${product.title}</h3>

          <p class="product-description">
            ${product.description}
          </p>

          <h2 class="product-price">
            $${product.price}
          </h2>

          <div class="product-details">
            <p>
              <strong>Brand:</strong> ${product.brand}
            </p>

            <p>
              <strong>Availability:</strong> 
              ${product.availabilityStatus}
            </p>

            <p>
              <strong>Return Policy:</strong> 
              ${product.returnPolicy}
            </p>
          </div>

          <button class="product-btn">
            View Product
          </button>
        </div>
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

// function that listens for or ensures execution of the login / form submission
loginForm.addEventListener("submit", async (event) => {
  // forms refreshes itself, we use preventDefault()
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Check and validate the info
  // Make sure both fields have values
  if (!username || !password) {
    message.textContent = "Please fill in all fields";

    return;
  }

  // Username should not be too short
  if (username.length < 3 || username.length > 10) {
    message.textContent = "Username must not be greater than 10 or less than 3";

    return;
  }

  // Password should not be too short
  if (password.length < 6 || password.length > 10) {
    message.textContent = "Password must not be greater than 10 or less than 6";

    return;
  }

  // give the user a feedback while waitinf for the api response
  message.textContent = "Logging In ....";

  // request object
  const reqObj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    // the actual data we want to send to the BE has to be converted to JSON and we do that by stringifying the object? what object? the body of the request.
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  try {
    // Send the username and password to the dummyJSON login endpoint - HTTP: POST
    const response = await fetch(`${API_URL}/auth/login`, reqObj);

    // If something goes wrong for the response
    if (!response.ok) {
      throw new Error("Invalid Login");
    }

    // When something goes right and we have the user
    const user = await response.json();

    // dummy to return a access token
    localStorage.setItem("token", user.accessToken);

    // save the user's name
    localStorage.setItem("firstName", user.firstName);

    // Clear off the message
    message.textContent = "";

    // Login is successful now, so we can show dashboard
    showDashboard(user);
  } catch (error) {
    message.textContent = "Invalid Credentials";

    console.log(error);
  }
});

// logout function
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("firstName");

  // hide dashboard
  dashboard.hidden = true;

  // show login
  loginSection.hidden = false;

  // remove the products currently showing
  productContainer.innerHTML = "";
});

// Persist login
const persistLogin = () => {
  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");

  // Simple check
  if (token && firstName) {
    loginSection.hidden = true;
    dashboard.hidden = false;

    welcome.textContent = `Welcome ${firstName}`;

    getProducts();
  }
};

persistLogin();
