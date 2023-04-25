const http = axios;

/**
 * Con esta linea se obtiene parametros de una URL, por ejemplo:
 * localhost/empleado?id=1
 * El parametro de la url es id y su valor es 1, para obtenerlos hacemos
 * const value = params.id; // "1"
 */
 const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

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
 * getProveedor
 * Obtiene solo un proveedor de la base de datos
 */
 async function getProveedor() {
  const id = params.id
  if (id) {
    try {
      const result = await http.get(`http://localhost:3000/api/proveedor/${id}`)
      const proveedor = result.data
      document.getElementById("direccion").value = proveedor.direccion
      document.getElementById("nombre").value = proveedor.nombre
      document.getElementById("telefono").value = proveedor.telefono
      document.getElementById("email").value = proveedor.email
    } catch (error) {
      console.log(error)
      alert("Hubo un error trayendo un proveedor, por favor intente mas tarde")
    }
    return
  }
  window.location.href='index.html'
}

/**
 * updateProveedor
 * Funcion que actualiza los datos de un proveedor. Es el mismo saveProveedor para se le envia el ID del proveedor
 */
async function updateProveedor() {
  const id = params.id

  if(id) {
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
        id,
        nombre,
        direccion,
        telefono,
        email
      })

      if (result.status === 200) {
        alert("Proveedor actualizado correctamente")
      } else {
        alert("Hubo un error actualizando un proveedor, por favor intentalo de nuevo")
      }
    } catch(e) {
      console.error(e)
      alert("Hubo un error actualizando un proveedor, por favor intentalo de nuevo")
    }
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
      alert("Proveedor creado correctamente")
    } else {
      alert("Hubo un error creando un proveedor, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando un proveedor, por favor intentalo de nuevo")
  }
}