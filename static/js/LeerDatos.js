const BASEURL = 'http://127.0.0.1:5000';


/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method = 'GET', data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      }
  };

  if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
  }

  try {
      const response = await fetch(url, options);

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
          const jsonData = await response.json();
          return jsonData;
      } else {
          const textData = await response.text();
          throw new Error(`Unexpected content type: ${contentType}, received: ${textData}`);
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return { error: error.message };
  }
}


/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */

 async function SaveUser(){
  const idRecetas = document.querySelector('#id-receta').value; 
  const idDNI = document.querySelector('#id-dni').value;  
  const Nom= document.querySelector('#Name').value;
  // const apellido = document.querySelector('#Surname').value; 
  // const email = document.querySelector('#id-correo').value;  
  // const pais = document.querySelector('#Country').value;
  // const nacional = document.querySelector('#Nacionality').value; 
  // const phone = document.querySelector('#Phone').value;  

  const userData = {   
    nombre:Nom
    // apellido: apellido,
    // email: email,   
    // pais: pais,
    // nacional: nacional,
    // phone: phone,
    };
 
  const result = await fetchData(`${BASEURL}/api/user/${idDNI}`, 'PUT', userData);
  if (result.error) {
      alert(result.error);
  } 
 }

 // Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveMovie = document.querySelector('#btn-save');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveMovie.addEventListener('click',SaveUser());
 
});