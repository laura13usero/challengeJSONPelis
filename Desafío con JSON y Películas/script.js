document.addEventListener("DOMContentLoaded", function () {
    // Referencias a elementos del DOM
    const contenedorPeliculas = document.getElementById("contenedorPeliculas");
    const campoBusqueda = document.getElementById("campoBusqueda");
    const botonBuscar = document.getElementById("botonBuscar");
    const filtroGenero = document.getElementById("filtroGenero");
    const botonesFiltro = document.querySelectorAll(".filtro");
    const botonOrdenar = document.getElementById("botonOrdenar");
    const mensajeError = document.getElementById("mensajeError");

    let peliculas = [
        { "titulo": "Alien", "genero": "Ciencia Ficción", "año": 1979, "imagen": "imagenes/alien.jpg" },
        { "titulo": "El Exorcista", "genero": "Terror", "año": 1973, "imagen": "imagenes/exorcista.jpg" },
        { "titulo": "La Cosa", "genero": "Ciencia Ficción", "año": 1982, "imagen": "imagenes/lacosa.jpg" },
        { "titulo": "El Resplandor", "genero": "Terror", "año": 1980, "imagen": "imagenes/resplandor.jpg" },
        { "titulo": "Terminator", "genero": "Ciencia Ficción", "año": 1984, "imagen": "imagenes/terminator.jpg" },
        { "titulo": "Pesadilla en Elm Street", "genero": "Terror", "año": 1984, "imagen": "imagenes/pesadilla.jpg" },
        { "titulo": "The Matrix", "genero": "Ciencia Ficción", "año": 1999, "imagen": "imagenes/Matrix.jpg" },
        { "titulo": "Blade Runner", "genero": "Ciencia Ficción", "año": 1982, "imagen": "imagenes/bladerunner.jpg" },
        { "titulo": "La Noche de los Muertos Vivientes", "genero": "Terror", "año": 1968, "imagen": "imagenes/nochedelosmuertosvivientes.jpg" },
        { "titulo": "El Conjuro", "genero": "Terror", "año": 2013, "imagen": "imagenes/conjuring.jpg" },
        { "titulo": "Annihilation", "genero": "Ciencia Ficción", "año": 2018, "imagen": "imagenes/anihilation.jpg" },
        { "titulo": "Hereditary", "genero": "Terror", "año": 2018, "imagen": "imagenes/hereditary.jpg" }
    ];

    let ordenAscendente = true;

    // Función para mostrar películas
    function mostrarPeliculas(listaPeliculas) {
        contenedorPeliculas.innerHTML = ""; // Limpiar contenedor
        if (listaPeliculas.length === 0) {
            mensajeError.style.display = "block";
        } else {
            mensajeError.style.display = "none";
            listaPeliculas.forEach(pelicula => {
                const divPelicula = document.createElement("div");
                divPelicula.classList.add("pelicula");
                divPelicula.innerHTML = `
                    <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
                    <div class="titulo">${pelicula.titulo} (${pelicula.año})</div>
                `;
                contenedorPeliculas.appendChild(divPelicula);
            });
        }
    }

    // Función de búsqueda
    function buscarPeliculas() {
        const termino = campoBusqueda.value.toLowerCase();
        const generoSeleccionado = filtroGenero.value;
        const peliculasFiltradas = peliculas.filter(pelicula =>
            pelicula.titulo.toLowerCase().includes(termino) &&
            (generoSeleccionado === "Todos" || pelicula.genero === generoSeleccionado)
        );
        mostrarPeliculas(peliculasFiltradas);
    }

    // Evento para buscar al hacer clic en el botón
    botonBuscar.addEventListener("click", buscarPeliculas);

    // Evento para filtrar por género con el select
    filtroGenero.addEventListener("change", buscarPeliculas);

    // Eventos para los botones de filtro rápido
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", function () {
            filtroGenero.value = this.dataset.genero;
            buscarPeliculas();
        });
    });

    // Función para ordenar por año
    function ordenarPeliculas() {
        peliculas.sort((a, b) => ordenAscendente ? a.año - b.año : b.año - a.año);
        ordenAscendente = !ordenAscendente;
        botonOrdenar.textContent = ordenAscendente ? "Ordenar por Año (Asc)" : "Ordenar por Año (Desc)";
        buscarPeliculas();
    }

    // Evento para ordenar por año
    botonOrdenar.addEventListener("click", ordenarPeliculas);

    // Mostrar todas las películas al cargar la página
    mostrarPeliculas(peliculas);
});
