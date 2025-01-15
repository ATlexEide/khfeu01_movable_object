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
  userNameInput = document.getElementById("change-skin");
  // Params/Variables
  defaultUserName = "steve";
  previewActive = false;
  constructor(playerSize = 100, stepSize = 50) {
    this.stepSize = stepSize;
    this.playerSize = playerSize;
  }
  init = (map, player) => {
    window.addEventListener("wheel", (e) => {
      switch (e.code) {
        case "KeyP":
          this.settingsDialog.showModal();
          break;
        case "KeyO":
          // Place obstacle
          break;
        default:
          break;
      }
    });
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
      const userName = this.userNameInput.value
        ? this.userNameInput.value
        : this.defaultUserName;
      player.object.style.backgroundImage = `url(https://minotar.net/avatar/${userName})`;
      this.changePlayerSize(player, this.playerSizeInput.value);
      this.changeStepSize(player, this.stepSizeInput.value);
      map.updateBorder(this);
      this.settingsDialog.close();
    });
    this.addObstacleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.obstacleSizeInput.value && this.obstacleSizeInput.value < 50) {
        alert("Size must be 50 or more");
        return;
      }
      this.previewActive = true;
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
      if (this.previewActive) {
        x = e.clientX - size / 2;
        y = e.clientY - size / 2;
        preview.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
    map.object.addEventListener("wheel", (e) => {
      console.log(e.wheelDelta);
      if (e.wheelDelta > 0) {
        size += 10;
        x = e.clientX - size / 2;
        y = e.clientY - size / 2;
        console.log("+");
        preview.style.width = `${size}px`;
        preview.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (e.wheelDelta < 0) {
        size -= 10;
        if (size < 50) size = 50;
        x = e.clientX - size / 2;
        y = e.clientY - size / 2;
        console.log("-");
        preview.style.width = `${size}px`;
        preview.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
    if (this.previewActive) {
      map.object.addEventListener(
        "mousedown",
        () => {
          map.object.removeChild(preview);
          this.addObstacle(x, y, size);
          this.previewActive = false;
        },
        { once: true }
      );
    }
  }
  addObstacle(x, y, size) {
    new Obstacle(x, y, Number(size));
  }
}
