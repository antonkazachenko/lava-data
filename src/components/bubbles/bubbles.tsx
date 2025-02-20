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

  // Initialize bubbles with random positions and increased velocities
  useEffect(() => {
    if (containerRef.current) {
      // For testing, increase container height so bubbles have more room.
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height: height + 200 }); // add extra vertical space

      const newBubbles = Array(3)
        .fill(null)
        .map(() => ({
          x: Math.random() * width,
          y: Math.random() * (height + 200),
          vx: (Math.random() - 0.5) * 8, // increased velocity multiplier
          vy: (Math.random() - 0.5) * 8,
          radius: 75, // half of 150px bubble size
        }));
      setBubbles(newBubbles);
    }
  }, []);

  // Animation loop with wall and bubble-to-bubble collisions
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setBubbles((prevBubbles) => {
        // Clone bubbles for updates
        const newBubbles = prevBubbles.map((b) => ({ ...b }));

        // Update positions and handle wall collisions
        newBubbles.forEach((bubble) => {
          bubble.x += bubble.vx;
          bubble.y += bubble.vy;

          // Wall collisions with damping
          if (bubble.x < bubble.radius) {
            bubble.x = bubble.radius;
            bubble.vx = Math.abs(bubble.vx) * 0.9;
          }
          if (bubble.x > containerSize.width - bubble.radius) {
            bubble.x = containerSize.width - bubble.radius;
            bubble.vx = -Math.abs(bubble.vx) * 0.9;
          }
          if (bubble.y < bubble.radius) {
            bubble.y = bubble.radius;
            bubble.vy = Math.abs(bubble.vy) * 0.9;
          }
          if (bubble.y > containerSize.height - bubble.radius) {
            bubble.y = containerSize.height - bubble.radius;
            bubble.vy = -Math.abs(bubble.vy) * 0.9;
          }
        });

        // Check for collisions between bubbles
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < newBubbles.length; i++) {
          // eslint-disable-next-line no-plusplus
          for (let j = i + 1; j < newBubbles.length; j++) {
            const a = newBubbles[i];
            const b = newBubbles[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = a.radius + b.radius;
            if (distance < minDist && distance > 0) {
              // Normalize collision vector
              const nx = dx / distance;
              const ny = dy / distance;
              // Calculate overlap
              const overlap = (minDist - distance) / 2;
              // Separate the bubbles
              a.x -= overlap * nx;
              a.y -= overlap * ny;
              b.x += overlap * nx;
              b.y += overlap * ny;

              // Calculate relative velocity along the normal
              const dvx = a.vx - b.vx;
              const dvy = a.vy - b.vy;
              const vn = dvx * nx + dvy * ny;

              // Only resolve if they’re moving toward each other
              if (vn < 0) {
                const impulse = -vn; // assuming equal mass = 1
                a.vx += impulse * nx;
                a.vy += impulse * ny;
                b.vx -= impulse * nx;
                b.vy -= impulse * ny;
              }
            }
          }
        }
        return newBubbles;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
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
            transform: `translate(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px)`,
          }}
        >
          <h2>TITLE</h2>
          <p>Lorem ipsum dolor sit aet...</p>
        </div>
      ))}
    </div>
  );
};

export default Bubbles;
