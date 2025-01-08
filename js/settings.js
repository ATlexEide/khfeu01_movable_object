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
  constructor(playerSize = 100, stepSize = 50) {
    this.stepSize = stepSize;
    this.playerSize = playerSize;
  }
  init = (map, player) => {
    // Open settings dialog
    this.settingsBtn.addEventListener("click", () => {
      this.settingsDialog.showModal();
    });

    // Cancel settings and close dialog
    this.cancelSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("yippie");
      this.settingsDialog.close();
    });
    // Apply settings
    this.applySettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("player size: ", this.playerSizeInput.value);
      console.log("step size: ", this.stepSizeInput.value);
      console.log("yippie");
      this.changePlayerSize(player, this.playerSizeInput.value);
      this.changeStepSize(player, this.stepSizeInput.value);
      map.updateBorder(this);
      this.settingsDialog.close();
    });
    player.resetPos();
  };
  changePlayerSize(player, size) {
    this.playerSize = size;
    player.playerSize = size;
    player.object.style.width = `${player.playerSize}px`;
  }
  changeStepSize(player, size) {
    console.log("new stepSize: ", size);
    player.stepSize = Number(size);
    console.log(player.stepSize);
  }
}
