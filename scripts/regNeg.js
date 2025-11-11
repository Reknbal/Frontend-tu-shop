//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//ACÁ VA A IR EL MÉTODO PARA REGISTRO DE NEGOCIOS
import { usuarioTieneMembresia, habilitarRedesSiCorresponde } from "./membresia.js";
const API_URL_NEGOCIOS = "http://localhost:8000/tiendas";
const API_URL_CATEGORIAS = "http://localhost:8000/categorias";
const API_BASE = "http://localhost:8000";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

//REGISTRO: DATOS NEGOCIOS
//AGREGAR REDES SOCIALES SÓLO SI TIENE MEMBRESÍA
//


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regNegocio");
  const categSelect = document.getElementById("categoria");

 

  //CARGO CATEGORÍAS PRIMERO
  async function cargarCategorias() {
    try {
      const res = await axios.get(API_URL_CATEGORIAS);
      const categorias = res.data;

      // Limpio y agrego opción por defecto
      categSelect.innerHTML = '<option value="">Seleccionar categoría</option>';

      
      categorias.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.nombre;
        categSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  }

  cargarCategorias();
  //Se habilitan las redes según membresía
  habilitarRedesSiCorresponde();

  //CARGO IMAGEN
  async function subirImagenACloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TU_UPLOAD_PRESET"); // Cambiar

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload", // Cambiar
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Error al subir imagen a Cloudinary:", err);
      return null;
    }
  }

  // SUBMIT
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para registrar un negocio.");
      return;
    }

    const negocio = document.getElementById("negocio").value;
    const descripcion = document.getElementById("descripNeg").value;
    const imagenFile = document.getElementById("imagen").files[0];
    const direcNegocio = document.getElementById("direcNegocio").value;
    const categoria = categSelect.value;

    // Subo imagen si existe
    let imagenURL = null;
    if (imagenFile) {
      imagenURL = await subirImagenACloudinary(imagenFile);
    }

    //Si tiene membresía, agregamos redes
    let redes = null;
    if (usuarioTieneMembresia()) {
        redes = {
        instagram: document.getElementById("instagram").value,
        facebook: document.getElementById("facebook").value,
        tiktok: document.getElementById("tiktok").value,
        };
    }

    
    const nuevoNegocio = {
      nombre: negocio,
      descripcion,
      direccion: direcNegocio,
      categoria_id: categoria,
      imagen: imagenURL,
      redes //de no tener membresía, queda nulo
    };

    try {
      const res = await axios.post(API_URL_NEGOCIOS, nuevoNegocio, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      alert("Negocio registrado con éxito");
      console.log("Respuesta del servidor:", res.data);
      form.reset();
    } catch (error) {
      console.error("Error al registrar el negocio:", error);
      alert("Ocurrió un error al registrar el negocio");
    }
  });
});

