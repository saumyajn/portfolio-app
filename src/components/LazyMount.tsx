import { useEffect, useRef, useState } from "react";

export default function LazyMount({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin: "700px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return <div ref={ref}>{visible ? children : null}</div>;
}