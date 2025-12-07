import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import Matter, { Body } from 'matter-js';
import styles from './bubbles.module.css';
import { Item, fetchSingleRandomItem } from '../../api/items';
import { categoryColors, defaultColor } from '../../utils/colorMapping';

interface BubblesProps {
  items: Item[];
  speed: number;
  displayMode: 'title' | 'raw' | 'source';
  onBubbleClick: (item: Item) => void;
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

const getDomain = (websiteUrl: string) => {
  try {
    const url = new URL(websiteUrl);
    return url.hostname.replace(/^www\./i, '');
  } catch (e) {
    return websiteUrl;
  }
};

const getRawPreview = (text: string) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  return words.join(' ');
};

const Bubbles: FC<BubblesProps> = ({
  items, speed, displayMode, onBubbleClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleRenderState[]>([]);
  const isHoveringRef = useRef(false);
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
        const adjustedSpeed = speedRef.current * (isHoveringRef.current ? 0.35 : 1);

        if (adjustedSpeed === 0) {
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
        } else {
          Matter.Body.setVelocity(body, {
            x: -adjustedSpeed,
            y: body.velocity.y,
          });
        }

        if (body.position.x < -bubbleRadius) {
          Matter.Body.setPosition(body, {
            x: width + bubbleRadius * 3,
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
        .map((b) => {
          const color = categoryColors[b.itemData.Predicted_Label] || defaultColor;
          const bubbleStyle = {
            transform: `translate(${b.x - b.radius}px, ${b.y - b.radius}px)`,
            boxShadow: `inset 0 0 40px -10px ${color}, 0 0 15px -5px ${color}`,
          };

          let text = b.itemData.Predicted_Label;

          if (displayMode === 'raw') {
            text = getRawPreview(b.itemData.cleaned_website_text) || 'Raw Data';
          } else if (displayMode === 'source') {
            text = getDomain(b.itemData.website_url) || 'Source';
          }

          return (
            <div
              key={b.id}
              className={styles.bubble}
              style={bubbleStyle}
              role="button"
              tabIndex={0}
              onClick={() => onBubbleClick(b.itemData)}
              onMouseEnter={() => { isHoveringRef.current = true; }}
              onMouseLeave={() => { isHoveringRef.current = false; }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onBubbleClick(b.itemData);
                }
              }}
            >
              <h2>
                {text}
              </h2>
            </div>
          );
        })}
    </div>
  );
};

export default Bubbles;
