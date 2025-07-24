import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import Matter, { Body } from 'matter-js';
import styles from './bubbles.module.css';
import { Item } from '../../api/items';

interface BubblesProps {
  items: Item[];
  speed: number;
}

interface BubbleRenderState {
  x: number;
  y: number;
  radius: number;
  itemData: Item;
}

interface BodyWithItem extends Body {
  itemData: Item;
}

const Bubbles: FC<BubblesProps> = ({ items, speed }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleRenderState[]>([]);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const { width, height } = containerRef.current.getBoundingClientRect();
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
    const wallThickness = 50;
    const walls = [
      Matter.Bodies.rectangle(
        width / 2,
        -wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true },
      ),
      Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true },
      ),
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true },
      ),
      Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true },
      ),
    ];

    const circleBodies = items.map((item) => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const circle = Matter.Bodies.circle(x, y, 75, {
        restitution: 0.9,
        friction: 0,
        frictionAir: 0,
      });

      (circle as BodyWithItem).itemData = item;

      Matter.Body.setVelocity(circle, {
        x: (Math.random() - 0.5) * speed,
        y: (Math.random() - 0.5) * speed,
      });
      return circle;
    });

    Matter.World.add(engine.world, [...walls, ...circleBodies]);
    Matter.Runner.run(runner, engine);

    let animationFrameId: number;
    const animate = () => {
      circleBodies.forEach((body) => {
        const { x: vx, y: vy } = body.velocity;
        const currentSpeed = Math.sqrt(vx * vx + vy * vy);
        if (currentSpeed > 0) {
          const scale = speedRef.current / currentSpeed;
          Matter.Body.setVelocity(body, {
            x: body.velocity.x * scale,
            y: body.velocity.y * scale,
          });
        }
      });

      const newBubbles = circleBodies.map((body) => ({
        x: body.position.x,
        y: body.position.y,
        radius: 75,
        itemData: (body as BodyWithItem).itemData,
      }));
      setBubbles(newBubbles);

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div ref={containerRef} className={styles.bubblesContainer}>
      {bubbles
        .filter((b) => b.itemData)
        .map((b) => (
          <div
            key={b.itemData.id}
            className={styles.bubble}
            style={{
              transform: `translate(${b.x - b.radius}px, ${b.y - b.radius}px)`,
            }}
          >
            <h2>{b.itemData.Predicted_Label}</h2>
          </div>
        ))}
    </div>
  );
};

export default Bubbles;
