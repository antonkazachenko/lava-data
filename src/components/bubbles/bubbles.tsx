import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import Matter, { Body } from 'matter-js';
import styles from './bubbles.module.css';
import { Item, fetchSingleRandomItem } from '../../api/items';

interface BubblesProps {
  items: Item[];
  speed: number;
}

interface BubbleRenderState {
  id: number;
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

    const bubbleRadius = 75;

    const circleBodies = items.map((item) => {
      const circle = Matter.Bodies.circle(
        Math.random() * width,
        Math.random() * height,
        bubbleRadius,
        {
          restitution: 0.9,
          friction: 0,
          frictionAir: 0,
        },
      );

      (circle as BodyWithItem).itemData = item;

      Matter.Body.setVelocity(circle, {
        x: -speedRef.current * (0.5 + Math.random() * 0.5),
        y: (Math.random() - 0.5) * 2,
      });
      return circle;
    });

    Matter.World.add(engine.world, circleBodies);
    Matter.Runner.run(runner, engine);

    let animationFrameId: number;
    const animate = () => {
      circleBodies.forEach((body) => {
        Matter.Body.setVelocity(body, {
          x: -speedRef.current,
          y: body.velocity.y,
        });

        if (body.position.x < -bubbleRadius) {
          // Change the x position to spawn further away
          Matter.Body.setPosition(body, {
            x: width + bubbleRadius * 3, // Spawn further off-screen
            y: Math.random() * height,
          });

          (async () => {
            const newItem = await fetchSingleRandomItem();
            if (newItem) {
              (body as BodyWithItem).itemData = newItem;
            }
          })();
        }
      });

      const newBubbles = circleBodies.map((body) => ({
        id: body.id,
        x: body.position.x,
        y: body.position.y,
        radius: bubbleRadius,
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
  }, [items]);

  return (
    <div ref={containerRef} className={styles.bubblesContainer}>
      {bubbles
        .filter((b) => b.itemData)
        .map((b) => (
          <div
            key={b.id}
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
