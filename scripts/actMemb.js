//HAY QUE PONER ESTO AL FINAL DE TODOS LOS .HTML <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

const API_URL = "http://localhost:8000";

axios.get(API_URL)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));


//VEO SI EL USUARIO TIENE MEMBRESÍA ACTIVA

export function usuarioTieneMembresia() {
  return localStorage.getItem("membresia") === "1"; // 1 = activa
}

export function habilitarRedesSiCorresponde() {
  const tiene = usuarioTieneMembresia();
  const inputsRedes = document.querySelectorAll(".input-red-social");
  const msg = document.getElementById("mensajeRedes");

  inputsRedes.forEach(input => {
    input.disabled = !tiene;
  });

  if (!tiene) {
    msg.textContent = "Para agregar redes sociales, activá tu membresía premium.";
  } else {
    msg.textContent = "";
  }
}

//Guardar pago y activar membresía
async function activarMembresia(metodo,monto) {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!token|| !usuario){
        alert("Debes iniciar sesión para activar una membresía");
        return;
    }

    const pagoInfo = {
        usuario_id: usuario.id,
        metodo,
        monto,
    };

    try {
        const res = await axios.post('${API_URL}/pagos/${usuario.email}',pagoInfo, {
            headers: {Authorization: 'Bearer ${token}'},
        });

        alert("¡Bienvenido a nuestra familia Premium!");
        console.log(res.data);

        //Se actualiza el localStorage
        localStorage.setItem("membresia", "1");
        habilitarRedesSiCorresponde();
    } catch (error) {
        console.error("Error al activar membresía", error);
        alert("Se ha producido un error.");
    }
}