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
let audioUnlocked = false; // Bandera para verificar si el audio está desbloqueado

// Botón para desbloquear el audio (Style)
document.addEventListener("DOMContentLoaded", function () {
    const enableButton = document.createElement("button");
    enableButton.innerText = "Activar Sonido 🔊";
    enableButton.style.position = "absolute";
    enableButton.style.top = "10px";
    enableButton.style.left = "50%";
    enableButton.style.transform = "translateX(-50%)";
    enableButton.style.padding = "10px";
    enableButton.style.fontSize = "16px";
    enableButton.style.background = "#ff4444";
    enableButton.style.color = "white";
    enableButton.style.border = "none";
    enableButton.style.borderRadius = "5px";
    enableButton.style.cursor = "pointer";
    document.body.appendChild(enableButton);

    // Evento de clic para desbloquear el audio
    enableButton.addEventListener("click", function () {
        staticSound.play().then(() => {
            staticSound.pause();
            staticSound.currentTime = 0;
            stations.forEach(station => {
                station.play().then(() => {
                    station.pause();
                    station.currentTime = 0;
                }).catch(error => console.log("Error desbloqueando estación:", error));
            });
            audioUnlocked = true; // Ahora el audio está desbloqueado
            enableButton.remove(); // Eliminar botón después de la activación
        }).catch(error => console.log("Error desbloqueando audio:", error));
    });
});

// Manejo del dial con sonido de estática
dial.addEventListener("input", function () {
    if (!audioUnlocked) return; // No reproducir si el usuario no activó el sonido

    let stationIndex = parseInt(dial.value);

    // Reproducir estática
    staticSound.currentTime = 0;
    staticSound.play().catch(error => console.log("Error al reproducir estática:", error));

    // Esperar un poco para simular la sintonización antes de cambiar de estación
    setTimeout(() => {
        staticSound.pause();
        staticSound.currentTime = 0; 

        // Pausar todas las estaciones antes de iniciar la nueva
        stations.forEach(station => station.pause());

        // Reproducir la nueva estación
        stations[stationIndex].play().catch(error => console.log("Error al reproducir estación:", error));
        currentStation = stations[stationIndex];

    }, 200); // Retraso para efecto de sintonización
});
