"use client";

import * as React from "react";

export function useInView<T extends Element>(options?: IntersectionObserverInit): [React.RefObject<T | null>, boolean] {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px", ...options }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return [ref, inView];
}

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

export function Reveal({ as = "div", delay = 0, className = "", children, style, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

interface SectionTagProps {
  tag: string;
  title: string;
  lead?: string;
  num?: string;
}
export function SectionHead({ tag, title, lead, num }: SectionTagProps) {
  return (
    <div className="section-head">
      <Reveal className="section-tag">
        <span className="dot" />
        <span>{tag}</span>
        {num && <span className="section-num">{num}</span>}
      </Reveal>
      <Reveal as="h2" delay={80} className="section-title">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={140} className="section-lead">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
