;(function() {
  var app = {};

  app.init = function() {
    app.s = function(s) {

      var mic;
      var fft;
      var sound;

      s.preload = function() {
        // sound = s.loadSound('/01_Theory_of_Machines.mp3');
      };

      s.setup = function() {
        // sound.loop();
        s.createCanvas($(window).width(), $(window).height());
        s.background('black');

        mic = new p5.AudioIn();
        mic.start();

        fft = new p5.FFT();
        fft.setInput(mic);
      };

      s.draw = function() {
        var spectrum = fft.analyze();
        var lvl = mic.getLevel();
        s.background('black');
        s.noStroke();
        s.fill(0, 200, 0);
        for (var i = 0; i < spectrum.length; i++) {
          var x = s.map(i, 0, spectrum.length, 0, s.width);
          var h = -s.height + s.map(spectrum[i], 0, 255, s.height, 0);
          s.rect(x, s.height, s.width / spectrum.length, h);
        }

        // var waveform = fft.waveform();
      };

      return s;
    };

    app.p = new p5(app.s, $('#app_wrapper')[0]);
  };

  window.app = app;
})();
