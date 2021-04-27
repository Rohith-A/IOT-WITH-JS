const { Board, ESC, Fn, Led } = require("johnny-five");
const keypress = require("keypress");
const board = new Board();

board.on("ready", () => {
  // just to make sure the program is running
  const led = new Led(11);
  led.brightness(500)
  function controller(_, key) {
    let change = 0;

    if (key) {
        console.log(key);
        if (key.name === "up") {
            led.pulse({
                easing: "linear",
                duration: 3000,
                cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
                keyFrames: [100, 10, 0, 50, 0, 555],
                onstop() {
                  console.log("Animation stopped");
                }
              });
            // led.blink(500);
        } else if (key.name === "down") {
            led.stop().off();
      }
    }
  }
  keypress(process.stdin);

  process.stdin.on("keypress", controller);
  process.stdin.setRawMode(true);
  process.stdin.resume();
});