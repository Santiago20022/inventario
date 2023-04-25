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
 * getMarca
 * Obtiene solo una marca de la base de datos
 */
 async function getMarca() {
  const id = params.id
  if (id) {
    try {
      const result = await http.get(`http://localhost:3000/api/marca/${id}`)
      const marca = result.data
      document.getElementById("nombre").value = marca.nombre
      document.getElementById("descripcion").value = marca.description
    } catch (error) {
      console.log(error)
      alert("Hubo un error trayendo una marca, por favor intente mas tarde")
    }
    return
  }
  window.location.href='index.html'
}

/**
 * updateMarca
 * Funcion que actualiza los datos de una marca. Es el mismo saveMarca para se le envia el ID de la marca
 */
async function updateMarca() {
  const id = params.id

  if (id) {
    const nombreInput = document.getElementById("nombre")
    const descriptionInput = document.getElementById("descripcion")
    const nombre = nombreInput.value
    const description = descriptionInput.value

    try {
      const result = await http.post('http://localhost:3000/api/create/marca', {
        id,
        nombre,
        description
      })
      
      /**
       * 200: Todo salio bien y la marca se creo
       * 500: Hubo un error de servidor en inventario_api
       * 400: Posiblemente se enviaron mal los datos, es decir, en este caso por ejemplo se pudo no enviar algun campo de la tabla marca
       */
      if (result.status === 200) {
        alert("Marca actualizada correctamente")
      } else {
        alert("Hubo un error actualizando la marca, por favor intentalo de nuevo")
      }
    } catch(e) {
      console.error(e)
      alert("Hubo un error actualizando la marca, por favor intentalo de nuevo")
    }
  }
}

/**
 * deleteMarca
 * Funcion que se encarga de borrar marcas de las base de datos
 */
async function deleteMarca(id) {
  try {
    await http.delete('http://localhost:3000/api/delete/marca', {
      data: {
        id
      }
    })
    alert("Marca borrada correctamente")
    document.location.reload()
  } catch (error) {
    console.log("Error borrando marca -->", error)
    alert("Hubo un error borrando la marca, por favor intente mas tarde")
  }
}

async function getMarcas() {
  try {
    const result = await http.get('http://localhost:3000/api/marcas')
    const tablaMarca = document.getElementById("marcas")
    /**
     * 200: Todo salio bien y la marca se creo
     * 500: Hubo un error de servidor en inventario_api
     */
    if (result.status === 200) {
      const marcas = result.data
      if (marcas.length) {
        let html = ''
        for (let i = 0; i < marcas.length; i++) {
          html += `
            <tr>
              <td>${marcas[i].id}</td>
              <td>${marcas[i].nombre}</td>
              <td>${marcas[i].description}</td>
              <td>
                <ion-icon name="search-outline" onclick="window.location.href='updateMarca.html?id=${marcas[i].id}'" class="table-actions"></ion-icon>
                <ion-icon name="trash-outline" onclick="deleteMarca(${marcas[i].id})" class="table-actions"></ion-icon>
              </td>
            </tr>
          `
        }
        tablaMarca.insertAdjacentHTML("beforeend", html)
        return
      }
      const html = `
        <tr>
          <td colspan="4">
            No hay registros de marcas, cree uno <a href="./crearMarca.html">aquí</a>
          </td>
        </tr>
      `
      tablaMarca.insertAdjacentHTML("beforeend", html)
    } else {
      alert("Hubo un error trayendo la marca, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando la marca, por favor intentalo de nuevo")
  }
}

async function saveMarca() {
  const nombreInput = document.getElementById("nombre")
  const descriptionInput = document.getElementById("descripcion")
  const nombre = nombreInput.value
  const description = descriptionInput.value

  try {
    const result = await http.post('http://localhost:3000/api/create/marca', {
      nombre,
      description
    })
    
    /**
     * 200: Todo salio bien y la marca se creo
     * 500: Hubo un error de servidor en inventario_api
     * 400: Posiblemente se enviaron mal los datos, es decir, en este caso por ejemplo se pudo no enviar algun campo de la tabla marca
     */
    if (result.status === 200) {
      nombreInput.value = ""
      descriptionInput.value = ""
      alert("Marca creada correctamente")
    } else {
      alert("Hubo un error creando la marca, por favor intentalo de nuevo")
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando la marca, por favor intentalo de nuevo")
  }
}