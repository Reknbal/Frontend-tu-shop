//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

const API_URL = "http://localhost:8000";

// Manejo del formulario de inicio de sesión
document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // Enviamos los datos al backend
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });

    const data = res.data;

    if (data.error) {
      alert(data.error);
      return;
    }

    // Guardamos el token y los datos del usuario
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    alert("Inicio de sesión exitoso.");

    // Redirigir al index
    window.location.href = "index.html";

  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    alert("Error al iniciar sesión. Verificá tus datos o intentá de nuevo.");
  }
});
