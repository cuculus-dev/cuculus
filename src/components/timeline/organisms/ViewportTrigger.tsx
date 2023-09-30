'use client';

import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  onInView: () => void;
  interval?: number;
  children: ReactNode;
};

/**
 * 画面内に入った時にonInViewを呼び出す。
 * intervalが1以上の場合、画面内に表示されてる間、定期的にonInViewを呼び出す。
 * @param onInView 呼び出す関数
 * @param interval 定期的に呼び出す間隔（秒）
 * @param children 子要素
 * @constructor
 */
function ViewportTrigger({ onInView, interval = 0, children }: Props) {
  const ref = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // intervalが1以上の場合、定期的にonInViewを呼び出す
          if (interval > 0) {
            intervalRef.current = setInterval(onInView, interval * 1000); // 秒数をミリ秒に変換
          } else {
            // intervalが0以下の場合、一度だけonInViewを呼び出す
            onInView();
          }
        } else {
          // ビューから外れた場合、定期的な呼び出しを停止
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      },
      { threshold: 0.1 },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [onInView, interval]);

  return <div ref={ref}>{children}</div>;
}

export default ViewportTrigger;
