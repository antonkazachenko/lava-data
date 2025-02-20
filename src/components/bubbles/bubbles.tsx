import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import Matter from 'matter-js';
import styles from './bubbles.module.css';

interface BubbleRenderState {
  x: number;
  y: number;
  radius: number;
}

const Bubbles: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleRenderState[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    // 1) Create Matter.js engine, world, and runner
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();

    // Disable gravity so bubbles float
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    // 2) Create boundary walls to keep circles in view
    const wallThickness = 50;
    const walls = [
      Matter.Bodies
        .rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies
        .rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies
        .rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Matter.Bodies
        .rectangle(
          width + wallThickness / 2,
          height / 2,
          wallThickness,
          height,
          { isStatic: true },
        ),
    ];

    // 3) Create circle bodies for the bubbles with initial velocities.
    const desiredSpeed = 5;
    const circleBodies = Array(5)
      .fill(null)
      .map(() => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const circle = Matter.Bodies.circle(x, y, 75, {
          restitution: 0.9, // bounciness
          friction: 0,
          frictionAir: 0, // no air friction so speed is maintained
        });
        // Set an initial random velocity
        Matter.Body.setVelocity(circle, {
          x: (Math.random() - 0.5) * desiredSpeed,
          y: (Math.random() - 0.5) * desiredSpeed,
        });
        return circle;
      });

    // 4) Add walls and bubbles to the Matter world
    Matter.World.add(engine.world, [...walls, ...circleBodies]);

    // 5) Start the Matter.js engine
    Matter.Runner.run(runner, engine);

    // 6) Animation loop: update React state with positions
    let animationFrameId: number;
    const animate = () => {
      // Renormalize velocities to enforce constant speed
      circleBodies.forEach((body) => {
        const { x: vx, y: vy } = body.velocity;
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > 0) {
          const scale = desiredSpeed / speed;
          Matter.Body.setVelocity(body, {
            x: body.velocity.x * scale,
            y: body.velocity.y * scale,
          });
        }
      });

      // Update React state with latest positions
      const newBubbles = circleBodies.map((body) => ({
        x: body.position.x,
        y: body.position.y,
        radius: 75,
      }));
      setBubbles(newBubbles);

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 7) Cleanup on unmount
    // eslint-disable-next-line consistent-return
    return () => {
      cancelAnimationFrame(animationFrameId);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.bubblesContainer}>
      {bubbles.map((b, i) => (
        <div
          /* eslint-disable-next-line react/no-array-index-key */
          key={i}
          className={styles.bubble}
          style={{
            transform: `translate(${b.x - b.radius}px, ${b.y - b.radius}px)`,
          }}
        >
          <h2>TITLE</h2>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      ))}
    </div>
  );
};

export default Bubbles;
