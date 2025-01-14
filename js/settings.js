import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";
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
  addObstacleBtn = document.getElementById("add-obstacle-btn");
  obstacleSizeInput = document.getElementById("add-obstacle-size");
  static previewActive = false;
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
      this.settingsDialog.close();
    });
    // Apply settings
    this.applySettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.changePlayerSize(player, this.playerSizeInput.value);
      this.changeStepSize(player, this.stepSizeInput.value);
      map.updateBorder(this);
      this.settingsDialog.close();
    });
    this.addObstacleBtn.addEventListener("click", (e) => {
      Settings.previewActive = true;
      e.preventDefault();
      this.previewObstacle(
        map,
        this.obstacleSizeInput.value ? this.obstacleSizeInput.value : 50
      );
      this.settingsDialog.close();
    });
    player.resetPos();
  };
  changePlayerSize(player, size) {
    this.playerSize = Number(size);
    player.playerSize = Number(size);
    player.object.style.width = `${player.playerSize}px`;
  }
  changeStepSize(player, size) {
    player.stepSize = Number(size);
    this.stepSize = Number(size);
  }
  previewObstacle(map, size = 50) {
    const preview = document.createElement("div");
    preview.id = "obstacle-preview";
    preview.style.width = `${size}px`;
    map.object.appendChild(preview);
    let x;
    let y;
    map.object.addEventListener("mousemove", (e) => {
      if (Settings.previewActive) {
        x = e.clientX - size / 2;
        y = e.clientY - size / 2;
        preview.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
    if (Settings.previewActive) {
      map.object.addEventListener(
        "mousedown",
        () => {
          map.object.removeChild(preview);
          this.addObstacle(x, y, size);
          Settings.previewActive = false;
        },
        { once: true }
      );
    }
  }
  addObstacle(x, y, size) {
    new Obstacle(x, y, Number(size));
  }
}
