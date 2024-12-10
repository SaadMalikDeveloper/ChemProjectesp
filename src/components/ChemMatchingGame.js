import Phaser from "phaser";
import React, { useEffect, useRef, useState } from "react";
import SuccessComponent from "./SuccessComponent";
import FailComponent from "./FailComponent";

const ChemMatchingGame = ({ setGameGlobalReset, gameGlobalReset }) => {
  const gameContainer = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);
  const [gameReset, setGameReset] = useState();
  const resetGameRef = useRef(null);
  const [gameResetGiveup, setGameResetGiveup] = useState(false);
  const [failAttempts, setFailAttempts] = useState(0);
  const [successAttempts, setSuccessAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(
    failAttempts + successAttempts
  );
  const [flaskCombinationsPhaseF, setFlaskCombinationsPhaseF] = useState(() => {
    // Retrieve from sessionStorage if available
    const storedCombinations = sessionStorage.getItem(
      "flaskCombinationsPhaseF"
    );
    return storedCombinations ? JSON.parse(storedCombinations) : [];
  });
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1170,
      height: 600,
      parent: gameContainer.current,
      backgroundColor: "#F5F9FF",
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image("flaskA", process.env.PUBLIC_URL + "/assets/flaskA.png");
      this.load.image("flaskB", process.env.PUBLIC_URL + "/assets/flaskB.png");
      this.load.image("flaskC", process.env.PUBLIC_URL + "/assets/flaskC.png");
      this.load.image("flaskD", process.env.PUBLIC_URL + "/assets/flaskD.png");
      this.load.image("beaker", process.env.PUBLIC_URL + "/assets/beaker.png");
      this.load.image(
        "liquidRed",
        process.env.PUBLIC_URL + "/assets/correctBeaker.png"
      );
      this.load.image(
        "liquidSkyBlue",
        process.env.PUBLIC_URL + "/assets/invalid.png"
      );
      this.load.image(
        "flaskFilling",
        process.env.PUBLIC_URL + "/assets/feelingBeaker.png"
      );
      this.load.image("tick", process.env.PUBLIC_URL + "/assets/tick.png");
      this.load.image(
        "pourBtn",
        process.env.PUBLIC_URL + "/assets/pourBtn.png"
      );
      this.load.image(
        "emptyBtn",
        process.env.PUBLIC_URL + "/assets/emptyBtn.png"
      );
    }

    let selectedFlasks = [];
    let tickIcons = [];

    function create() {
      const flaskSpacing = 150;

      const flaskA = this.add.image(100, 408, "flaskA").setInteractive();
      const flaskB = this.add
        .image(100 + flaskSpacing, 408, "flaskB")
        .setInteractive();
      const flaskC = this.add
        .image(100 + 2 * flaskSpacing, 408, "flaskC")
        .setInteractive();
      const flaskD = this.add
        .image(100 + 3 * flaskSpacing, 408, "flaskD")
        .setInteractive();

      [flaskA, flaskB, flaskC, flaskD].forEach((flask) => {
        flask.on("pointerover", () => {
          this.input.setDefaultCursor("pointer");
        });
        flask.on("pointerout", () => {
          this.input.setDefaultCursor("");
        });
      });

      const beakerFill = this.add
        .image(900, 600, "liquidSkyBlue")
        .setOrigin(0.5, 1)
        .setVisible(false);
      const flaskFilling = this.add
        .image(1000, 350, "flaskFilling")
        .setOrigin(0.5, 1)
        .setVisible(false);
      const beaker = this.add.image(900, 400, "beaker");

      const pourButton = this.add
        .image(980, 620, "pourBtn")
        .setOrigin(0.5, 1)
        .setInteractive();
      const resetButton = this.add
        .image(830, 620, "emptyBtn")
        .setOrigin(0.5, 1)
        .setInteractive();

      pourButton.on("pointerover", () => {
        this.input.setDefaultCursor("pointer");
      });
      pourButton.on("pointerout", () => {
        this.input.setDefaultCursor("");
      });

      resetButton.on("pointerover", () => {
        this.input.setDefaultCursor("pointer");
      });
      resetButton.on("pointerout", () => {
        this.input.setDefaultCursor("");
      });

      const flasks = [flaskA, flaskB, flaskC, flaskD];

      this.add.text(85, 500, "G1", {
        fontSize: "20px",
        fontStyle: "bold",
        fontFamily: "Mulish",
        fill: "#000",
      });
      this.add.text(85 + flaskSpacing, 500, "G2", {
        fontSize: "20px",
        fontStyle: "bold",
        fontFamily: "Mulish",
        fill: "#000",
      });
      this.add.text(85 + 2 * flaskSpacing, 500, "G3", {
        fontSize: "20px",
        fontStyle: "bold",
        fontFamily: "Mulish",
        fill: "#000",
      });
      this.add.text(85 + 3 * flaskSpacing, 500, "G4", {
        fontSize: "20px",
        fontStyle: "bold",
        fontFamily: "Mulish",
        fill: "#000",
      });

      flasks.forEach((flask) => {
        flask.on("pointerdown", () => {
          handleFlaskSelection(flask, this);
        });
      });

      function handleFlaskSelection(flask, scene) {
        // Check if the flask is already selected
        const flaskIndex = selectedFlasks.indexOf(flask);

        if (flaskIndex > -1) {
          // If flask is already selected, remove it from the selectedFlasks array
          selectedFlasks.splice(flaskIndex, 1);

          // Find and remove the corresponding tick mark
          const tickToRemove = tickIcons.find(
            (tickIcon) => tickIcon.x === flask.x && tickIcon.y === flask.y - 150
          );
          if (tickToRemove) {
            tickToRemove.destroy(); // Remove the tick mark
            tickIcons.splice(tickIcons.indexOf(tickToRemove), 1); // Remove it from tickIcons array
          }
        } else {
          // If flask is not selected, add it to the selectedFlasks array
          if (selectedFlasks.length < 4) {
            selectedFlasks.push(flask);

            // Add a tick mark to the selected flask
            const tick = scene.add
              .image(flask.x, flask.y - 150, "tick")
              .setOrigin(0.5, 0)
              .setScale(0.9);
            tickIcons.push(tick);
          }
        }

        // Update the flask tint to indicate selection/deselection (optional)
        selectedFlasks.forEach((selected) => {});

        // Clear tint for deselected flasks
        flasks.forEach((f) => {
          if (!selectedFlasks.includes(f)) {
            f.clearTint(); // Clear tint for flasks not in selectedFlasks
          }
        });
      }

      pourButton.on("pointerdown", () => {
        if (selectedFlasks.length >= 1 && result === null) {
          // Add result check
          pourButton.disableInteractive(); // Disable pour button after the first click
          const combination = selectedFlasks.map(
            (flask) => flasks.indexOf(flask) + 1
          );

          setFlaskCombinationsPhaseF((prevCombinations) => [
            ...prevCombinations,
            combination,
          ]);

          const containsFlaskA = selectedFlasks.includes(flaskA);
          const containsFlaskC = selectedFlasks.includes(flaskC);
          const containsFlaskD = selectedFlasks.includes(flaskD);
          const containsFlaskB = selectedFlasks.includes(flaskB);

          const isRedCombination =
            containsFlaskA &&
            containsFlaskC &&
            !containsFlaskB &&
            (selectedFlasks.length === 2 ||
              (selectedFlasks.length === 3 && containsFlaskD));

          const liquidImage = isRedCombination ? "liquidRed" : "liquidSkyBlue";
          pourSolutionToBeaker(
            this,
            selectedFlasks,
            beakerFill,
            liquidImage,
            flaskFilling
          );

          if (isRedCombination) {
            setResult("success");
            setSuccessAttempts((prevAttempts) => {
              const newSuccessAttempts = prevAttempts + 1;
              sessionStorage.setItem("successAttempts", newSuccessAttempts);
              setSuccessAttempts(newSuccessAttempts);
              sessionStorage.setItem("totalAttempts", totalAttempts);
            });
          } else {
            setResult("failure");
            setFailAttempts((prevAttempts) => {
              const newFailAttempts = prevAttempts + 1;
              sessionStorage.setItem("failAttempts", newFailAttempts);
              setFailAttempts(newFailAttempts);
            });
            sessionStorage.setItem("totalAttempts", totalAttempts);
          }
        }
      });

      // In the reset function, reset the result state
      function resetGame(scene, flasks, beakerFill, flaskFilling) {
        flaskFilling.setVisible(false);
        scene.tweens.add({
          targets: beakerFill,
          y: 600,
          duration: 100,
        });

        flasks.forEach((flask) => {
          flask.setY(400);
          flask.clearTint();
        });

        tickIcons.forEach((tick) => tick.setVisible(false));
        tickIcons = [];
        selectedFlasks = [];

        // Reset the result and re-enable the pour button
        setResult(null);
        pourButton.setInteractive(); // Re-enable pour button
      }

      resetButton.on("pointerdown", () => {
        resetGame(this, flasks, beakerFill, flaskFilling);
      });
      resetGameRef.current = () =>
        resetGame(this, flasks, beakerFill, flaskFilling);
    }

    function pourSolutionToBeaker(
      scene,
      flasks,
      beakerFill,
      liquidImage,
      flaskFilling
    ) {
      beakerFill.setTexture(liquidImage).setVisible(true);
      flaskFilling.setVisible(true);

      scene.tweens.add({
        targets: flaskFilling,
        alpha: { from: 1, to: 0 },
        duration: 1500,
        repeat: 1,
        yoyo: true,
      });

      scene.tweens.add({
        targets: flasks,
        y: 400,
        duration: 900,
        onComplete: () => {
          scene.tweens.add({
            targets: beakerFill,
            y: 550 - 70,
            duration: 3000,
            onComplete: () => {
              scene.tweens.add({
                targets: flasks,
                y: 400,
                duration: 1000,
              });
            },
          });
        },
      });
    }

    function resetGame(scene, flasks, beakerFill, flaskFilling) {
      flaskFilling.setVisible(false);
      scene.tweens.add({
        targets: beakerFill,
        y: 600,
        duration: 100,
      });

      flasks.forEach((flask) => {
        flask.setY(400);
        flask.clearTint();
      });

      tickIcons.forEach((tick) => tick.setVisible(false));
      tickIcons = [];
      selectedFlasks = [];
    }

    function update() {}

    return () => {
      game.destroy(true);
    };
  }, []);
  useEffect(() => {
    if (gameReset) {
      if (resetGameRef.current) {
        resetGameRef.current();
        setGameReset(false);
      }
    }
    if (gameGlobalReset) {
      if (resetGameRef.current) {
        resetGameRef.current();
        setGameReset(true);
      }
    }
  }, [gameReset, gameGlobalReset]);
  useEffect(() => {
    sessionStorage.setItem(
      "flaskCombinationsPhaseF",
      JSON.stringify(flaskCombinationsPhaseF)
    );
  }, [flaskCombinationsPhaseF]);
  return (
    <>
      <div ref={gameContainer} className="game__play_wrap"></div>
      {result === "success" && <SuccessComponent />}
      {/* {result === "failure" && !gameReset && (
        <FailComponent
          setGameReset={setGameReset}
          setGameResetGiveup={setGameResetGiveup}
        />
      )} */}
    </>
  );
};

export default ChemMatchingGame;
