const http = axios;

/**
 * deleteProveedor
 * Funcion que se encarga de borrar proveedores de la base de datos
 */
 async function deleteProveedor(id) {
  try {
    await http.delete('http://localhost:3000/api/delete/proveedor', {
      data: {
        id
      }
    })
    alert("Proveedor borrado correctamente")
    document.location.reload()
  } catch (error) {
    console.log("Error borrando proveedor -->", error)
    alert("Hubo un error borrando el proveedor, por favor intente mas tarde")
  }
}

/**
 * getProveedores
 * Funcion que obtiene todos los proveedores de la base de datos y los lista en una tabla
 */
async function getProveedores() {
  try {
    const result = await http.get('http://localhost:3000/api/proveedores')
    const tablaProveedores = document.getElementById("proveedores")
    /**
     * 200: Todo salio bien y la marca se creo
     * 500: Hubo un error de servidor en inventario_api
     */
    if (result.status === 200) {
      const proveedores = result.data
      if (proveedores.length) {
        let html = ''
        for (let i = 0; i < proveedores.length; i++) {
          html += `
            <tr>
              <td>${proveedores[i].id}</td>
              <td>${proveedores[i].nombre}</td>
              <td>${proveedores[i].direccion}</td>
              <td>${proveedores[i].telefono}</td>
              <td>${proveedores[i].email}</td>
              <td>
                <ion-icon name="search-outline" onclick="window.location.href='updateProveedor.html?id=${proveedores[i].id}'" class="table-actions"></ion-icon>
                <ion-icon name="trash-outline" onclick="deleteProveedor(${proveedores[i].id})" class="table-actions"></ion-icon>
              </td>
            </tr>
          `
        }
        tablaProveedores.insertAdjacentHTML("beforeend", html)
        return
      }
      const html = `
        <tr>
          <td colspan="6">
            No hay registros de proveedores, cree uno <a href="./crearProveedor.html">aquí</a>
          </td>
        </tr>
      `
      tablaProveedores.insertAdjacentHTML("beforeend", html)
    } else {
      alert("Hubo un error obteniendo los proveedores, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error obteniendo los proveedores, por favor intentalo de nuevo")
  }
}


/**
 * saveProveedor
 * Función para para crear registros de proveedores en la base de datos.
 */
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