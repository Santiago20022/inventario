const http = axios; // Axios es una libreria que me permite hacer peticiones al API, es decir a inventario_api

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
 * getRol
 * Obtiene solo un rol de la base de datos
 */
 async function getRol() {
  const id = params.id
  if (id) {
    try {
      const result = await http.get(`http://localhost:3000/api/rol/${id}`)
      const rol = result.data
      document.getElementById("nombre").value = rol.nombre
      document.getElementById("descripcion").value = rol.descripcion
    } catch (error) {
      console.log(error)
      alert("Hubo un error trayendo un rol, por favor intente mas tarde")
    }
    return
  }
  window.location.href='index.html'
}

/**
 * updateRol
 * Funcion que actualiza los datos de un rol. Es el mismo saveRol para se le envia el ID del rol
 */
async function updateRol() {
  const id = params.id

  if (id) {
    const nombreInput = document.getElementById("nombre")
    const descriptionInput = document.getElementById("descripcion")
    const nombre = nombreInput.value
    const descripcion = descriptionInput.value

    try {
      const result = await http.post('http://localhost:3000/api/create/rol', {
        id,
        nombre,
        descripcion
      })
      
      /**
       * 200: Todo salio bien y la marca se creo
       * 500: Hubo un error de servidor en inventario_api
       * 400: Posiblemente se enviaron mal los datos, es decir, en este caso por ejemplo se pudo no enviar algun campo de la tabla marca
       */
      if (result.status === 200) {
        alert("Rol actualizado correctamente")
      } else {
        alert("Hubo un error actualizando el rol, por favor intentalo de nuevo")
      }
    } catch(e) {
      console.error(e)
      alert("Hubo un error actualizando el rol, por favor intentalo de nuevo")
    }
  }
}

/**
 * deleteRol
 * Funcion que se encarga de borrar roles de la base de datos
 */
async function deleteRol(id) {
  try {
    await http.delete('http://localhost:3000/api/delete/rol', {
      data: {
        id
      }
    })
    alert("Rol borrado correctamente")
    document.location.reload()
  } catch (error) {
    console.log("Error borrando rol -->", error)
    alert("Hubo un error borrando el rol, por favor intente mas tarde")
  }
}

/**
 * getRoles
 * Funcion que se encarga de obtener todos los roles de la base de datos y listarlos en una tabla
 */
async function getRoles() {
  try {
    const result = await http.get('http://localhost:3000/api/roles')
    const tablaRoles = document.getElementById("roles")
    /**
     * 200: Todo salio bien y la marca se creo
     * 500: Hubo un error de servidor en inventario_api
     */
    if (result.status === 200) {
      const roles = result.data
      if (roles.length) {
        let html = ''
        for (let i = 0; i < roles.length; i++) {
          html += `
            <tr>
              <td>${roles[i].id}</td>
              <td>${roles[i].nombre}</td>
              <td>${roles[i].descripcion}</td>
              <td>
                <ion-icon name="search-outline" onclick="window.location.href='updateRol.html?id=${roles[i].id}'" class="table-actions"></ion-icon>
                <ion-icon name="trash-outline" onclick="deleteRol(${roles[i].id})" class="table-actions"></ion-icon>
              </td>
            </tr>
          `
        }
        tablaRoles.insertAdjacentHTML("beforeend", html)
        return
      }
      const html = `
        <tr>
          <td colspan="4">
            No hay registros de roles, cree uno <a href="./crearRol.html">aquí</a>
          </td>
        </tr>
      `
      tablaRoles.insertAdjacentHTML("beforeend", html)
    } else {
      alert("Hubo un error trayendo los roles, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando los roles, por favor intentalo de nuevo")
  }
}

/**
 * saveRol
 * Funcion que se encarga de guardar roles en la base de datos
 */
async function saveRol() {
  const nombreInput = document.getElementById("nombre")
  const descriptionInput = document.getElementById("descripcion")
  const nombre = nombreInput.value
  const descripcion = descriptionInput.value

  try {
    const result = await http.post('http://localhost:3000/api/create/rol', {
      nombre,
      descripcion
    })
    
    /**
     * 200: Todo salio bien y la marca se creo
     * 500: Hubo un error de servidor en inventario_api
     * 400: Posiblemente se enviaron mal los datos, es decir, en este caso por ejemplo se pudo no enviar algun campo de la tabla marca
     */
    if (result.status === 200) {
      nombreInput.value = ""
      descriptionInput.value = ""
      alert("Rol creado correctamente")
    } else {
      alert("Hubo un error creando el rol, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando el rol, por favor intentalo de nuevo")
  }
}