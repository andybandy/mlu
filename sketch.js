;(function() {
  var app = {};

  app.init = function() {
    app.s = function(s) {

      var mic;
      var fft;
      var sound;

      var trianglesAmmount = 50;
      var circlesAmmount = 30;

      var xoff = 0.0;
      var yoff = 0.0;

      var getRandClr = function() {
        return s.random(255);
      };

      var getNoiseClr = function(up) {
        xoff += 1;
        return s.map(s.noise(xoff), 0, 1, 0, up);
      };

      var getNoise = function(up) {
        yoff += 1;
        return s.map(s.noise(yoff), 0, 1, 0, up);
      };

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
        var waveform = fft.waveform();
        var lvl = mic.getLevel();
        s.background(getNoiseClr(10), getNoiseClr(42), getNoiseClr(20));
        s.noStroke();
        s.fill(0, 200, 0);
        /*
        for (var i = 0; i < spectrum.length; i++) {
          var x = s.map(i, 0, spectrum.length, 0, s.width);
          var h = -s.height + s.map(spectrum[i], 0, 255, s.height, 0);
          s.rect(x, s.height, s.width / spectrum.length, h);
        }
        */

        // Triangles
        for (var i = 0; i < trianglesAmmount; i++) {
          var minValue = _.min(spectrum, function(item) {
            return item;
          });
          var maxValue = _.max(spectrum, function(item) {
            return item;
          });
          var x1 = spectrum[i*Math.floor(spectrum.length/trianglesAmmount)];
          var y1 = spectrum[spectrum.length - i*Math.floor(spectrum.length/trianglesAmmount)];
          var x2 = spectrum[i*Math.floor(spectrum.length/(trianglesAmmount + 20))];
          var y2 = spectrum[spectrum.length - i*Math.floor(spectrum.length/(trianglesAmmount + 5))];
          var x3 = spectrum[i*Math.floor(spectrum.length/(trianglesAmmount + 10))];
          var y3 = spectrum[spectrum.length - i*Math.floor(spectrum.length/(trianglesAmmount + 7))];

          if (x1 < 1) {
            x1 = minValue + s.random(maxValue);
          }
          if (y1 < 1) {
            y1 = minValue + s.random(maxValue);
          }
          if (x2 < 1) {
            x2 = minValue + s.random(maxValue);
          }
          if (y2 < 1) {
            y2 = minValue + s.random(maxValue);
          }
          if (x3 < 1) {
            x3 = minValue + s.random(maxValue);
          }
          if (y3 < 1) {
            y3 = minValue + s.random(maxValue);
          }

          x1 = s.map(x1, minValue, maxValue, 0, 255);
          y1 = s.map(y1, minValue, maxValue, 0, 255);
          x2 = s.map(x2, minValue, maxValue, 0, 255);
          y2 = s.map(y2, minValue, maxValue, 0, 255);
          x3 = s.map(x3, minValue, maxValue, 0, 255);
          y3 = s.map(y3, minValue, maxValue, 0, 255);

          x1 = s.map(x1, 0, 255, 0, s.width);
          y1 = s.map(y1, 0, 255, 0, s.height);
          x2 = s.map(x2, 0, 255, 0, s.width);
          y2 = s.map(y2, 0, 255, 0, s.height);
          x3 = s.map(x3, 0, 255, 0, s.width);
          y3 = s.map(y3, 0, 255, 0, s.height);

          var d1 = getNoise(s.width - 100) + s.map(x1, 0, s.width, 0, 100);
          var d2 = getNoise(s.width - 100) + s.map(y1, 0, s.height, 0, 100);
          var d3 = getNoise(s.width - 100) + s.map(x2, 0, s.width, 0, 100);
          var d4 = getNoise(s.width - 100) + s.map(y2, 0, s.height, 0, 100);
          var d5 = getNoise(s.width - 100) + s.map(x3, 0, s.width, 0, 100);
          var d6 = getNoise(s.width - 100) + s.map(y3, 0, s.height, 0, 100);

          s.noFill();
          s.stroke(getRandClr(), getRandClr(), getRandClr());
          s.strokeWeight(1 + s.random(10));
          // s.triangle(x1, y1, x2, y2, x3, y3);
          s.triangle(d1, d2, d3, d4, d5, d6);
        }

        // Cirles
        for (var i = 0; i < circlesAmmount; i++) {
          var minValue = _.min(waveform, function(item) {
            return item;
          });
          var maxValue = _.max(waveform, function(item) {
            return item;
          });
          var x1 = waveform[i*Math.floor(waveform.length/circlesAmmount)];
          var y1 = waveform[waveform.length - i*Math.floor(waveform.length/circlesAmmount)];

          x1 = s.map(x1, minValue, maxValue, 0, 255);
          y1 = s.map(y1, minValue, maxValue, 0, 255);

          x1 = s.map(x1, 0, 255, 0, s.width);
          y1 = s.map(y1, 0, 255, 0, s.height);

          s.stroke(getRandClr(), getRandClr(), getRandClr());
          s.fill(getRandClr(), getRandClr(), getRandClr());
          var r = 5 + s.random(50);
          s.ellipse(x1, y1, r, r);
        }

      };

      return s;
    };

    app.p = new p5(app.s, $('#app_wrapper')[0]);
  };

  window.app = app;
})();
