const grid = new Muuri('.grid',{
    layout:{
      
        rounding: false
    }
});
// metodo par animar cuando se carga la pagina 
window.addEventListener('load', () =>{
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas')
    

    const enlaces = document.querySelectorAll('#categorias a');

    // Agregamos los listener de los enlaces para filtrar por categoria
    enlaces.forEach( (elemento) => {
        elemento.addEventListener('click', (evento) =>{
            evento.preventDefault();
            enlaces.forEach( (enlace) => enlace.classList.remove('Activo'));
            evento.target.classList.add('Activo')

            const categoria = evento.target.innerHTML.toLowerCase();
            

            categoria === 'todos' ? grid.filter('[data-categoria]'):grid.filter(`[data-categoria="${categoria}"]`);


        });
    });
    //Agregamos Listener de barra de de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input',(evento) =>{
        const busqueda = evento.target.value;
        console.log(busqueda)
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });

    // agregmos listener para las imagenes

 
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
        

		elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');

            document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
            
		});
	});

    // eventListener del boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () =>{
        overlay.classList.remove('activo')
    });

    overlay.addEventListener('click',(evento) => {
        
        evento.target.id==='overlay' ? overlay.classList.remove('activo') : " ";
    });
});