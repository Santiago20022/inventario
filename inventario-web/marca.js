const http = axios; // Axios es una libreria que me permite hacer peticiones al API, es decir a inventario_api

async function updateMarca() {

}

async function deleteMarca() {
  
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
      const marca = result.data
      for (let i = 0; i < marca.length; i++) {
        const html = `
          <tr>
            <td>${marca[i].id}</td>
            <td>${marca[i].nombre}</td>
            <td>${marca[i].description}</td>
          </tr>
        `
        tablaMarca.insertAdjacentHTML("beforeend", html)
      }
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
    if(nombre) {
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
    }
  } catch(e) {
    console.error(e)
    alert("Hubo un error creando la marca, por favor intentalo de nuevo")
  }
}