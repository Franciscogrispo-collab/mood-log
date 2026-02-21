function toggleConsumoFields() {
    const tipo = document.getElementById('consumo-tipo').value;
    const intensidadCont = document.getElementById('intensidad-container');
    const cantidadCont = document.getElementById('cantidad-container');

    if (tipo === 'vaper') {
        intensidadCont.classList.remove('hidden');
        cantidadCont.classList.add('hidden');
    } else if (tipo === 'cigarrillos') {
        intensidadCont.classList.add('hidden');
        cantidadCont.classList.remove('hidden');
    } else if (tipo === 'custom') {
        intensidadCont.classList.remove('hidden');
        cantidadCont.classList.remove('hidden');
    } else {
        intensidadCont.classList.add('hidden');
        cantidadCont.classList.add('hidden');
    }
}

function toggleSymptomDetails() {
    document.getElementById('detail-cansancio').classList.toggle('hidden', !document.getElementById('symp-cansancio').checked);
    document.getElementById('detail-estres').classList.toggle('hidden', !document.getElementById('symp-estres').checked);
    document.getElementById('detail-derma').classList.toggle('hidden', !document.getElementById('symp-derma').checked);
}

function updateSliderVal(id) {
    const val = document.getElementById('input-' + id).value;
    document.getElementById('val-' + id).innerText = val;
}

function getRatingDesc(val) {
    const v = parseInt(val);
    if (v <= 2) return "Mediocre";
    if (v <= 4) return "Aceptable";
    if (v <= 6) return "Regular";
    if (v <= 9) return "Muy Buena";
    return "Excelente";
}

function updateStoryRating(num) {
    const val = document.getElementById('rating' + num).value;
    document.getElementById('desc-rating' + num).innerText = `${getRatingDesc(val)} (${val})`;
}

function saveData() {
    const tipoConsumo = document.getElementById('consumo-tipo').value;
    const intensidadEl = document.querySelector('input[name="intensidad"]:checked');

    // Captura de síntomas
    const sintomas = {
        palpitaciones: document.getElementById('symp-palpitaciones').checked,
        malestarEstomago: document.getElementById('symp-estomago').checked,
        cansancio: document.getElementById('symp-cansancio').checked ? document.getElementById('input-cansancio').value : 0,
        estres: document.getElementById('symp-estres').checked ? document.getElementById('input-estres').value : 0,
        efectoReflector: document.getElementById('symp-reflector').checked,
        dermatilomania: []
    };

    if (document.getElementById('symp-derma').checked) {
        document.querySelectorAll('input[name="derma-target"]:checked').forEach(el => {
            sintomas.dermatilomania.push(el.value);
        });
    }

    const data = {
        fecha: new Date().toLocaleString(),
        tipoConsumo: tipoConsumo,
        intensidad: (tipoConsumo === 'nada' || !intensidadEl) ? 'ninguna' : intensidadEl.value,
        cantidad: (tipoConsumo === 'nada') ? 0 : (document.getElementById('cantidad').value || 0),
        sintomas: sintomas,
        horasSueno: document.getElementById('sueno').value || 0,
        historia: {
            premisa: document.getElementById('idea').value,
            ratingYo: document.getElementById('rating1').value,
            ratingOtroNombre: document.getElementById('rating2-name').value || 'Otro',
            ratingOtroValor: document.getElementById('rating2').value
        }
    };

    let history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    history.push(data);

    localStorage.setItem('moodHistory', JSON.stringify(history));
    alert('Log guardado con éxito. ¡Buen trabajo!');

    // Limpieza
    document.getElementById('cantidad').value = '';
    document.getElementById('sueno').value = '';
    document.getElementById('idea').value = '';
    document.getElementById('rating2-name').value = '';
    if (intensidadEl) intensidadEl.checked = false;

    // Reset sliders
    ['rating1', 'rating2'].forEach(id => {
        document.getElementById(id).value = 5;
    });
    updateStoryRating('1');
    updateStoryRating('2');

    // Reset síntomas
    const checkIds = ['symp-palpitaciones', 'symp-cansancio', 'symp-estres', 'symp-estomago', 'symp-derma', 'derma-unas', 'derma-granos', 'symp-reflector'];
    checkIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = false;
    });

    document.getElementById('input-cansancio').value = 5;
    document.getElementById('input-estres').value = 5;
    updateSliderVal('cansancio');
    updateSliderVal('estres');
    toggleSymptomDetails();
}