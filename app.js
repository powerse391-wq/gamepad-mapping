let gamepadIndex = null;

// 1. Listen for the Bluetooth/USB controller connecting
window.addEventListener("gamepadconnected", (e) => {
    gamepadIndex = e.gamepad.index;
    document.getElementById("controller-status").innerText = `Connected: ${e.gamepad.id}`;
    createMappingUI(e.gamepad.buttons.length);
    updateLoop();
});

window.addEventListener("gamepaddisconnected", () => {
    gamepadIndex = null;
    document.getElementById("controller-status").innerText = "Controller disconnected.";
    document.getElementById("mapping-ui").innerHTML = "";
});

// 2. Build visual slots for each physical button
function createMappingUI(buttonCount) {
    const ui = document.getElementById("mapping-ui");
    ui.innerHTML = "<h3>Physical Buttons:</h3>";
    for (let i = 0; i < buttonCount; i++) {
        ui.innerHTML += `<div class="button-slot" id="btn-${i}">Button ${i}</div>`;
    }
}

// 3. Constantly poll the gamepad for inputs (Runs ~60 times per second)
function updateLoop() {
    if (gamepadIndex === null) return;
    
    // Get the latest snapshot of the controller state
    const gamepad = navigator.getGamepads()[gamepadIndex];
    
    if (gamepad) {
        gamepad.buttons.forEach((button, index) => {
            const element = document.getElementById(`btn-${index}`);
            if (element) {
                if (button.pressed) {
                    element.classList.add("active");
                    
                    // --- YOUR REMAPPING LOGIC GOES HERE ---
                    // Example: Redirect "Button 0" (usually A/X) to perform an action
                    if (index === 0) {
                        console.log("Physical Button 0 pressed! Mapping to Action X.");
                    }
                } else {
                    element.classList.remove("active");
                }
            }
        });
    }
    
    requestAnimationFrame(updateLoop);
}