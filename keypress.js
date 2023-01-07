const { Board, ESC, Fn, Led } = require("johnny-five");
const keypress = require("keypress");
const board = new Board();

board.on("ready", () => {
  // just to make sure the program is running
  const led = new Led(11);
  const led2 = new Led(10);
  function controller(_, key) {
    let change = 0;

    if (key) {
      console.log(key);
      if (key.name === "up") {
        led.on();
        led2.on();
      }
      if (key.name === "down") {
        led.stop().off();
        led2.stop().off();
      }
      if (key.name === 'space') {
        led.blink(1000);
        board.wait(1000, () => {
          led2.blink(1000);
        })
      }
      if (key.name === 'right') {
        led.stop().off();
        led2.fade({
          easing: "linear",
          onStart() {
          console.log('Right Light start')
          },
          duration: 3000,
          cuePoints: [0, 1, 0.5, 0.8, 0.9, 1],
          keyFrames: [0, 250, 25, 150, 100, 125],
          onstop() {  
          console.log('Right Light Stop')
          }
        });
      }
      if (key.name === 'left') {
        // led.pulse();
        led2.stop().off();
        led.fade({
          easing: "linear",
          onStart() {
          console.log('Lect Light start')
          },
          duration: 3000,
          cuePoints: [0, 1, 0.5, 0.8, 0.9, 1],
          keyFrames: [0, 250, 25, 150, 100, 125],
          onstop() {
          console.log('Left Light Stop')
          }
        });
      }
    }
  }
  keypress(process.stdin);

  process.stdin.on("keypress", controller);
  process.stdin.setRawMode(true);
  process.stdin.resume();
});