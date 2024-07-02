const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */


async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}


/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function findUser(){
  const idRecetas = document.querySelector('#id-receta').value; 
  const idDNI = document.querySelector('#id-dni').value;  
  const password = document.querySelector('#password').value;

 
  const result = await fetchData(`${BASEURL}/api/user/${idDNI}/${password}`, 'GET');
  if (result.error) {
      alert(result.error);
  } else {
      
      window.location.href = `/Dpersonales.html?iduser=${idDNI},${result.nombre},${result.apellido},${result.email},${result.pais}, 
      ${result.nacional},${result.phone},${result.fechaN}`;
    }
    

}


  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveMovie = document.querySelector('#btn-find');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveMovie.addEventListener('click',findUser);
 
});