//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//ACÁ VAN A IR LOS TRES MÉTODOS PARA TRAER LOS NEGOCIOS
const API_URL_NOMB = "http://localhost:8000/tiendas/{nombre_negocio}";
const API_URL_CAT = "http://localhost:8000/tiendas/{categoria}";
axios.get(API_URL_CAT)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));


//POR CATEGORÍA: RESULTADO 1
const contenedorCAT = document.getElementById("list-cat");

async function cargarCategorias(categorias) {
  try {
    const res = await axios.get(API_URL_CAT)
    const negocio = res.data;
    
    contenedor.innerHTML = "";

  if (negocios.length > 0){
    negocios.forEach((negocios) => {
      const div = document.createElement("div");
      div.classList.add("negocios");
      div.innerHTML=`
      <h3>${negocios.nombre_negocio}</h3>
      <p>${negocios.descripcion}</p>
      ${negocios.imagen_neg ? `<img src="${negocios.imagen_neg}" width="150" > ` : ""}
      `;
      contenedorCAT.appendChild(div);
    });
  }else {
      contenedorCategoria.innerHTML = "<p>No se encontraron negocios en esta categoría.</p>";
    }
  } catch (error) {
    console.error("Error al buscar por categoría:", error);
    contenedorCategoria.innerHTML = "<p>Error al buscar negocios.</p>";
  }
}
  


// URL de tu endpoint (ajustá la ruta según tu backend real)

axios.get(API_URL_NOMB)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
// Contenedor donde se mostrarán los resultados
const contenedor = document.getElementById("list-Neg");

// Función para traer y mostrar negocios
async function cargarNegocioPorNombre(nombre) {
  try {
    const res = await axios.get(API_URL_NOMB);
    const negocios = res.data; // Supone que devuelve un array de objetos

    // Limpio el contenedor
    contenedor.innerHTML = "";

    // Busco el negocio que coincida con el nombre (ignorando mayúsculas/minúsculas)
    const negocio = negocios.find(n => n.nombre_negocio.toLowerCase() === nombre_negocio.toLowerCase());

    if (negocio) {
      // Creo el div del negocio
      const div = document.createElement("div");
      div.classList.add("negocio");
      div.innerHTML = `
        <h3>${negocio.nombre_negocio}</h3>
        <p>${negocio.descripcion}</p>
        <p><strong>Direccion:</strong> ${negocio.direccion}</p>
        ${negocio.imagen_neg ? `<img src="${negocio.imagen_neg}" width="150">` : ""}
      `;
      contenedor.appendChild(div);
    } else {
      contenedor.innerHTML = "<p>No se encontró ningún negocio con ese nombre.</p>";
    }

  } catch (error) {
    console.error("Error al cargar negocios:", error);
    contenedor.innerHTML = "<p>Error al cargar los negocios.</p>";
  }
}

// Llamo a la función cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
  cargarNegocioPorNombre(nombreBuscado);
});

// Llamo a la función cuando carga la página
document.addEventListener("DOMContentLoaded", cargarNegocios);

// Cargar categorías automáticamente al iniciar
cargarCategorias();



//POR MEMBRESÍA: LO QUE VA EN EL CARRUSEL (INDEX)
//