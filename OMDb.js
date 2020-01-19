$("#boton").on("click", getPeliculas);
var buscando = '';
//Se ejecuta cuando pulsamos el boton Buscar
function getPeliculas() {
    buscando = $("#buscador")[0].value;//recoge el string 
    $("#lista").empty();
    $('#lista').html('<div class="loading"><img src="https://ya-webdesign.com/images250_/gif-loading-png-4.png" alt="loading" /></div>');
    $.ajax({
        url: 'http://www.omdbapi.com/?s=' + buscando + '&apikey=a6342ca0',
        success: function (respuesta) {
            var lista = $("#lista");
            $('#lista').fadeIn(1000).html("");
            $.each(respuesta.Search, function (index, elemento) {
            //Uso del card de boostrap para cada una de las peliculas
                lista.append(
                    ' <div class="card" style="width: 18rem;">'
                    + '<img class="card-img-top" id="' + elemento.imdbID + '" onclick=mostrarDetalles() src="' + elemento.Poster + '">'
                    + '<div class="card-body">'
                    + '<h5 class="card-title">"' + elemento.Title + '"</h5>'
                    + '<p class="card-text">"' + elemento.Year + '"</p>'
                    + '</div>'
                    + '</div>'
                );   
            })  
            pag = 1;
        }
    });
}

//Funcion que se activa cuando hacemos click en una foto de alguna de las peliculas
function mostrarDetalles() {
    let idPelicula = event.target.id;//coge la id del evento al que hemos echo click
    $(".modal-title").empty();
    $(".modal-body").empty();    
    $.ajax({
        url: 'http://www.omdbapi.com/?i=' + idPelicula + '&apikey=a6342ca0',
        success: function (respuesta) {
            $(".modal").modal("show");
            //$(".modal").animated(zoomOutDown);
            $(".modal-title").append(respuesta.Title);
            $(".foto").attr("src", respuesta.Poster + "<br>");
            $(".modal").css({'width':'30%','cursor':'zoom-in'}  + "<br>");
            $(".modal-body").append("Año: " + respuesta.Year + "<br>");
            $(".modal-body").append("Duracion: " + respuesta.Runtime + "<br>");
            $(".modal-body").append("Genero: " + respuesta.Genre);
        }
    });
}

///Scroll infinito
$(document).ready(function () {
    var pag = 1;
    $(window).scroll(function () {
        if ($(document).height() - $(window).height() == $(window).scrollTop()) {
            pag++;
            scrollInfinito(pag);
        }
    });
});

function scrollInfinito(pag) {
    $('#lista').append('<div class="loading"><img src="https://ya-webdesign.com/images250_/gif-loading-png-4.png" alt="loading" /></div>');
    $.ajax({
        url: 'http://www.omdbapi.com/?s=' + buscando +'&page=' + pag +  '&apikey=a6342ca0',
        success: function (respuesta) {
            var lista = $("#lista");
            $.each(respuesta.Search, function (index, elemento) {
                $(".loading").fadeIn(1000).remove();
                //Uso del card de boostrap para cada una de las peliculas
                lista.append(
                    ' <div class="card" style="width: 18rem;">'
                    + '<img class="card-img-top" id="' + elemento.imdbID + '" onclick=mostrarDetalles() src="' + elemento.Poster + '">'
                    + '<div class="card-body">'
                    + '<h5 class="card-title">"' + elemento.Title + '"</h5>'
                    + '<p class="card-text">"' + elemento.Year + '"</p>'
                    + '</div>'
                    + '</div>'
                );
            })
        }
    });
}