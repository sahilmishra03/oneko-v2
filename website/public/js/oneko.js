(function oneko() {
  const nekoEl = document.createElement("div");
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let isEnabled = false;
  let currentSkin = "";
  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratch: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function create() {
    if (isEnabled) {
      return;
    }

    isEnabled = true;
    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    const skins = [
      "ace.png", "black.png", "bsd.png", "bunny.png", "calico.png", "cat.png", "catppuccin.png",
      "dog.png", "eevee.png", "esmeralda.png", "fox.png", "ghost.png", "gray.png",
      "jess.png", "kina.png", "lucy.png", "maia.png", "maria.png", "mike.png",
      "oneko-classic.gif", "oneko.png", "sakura.png", "silver.png", "silversky.png",
      "spirit.png", "tomoyo.png", "tora-x11.png", "valentine.png", "vaporwave.png"
    ];

    window.onekoChangeSkin = function() {
      const randomSkin = skins[Math.floor(Math.random() * skins.length)];
      currentSkin = randomSkin;
      nekoEl.style.backgroundImage = `url('/skins/${randomSkin}')`;
      nekoEl.style.backgroundSize =
        randomSkin === "cat.png" ? "128px 128px" : "256px 128px";
    };

    // Initial skin
    window.onekoChangeSkin();

    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = "16px";
    nekoEl.style.top = "16px";
    nekoEl.style.zIndex = "9999";

    document.body.appendChild(nekoEl);

    // Desktop Mouse Support
    const handleMouseMove = (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    // Mobile Touch Support
    const handleTouch = (event) => {
      if (event.touches.length > 0) {
        mousePosX = event.touches[0].clientX;
        mousePosY = event.touches[0].clientY;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchstart", handleTouch, { passive: true });
    document.addEventListener("touchmove", handleTouch, { passive: true });

    window.onekoInterval = setInterval(frame, 100);

    window.onekoDisable = function () {
      if (!isEnabled) {
        return;
      }

      isEnabled = false;
      clearInterval(window.onekoInterval);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchstart", handleTouch);
      document.removeEventListener("touchmove", handleTouch);
      nekoEl.remove();
    };

    window.onekoEnable = create;
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    const spriteX =
      currentSkin === "cat.png" ? -((-sprite[0]) % 4) : sprite[0];
    nekoEl.style.backgroundPosition = `${spriteX * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      idleAnimation = ["sleeping", "scratch"][Math.floor(Math.random() * 2)];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratch":
        setSprite("scratch", idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  create();
})();
