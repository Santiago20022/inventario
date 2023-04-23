const http = axios;

async function saveProveedor() {
  const direccionInput = document.getElementById("direccion")
  const nombreInput = document.getElementById("nombre")
  const telefonoInput = document.getElementById("telefono")
  const emailInput = document.getElementById("email")
  const direccion = direccionInput.value
  const nombre = nombreInput.value
  const telefono = telefonoInput.value
  const email = emailInput.value

  try {
    const result = await http.post('http://localhost:3000/api/create/proveedor', {
      nombre,
      direccion,
      telefono,
      email
    })

    if (result.status === 200) {
      nombreInput.value = ""
      direccionInput.value = ""
      telefonoInput.value = ""
      emailInput.value = ""
      alert("Proveedor creada correctamente")
    } else {
      alert("Hubo un error creando un proveedor, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando un proveedor, por favor intentalo de nuevo")
  }
}