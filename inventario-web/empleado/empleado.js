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
 * deleteEmpleado
 * Funcion para eliminar un empleado de la base de datos
 */
async function deleteEmpleado(id) {
  try {
    await http.delete('http://localhost:3000/api/delete/empleado', {
      data: {
        id
      }
    })
    alert("Empleado borrado correctamente")
    window.location.reload()
  } catch (error) {
    console.log("Error borrando empleadp -->", error)
    alert("Hubo un error borrando el empleado, por favor intente mas tarde")
  }
}

/**
 * getRoles
 * Funcion para traer todos los roles y ponerlos en un select de html
 */
async function getRoles() {
  try {
    const result = await http.get('http://localhost:3000/api/roles')
    const rolesSelect = document.getElementById("roles")
    /**
     * 200: Todo salio bien y el rol se creo
     * 500: Hubo un error de servidor en inventario_api
     */
     if (result.status === 200) {
      const roles = result.data
      if (roles.length) {
        let html = `
          <option value="">Seleccione un Rol</option>
        `
        for (let i = 0; i < roles.length; i++) {
          html = `
            ${html}
            <option value="${roles[i].id}">${roles[i].nombre}</option>
          `
          rolesSelect.insertAdjacentHTML("beforeend", html)
        }
        return
      }
      const html = `
        <option>No hay roles creados, cree uno antes de crear un empleado</option>
      `
      rolesSelect.insertAdjacentHTML("beforeend", html)
    }
  } catch(error) {
    console.log(error)
    alert("Error trayendo roles, por favor intente de nuevo")
  }
}

/**
 * getEmpleado
 * Obtiene solo un empleado de la base de datos
 */
async function getEmpleado() {
  const id = params.id
  if (id) {
    try {
      const result = await http.get(`http://localhost:3000/api/empleado/${id}`)
      const empleado = result.data
      document.getElementById("roles").value = empleado.rolId
      document.getElementById("cedula").value = empleado.cedula
      document.getElementById("nombre").value = empleado.nombre
      document.getElementById("apellido").value = empleado.apellido
      document.getElementById("direccion").value = empleado.direccion
      document.getElementById("email").value = empleado.email
    } catch (error) {
      console.log(error)
      alert("Hubo un error trayendo el empleado, por favor intente mas tarde")
    }
    return
  }
  window.location.href='index.html'
}

/**
 * getEmpleados
 * Funcion que retorna todos los empleados con sus roles y los pinta en una tabla
 */
async function getEmpleados() {
  try {
    const result = await http.get('http://localhost:3000/api/empleados')
    const tablaEmpleados = document.getElementById("empleados")
    /**
     * 200: Todo salio bien y la marca se creo
     * 500: Hubo un error de servidor en inventario_api
     */
    if (result.status === 200) {
      const empleados = result.data
      if (empleados.length) {
        let html = ''
        for (let i = 0; i < empleados.length; i++) {
          html += `
            <tr>
              <td>${empleados[i].id}</td>
              <td>${empleados[i].cedula}</td>
              <td>${empleados[i].nombre} ${empleados[i].apellido}</td>
              <td>${empleados[i].direccion}</td>
              <td>${empleados[i].email}</td>
              <td>${empleados[i].rol}</td>
              <td>
                <ion-icon name="search-outline" onclick="window.location.href='updateEmpleado.html?id=${empleados[i].id}'" class="table-actions"></ion-icon>
                <ion-icon name="trash-outline" onclick="deleteEmpleado(${empleados[i].id})" class="table-actions"></ion-icon>
              </td>
            </tr>
          `
        }
        tablaEmpleados.insertAdjacentHTML("beforeend", html)
        return
      }
      const html = `
        <tr>
          <td colspan="8">
            No hay registros de empleados, cree uno <a href="./crearEmpleado.html">aquí</a>
          </td>
        </tr>
      `
      tablaEmpleados.insertAdjacentHTML("beforeend", html)
    } else {
      alert("Hubo un error obteniendo los empleados, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error obteniendo los empleados, por favor intentalo de nuevo")
  }
}

/**
 * updateEmpleado
 * Función para actualizar un empleado
 */
async function updateEmpleado() {
  const id = params.id

  if (id) {
    const rolesSelect = document.getElementById("roles")
    const cedulaInput = document.getElementById("cedula")
    const nombreInput = document.getElementById("nombre")
    const apellidoInput = document.getElementById("apellido")
    const direccionInput = document.getElementById("direccion")
    const emailInput = document.getElementById("email")

    const rolId = rolesSelect.value
    const cedula = cedulaInput.value
    const nombre = nombreInput.value
    const apellido = apellidoInput.value
    const direccion = direccionInput.value
    const email = emailInput.value

    try {
      const result = await http.post('http://localhost:3000/api/create/empleado', {
        id,
        rolId,
        cedula,
        nombre,
        apellido,
        direccion,
        email
      })

      if (result.status === 200) {
        alert("Empleado actualizado correctamente")
      } else {
        alert("Hubo un error actualizando un empleado, por favor intentalo de nuevo")
      }
    } catch(e) {
      console.error(e)
      alert("Hubo un error actualizando un empleado, por favor intentalo de nuevo")
    }
  }
}

/**
 * saveEmpleado
 * Función para para crear registros de empleados en la base de datos.
 */
 async function saveEmpleado() {
  const rolesSelect = document.getElementById("roles")
  const cedulaInput = document.getElementById("cedula")
  const nombreInput = document.getElementById("nombre")
  const apellidoInput = document.getElementById("apellido")
  const direccionInput = document.getElementById("direccion")
  const emailInput = document.getElementById("email")
  const claveInput = document.getElementById("clave")

  const rolId = rolesSelect.value
  const cedula = cedulaInput.value
  const nombre = nombreInput.value
  const apellido = apellidoInput.value
  const direccion = direccionInput.value
  const email = emailInput.value
  const clave = claveInput.value

  try {
    const result = await http.post('http://localhost:3000/api/create/empleado', {
      rolId,
      cedula,
      nombre,
      apellido,
      direccion,
      email,
      clave
    })

    if (result.status === 200) {
      cedulaInput.value = ""
      nombreInput.value = ""
      apellidoInput.value = ""
      direccionInput.value = ""
      emailInput.value = ""
      claveInput.value = ""
      alert("Empleado creado correctamente")
    } else {
      alert("Hubo un error creando un empleado, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando un empleado, por favor intentalo de nuevo")
  }
}
