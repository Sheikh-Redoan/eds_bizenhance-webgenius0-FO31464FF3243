import { useEffect, useRef } from 'react';

const MouseEffect = () => {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Symbols for the notes
    const symbols = ['\u2669', '\u266a', ' \u266b', '\u266c'];
    
    let cw = canvas.width = window.innerWidth;
    let ch = canvas.height = window.innerHeight;

    const notes = [];

    class Note {
      constructor(m) {
        this.text = symbols[~~(Math.random() * symbols.length)];
        this.x = m.x;
        this.y = m.y;
        this.fontSize = 10 + ~~(Math.random() * 40);
        this.alp = 1;
        this.speed = Math.random() + 0.5;
        this.frames = Math.random() * 360;
        this.angle = Math.sin(this.frames * (Math.PI / 180)) * Math.PI / 2;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.font = this.fontSize + "px Verdana";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(0, 0, 0, ${this.alp})`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }

      update() {
        this.frames++;
        this.fontSize += 0.1;
        this.alp -= 0.01;
        this.angle = Math.sin(this.frames * (Math.PI / 180)) * Math.PI / 2;
        this.y -= this.speed;
        this.x += Math.sin(this.frames * (Math.PI / 180));
      }
    }

    // Animation Loop
    function draw() {
      requestIdRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, cw, ch); // Clear canvas

      notes.forEach((n, index) => {
        n.update();
        n.draw();
        if (n.alp <= 0) {
          notes.splice(index, 1);
        }
      });
    }

    draw();

    // Event Handlers
    const handleResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (evt) => {
      const m = {
        x: evt.clientX,
        y: evt.clientY
      };

      // Create a new note with some probability to avoid clutter
      if (Math.random() < 0.4) {
        let note = new Note(m);
        notes.push(note);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Allows clicks to pass through
        zIndex: 50
      }}
    />
  );
};

export default MouseEffect;