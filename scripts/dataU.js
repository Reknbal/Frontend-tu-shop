//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

//ACÁ VAN A IR LOS MÉTODOS PARA LA MANIPULACIÓN DE DATOS DEL USUARIO
const API_URL = "http://localhost:8000";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

//CAMBIAR DATOS GENERALES

async function actualizarUsu(email, datosAct) {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.put(
      `http://localhost:8000/tiendas/${email}`,
      datosAct,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Datos actualizados correctamente', res.data);
    return res.data;

  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error('Error de conexión', error.message);
    }

  }
}

document.getElementById('formAct').addEventListener('submit',async (e) => {
  e.preventDefault();

  const email = localStorage.getItem('email');

  const datos = {
    dni_usuario: document.getElementById('dni').value,
    nom_usuario: document.getElementById('nombreUsuario').value,
    nombreCompleto: document.getElementById('nombreCompleto').value,
    num_telefono: document.getElementById('telefono').value
  };

  await actualizarUsu(email,datos);
})

//CAMBIAR CONTRASEÑA

async function cambiarContra(email,contraAct,nuevaContra) {
  const token = localStorage.getItem('token');

  try {
    const dato = {
      actualPass: contraAct,
      newPass: nuevaContra
    };

    const res = await axios.patch(
      `http://localhost:8000/tiendas/${email}`,
      dato,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Contraseña cambiada correctamente',res.data);
    alert('Se ha cambiado la contraseña correctamente');
    return res.data;
  } catch (error) {
    if(error.response){
      alert('Error en el servidor: ${error.response.data}');
    }else{
      alert('Error de conexión: ${error.message}');
    }
  }
}

//ELIMINAR USUARIO

async function eliminarUsu(email) {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.delete(
      `http://localhost:8000/tiendas/${email}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Usuario eliminado correctamente', res.data);
    alert('Tu cuenta ha sido eliminada correctamente');

    //Se cierra sesión automáticamente
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/index.html';
    return res.data;
  } catch (error) {
    if(error.response){
      alert('Error del servidor: ${error.response.data}');
    }else{
      alert('Error de conexión: ${error.message}');
    }
  }

  //Botón
  document.getElementById('btnEliminar').addEventListener('click', async () => {
    const email = localStorage.getItem('email');
    await eliminarUsu(email);
  });
}