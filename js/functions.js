
const idiomas = {
  es: {
    mensaje: "Idioma: Español",
    codigoBarras: "Codigo de barras",
    fechaOptions: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    },
    locale: 'es-ES',
    noEncontrado: "El producto no se encuentra",
    producto: "Producto",
    precio: "Precio"
  },
  en: {
    mensaje: "Language: English",
    codigoBarras: "Barcode",
    fechaOptions: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    },
    
    locale: 'en-US',
    noEncontrado: "Product not found",
    producto: "Product",
    precio: "Price"
  }
};


let idiomaActual = 'es';
let codigo = "";

function cambiarIdioma() {
  const toggle = document.getElementById("toggle");
  idiomaActual = toggle.checked ? 'en' : 'es';

  const langData = idiomas[idiomaActual];
  document.getElementById("mensaje").textContent = langData.mensaje;

  const respuesta = document.getElementById("respuesta");
  if (respuesta.innerHTML.includes(idiomas.es.codigoBarras) || respuesta.innerHTML.includes(idiomas.en.codigoBarras)) {
    respuesta.innerHTML = `
      <img src="./img/barcode.gif" alt="" width="25%" height="25%">
      <br>${langData.codigoBarras}
    `;
  }

  actualizarFechaHora();
}

function actualizarFechaHora() {
  const ahora = new Date();
  const langData = idiomas[idiomaActual];
  const fechaHoraFormateada = ahora.toLocaleDateString(langData.locale, langData.fechaOptions);
  document.getElementById('fecha-hora').textContent = fechaHoraFormateada;
}

function buscar(cod) {
  const lang = idiomas[idiomaActual];
  const producto = productos.find(p => p.codigo === cod);

  if (producto) {
    const nombre = idiomaActual === 'es' ? producto.nombre_es : producto.nombre_en;
    document.getElementById("respuesta").innerHTML = `
      ${lang.producto}: ${nombre} <br>
      ${lang.precio}: ${producto.precio} <br>
      <img src="./img/${producto.imagen}" width="25%" height="25%" >
    `;
  } else {
    document.getElementById("respuesta").textContent = lang.noEncontrado;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggle").addEventListener("change", cambiarIdioma);
  document.getElementById("theme-toggle").addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });

  actualizarFechaHora();
  setInterval(actualizarFechaHora, 1000);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      codigo += event.key;
    } else {
      buscar(codigo);
      codigo = "";
    }
  });
  document.getElementById("jsonFile").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      cargarJSON(file);
    }
  });

});



function cargarJSON(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      productos = JSON.parse(e.target.result);
      alert("Productos cargados");
    } catch (err) {
      alert("Error al cargar el archivo JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}