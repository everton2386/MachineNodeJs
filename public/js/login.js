document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data["x-access-token"])
        window.location.href = "/";
      } else {
        const errorMessage = data.message;
        document.getElementById("error-message").textContent = errorMessage;
        document.getElementById("error-container").classList.remove("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  });