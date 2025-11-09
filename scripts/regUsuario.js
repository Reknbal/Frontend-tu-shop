//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//ACÁ VA A IR EL MÉTODO PARA EL REGISTRO DE USUARIO
const API_URL = "http://localhost:8000/tiendas";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

//

// === CREAR NUEVO USUARIO ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dni_usuario = document.getElementById("dni_usuario").value;
    const nombre = document.getElementById("nombre").value;
    const nombre_usuario = document.getElementById("nombre_usuario").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("contraseña").value;
    const num_telefono = document.getElementById("telefono").value;

    const nuevaTarea = {
      dni_usuario,
      nombre,
      nombre_usuario,
      email,
      password,
      num_telefono
    };

     try {
      const res = await axios.post(API_URL, createTiendas);
      console.log("Respuesta del servidor:", res.data);

      form.reset();
      cargarTareas();
    } catch (error) {
      console.error("Error al enviar tarea:", error);
      alert("Error al crear la tarea");
    }
  });


    