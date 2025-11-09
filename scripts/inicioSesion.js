//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

const API_URL = "http://localhost:8000/tareas";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

//ACÁ VA EL INICIO DE SESIÓN CON EL LOCALSTORAGE Y EL TOKEN
//