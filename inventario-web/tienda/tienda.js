const http = axios; // Axios es una libreria que me permite hacer peticiones al API, es decir a inventario_api

/**
 * deleteTienda
 * Funcion que se encarga de borrar tiendas de la base de datos
 */
 async function deleteTienda(id) {
  try {
    await http.delete('http://localhost:3000/api/delete/tienda', {
      data: {
        id
      }
    })
    alert("Tienda borrada correctamente")
    document.location.reload()
  } catch (error) {
    console.log("Error borrando tienda -->", error)
    alert("Hubo un error borrando la tienda, por favor intente mas tarde")
  }
}

/**
 * getTiendas
 * Funcion que se encarga de obtener todas la tiendas de la base de datos y listarlas en una tabla
 */
 async function getTiendas() {
    try {
      const result = await http.get('http://localhost:3000/api/tiendas')
      const tablaTiendas = document.getElementById("tiendas")
      /**
       * 200: Todo salio bien y la marca se creo
       * 500: Hubo un error de servidor en inventario_api
       */
      if (result.status === 200) {
        const tiendas = result.data
        if (tiendas.length) {
          let html = ''
          for (let i = 0; i < tiendas.length; i++) {
            html += `
              <tr>
                <td>${tiendas[i].id}</td>
                <td>${tiendas[i].razon_social}</td>
                <td>${tiendas[i].direccion}</td>
                <td>${tiendas[i].telefono}</td>
                <td>${tiendas[i].email}</td>
                <td>
                  <ion-icon name="search-outline" onclick="window.location.href='updateTienda.html?id=${tiendas[i].id}'"class="table-actions"></ion-icon>
                  <ion-icon name="trash-outline" onclick="deleteTienda(${tiendas[i].id})" class="table-actions"></ion-icon>
                </td>
              </tr>
            `
          }
          tablaTiendas.insertAdjacentHTML("beforeend", html)
          return
        }
        const html = `
          <tr>
            <td colspan="6">
              No hay registros de tiendas, cree uno <a href="./crearTienda.html">aquí</a>
            </td>
          </tr>
        `
        tablaTiendas.insertAdjacentHTML("beforeend", html)
      } else {
        alert("Hubo un error trayendo las tiendas, por favor intentalo de nuevo")
      }
    } catch(e) {
      console.error(e)
      alert("Hubo un error creando las tiendas, por favor intentalo de nuevo")
    }
  }

/**
 * saveTienda
 * Funcion que se encarga de guardar tiendas en la base de datos
 */
 async function saveTienda() {
    const razonSocialInput = document.getElementById("razon_social")
    const direccionInput = document.getElementById("direccion")
    const telefonoInput = document.getElementById("telefono")
    const emailInput = document.getElementById("email")
    const razon_social = razonSocialInput.value
    const direccion = direccionInput.value
    const telefono = telefonoInput.value
    const email = emailInput.value
  
    try {
      const result = await http.post('http://localhost:3000/api/create/tienda', {
        razon_social,
        direccion,
        telefono,
        email
      })
      
      /**
       * 200: Todo salio bien y la marca se creo
       * 500: Hubo un error de servidor en inventario_api
       * 400: Posiblemente se enviaron mal los datos, es decir, en este caso por ejemplo se pudo no enviar algun campo de la tabla marca
       */
      if (result.status === 200) {
        razonSocialInput.value = ""
        direccionInput.value = ""
        telefonoInput.value = ""
        emailInput.value = ""
        alert("Tienda creada correctamente")
      } else {
        alert("Hubo un error creando la tienda, por favor intentalo de nuevo")
      }
    } catch(e) {
      console.error(e)
      alert("Hubo un error creando la tienda, por favor intentalo de nuevo")
    }
  }