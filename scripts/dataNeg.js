//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//ACÁ VAN A IR LOS MÉTODOS PARA LA MANIPULACIÓN DE DATOS
const API_URL = "http://localhost:8000/tareas";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

//MODIFICAR DATOS

//ELIMINAR
//