import React, {
  FC, useState, useEffect, useRef,
} from 'react';
import styles from './bubbles.module.css';

interface BubbleState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const Bubbles: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleState[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Initialize bubbles with random positions and velocities
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });

      const newBubbles = Array(3).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: 75, // Half of 150px bubble size
      }));
      setBubbles(newBubbles);
    }
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setBubbles((prevBubbles) => prevBubbles.map((bubble) => {
        let {
          // eslint-disable-next-line prefer-const
          x, y, vx, vy, radius,
        } = bubble;

        // Update position
        x += vx;
        y += vy;

        // Wall collision with damping
        if (x < radius) {
          x = radius;
          vx = Math.abs(vx) * 0.9;
        }
        if (x > containerSize.width - radius) {
          x = containerSize.width - radius;
          vx = -Math.abs(vx) * 0.9;
        }
        if (y < radius) {
          y = radius;
          vy = Math.abs(vy) * 0.9;
        }
        if (y > containerSize.height - radius) {
          y = containerSize.height - radius;
          vy = -Math.abs(vy) * 0.9;
        }

        return {
          ...bubble, x, y, vx, vy,
        };
      }));

      // eslint-disable-next-line no-use-before-define
      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [containerSize]);

  return (
    <div ref={containerRef} className={styles.bubblesContainer}>
      {bubbles.map((bubble, index) => (
        <div
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
          className={styles.bubble}
          style={{
            transform: `translate(${bubble.x - 75}px, ${bubble.y - 75}px)`,
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
