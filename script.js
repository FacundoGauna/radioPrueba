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
let audioUnlocked = false;

// Crea un AudioContext para desbloquear el sonido en móviles
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const staticSource = audioContext.createMediaElementSource(staticSound);
staticSource.connect(audioContext.destination);

// Botón para desbloquear el audio
// Agregar la clase para que el botón cambie de color
document.getElementById("enableSound").classList.add("blinking");

// Agregar el evento al botón (sin cambiar nada de tu código)
document.getElementById("enableSound").addEventListener("click", function () {
    audioContext.resume().then(() => {
        staticSound.play().then(() => {
            staticSound.pause();
            staticSound.currentTime = 0;
        }).catch(error => console.log("Error desbloqueando estática:", error));

        stations.forEach(station => {
            station.play().then(() => {
                station.pause();
                station.currentTime = 0;
            }).catch(error => console.log("Error desbloqueando estación:", error));
        });

        audioUnlocked = true;
        
        // Eliminar la clase antes de borrar el botón (para evitar errores)
        let button = document.getElementById("enableSound");
        if (button) {
            button.classList.remove("blinking");
            button.remove(); // Elimina el botón
        }
    });
});


// Manejo del dial con sonido de estática
dial.addEventListener("input", function () {
    if (!audioUnlocked) return;

    let stationIndex = parseInt(dial.value);

    // Reproducir estática inmediatamente
    staticSound.currentTime = 0;
    staticSound.volume = 0.5;
    staticSound.loop = false;
    staticSound.play().catch(error => console.log("Error al reproducir estática:", error));

    // Esperar un poco antes de cambiar de estación
    setTimeout(() => {
        staticSound.pause();
        staticSound.currentTime = 0;

        // Pausar todas las estaciones antes de iniciar la nueva
        stations.forEach(station => station.pause());

        // Reproducir la nueva estación
        stations[stationIndex].play().catch(error => console.log("Error al reproducir estación:", error));
        currentStation = stations[stationIndex];

    }, 300);
});
