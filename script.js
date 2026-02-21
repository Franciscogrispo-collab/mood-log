function saveData() {
    const data = {
        fecha: new Date().toLocaleString(),
        vaper: document.getElementById('vaper').value,
        somatizacion: document.getElementById('somatizacion').value,
        idea: document.getElementById('idea').value
    };

    // Obtenemos lo que ya esté guardado o un array vacío
    let history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    history.push(data);

    // Guardamos
    localStorage.setItem('moodHistory', JSON.stringify(history));
    alert('Log guardado con éxito. ¡Buen trabajo!');

    // Limpiamos los campos
    document.getElementById('somatizacion').value = '';
    document.getElementById('idea').value = '';
}