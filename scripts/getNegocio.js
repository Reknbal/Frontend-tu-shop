//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//ACÁ VAN A IR LOS TRES MÉTODOS PARA TRAER LOS NEGOCIOS
const API_URL = "http://localhost:8000/tareas";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));


//POR CATEGORÍA: RESULTADO 1

//POR NOMBRE: RESULTADO 2

//POR MEMBRESÍA: LO QUE VA EN EL CARRUSEL (INDEX)
//