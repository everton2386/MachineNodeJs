document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
       window.location.href = "/login";
      } else {
        const errorMessage = data.message;
        document.getElementById("error-message").textContent = errorMessage;
        document.getElementById("error-container").classList.remove("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  });