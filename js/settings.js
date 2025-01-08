export class Settings {
  // Buttons
  settingsBtn = document.getElementById("settings");
  applySettingsBtn = document.getElementById("apply-btn");
  cancelSettingsBtn = document.getElementById("cancel-btn");
  // Inputs
  playerSizeInput = document.getElementById("player-size");
  stepSizeInput = document.getElementById("step-size");
  // Dialog
  settingsDialog = document.getElementById("settings-dialog");
  constructor(playerSize, stepSize) {
    this.stepSize = stepSize;
    this.playerSize = playerSize;
  }
  init = () => {
    // Open settings dialog
    this.settingsBtn.addEventListener("click", () => {
      settingsDialog.showModal();
    });

    // Cancel settings and close dialog
    this.cancelSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("yippie");
      settingsDialog.close();
    });
    // Apply settings
    this.applySettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("player size: ", playerSizeInput.value);
      console.log("step size: ", stepSizeInput.value);
      console.log("yippie");
      changePlayerSize(playerSizeInput.value);
      changeStepSize(stepSizeInput.value);
      updateBorder();
      settingsDialog.close();
    });
  };
  changePlayerSize(player, size) {
    player.playerSize = size;
    player.object.style.width = `${player.playerSize}px`;
  }
  changeStepSize(player, size) {
    console.log("new stepSize: ", size);
    player.stepSize = Number(size);
    console.log(player.stepSize);
  }
}
