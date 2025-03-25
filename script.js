const dial = document.getElementById("dial");
const staticSound = document.getElementById("static");
const stations = [
    document.getElementById("station0"),
    document.getElementById("station1"),
    document.getElementById("station2"),
    document.getElementById("station3"),
    document.getElementById("station4"),
    document.getElementById("station5")
];

let currentStation = null;

// Función para cambiar de estación con efecto de estática
dial.addEventListener("input", function () {
    let stationIndex = parseInt(dial.value);

    // Reproducir sonido de estática de inmediato
    staticSound.currentTime = 0;
    staticSound.play();

    // Esperar un poco para simular la estática y luego reproducir la nueva estación
    setTimeout(() => {
        staticSound.pause();
        staticSound.currentTime = 0; // Reiniciar la estática

        100;

        // Pausar TODAS las estaciones antes de iniciar la nueva
        stations.forEach(station => {
            station.pause();
        });

        // Reproducir la nueva estación
        stations[stationIndex].play();
        currentStation = stations[stationIndex];
    }, 200); // Retraso para simular el efecto de sintonización
});
