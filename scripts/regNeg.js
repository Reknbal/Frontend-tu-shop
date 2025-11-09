//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//ACÁ VA A IR EL MÉTODO PARA REGISTRO DE NEGOCIOS
const API_URL = "http://localhost:8000/tareas";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

//REGISTRO: DATOS NEGOCIOS
//AGREGAR REDES SOCIALES SÓLO SI TIENE MEMBRESÍA
//
