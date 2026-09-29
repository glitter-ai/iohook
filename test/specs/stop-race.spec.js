const ioHook = require('../../index');
const robot = require('robotjs');

const settle = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// unload() lets go of the JS bridge while the native hook thread can still be delivering an
// event; with input streaming that aborted the process (uv_mutex_lock on a finalized tsfn)
describe('unloading under input', () => {
  // leave the hook loaded: the worker exits with it running, which used to std::terminate at exit
  afterAll(() => {
    ioHook.load();
  });

  it('never aborts the process while events are in flight', async () => {
    for (let i = 0; i < 40; i++) {
      ioHook.load();
      ioHook.on('mousemove', () => {});
      await settle(30);
      // events on their way through the tap at the moment unload() lets go of the bridge
      for (let j = 0; j < 10; j++) robot.moveMouse(200 + j, 200 + (i % 20));
      ioHook.unload();
      ioHook.removeAllListeners('mousemove');
      // the old run loop must be gone before the next load (a separate libuiohook overlap otherwise)
      await settle(100);
    }
    expect(true).toBe(true);
  });
});
