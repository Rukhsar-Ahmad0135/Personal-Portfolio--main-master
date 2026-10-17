import { onCLS, onLCP, onTTFB, onFCP, onINP, type Metric } from 'web-vitals';

/**
 * Web Vitals monitoring — logs Core Web Vitals so we can verify the hero
 * and laptop finish rendering before the user starts scrolling.
 * Metrics: LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift),
 * TTFB (Time To First Byte), FCP (First Contentful Paint), INP (Interaction to Next Paint).
 */
function report(metric: Metric) {
  const color =
    metric.rating === 'good'
      ? 'color:#10b981'
      : metric.rating === 'needs-improvement'
        ? 'color:#f59e0b'
        : 'color:#ef4444';
  // eslint-disable-next-line no-console
  console.log(
    `%c[web-vitals] ${metric.name}: ${metric.value.toFixed(1)} (${metric.rating})`,
    `${color};font-weight:600`,
    metric,
  );
  // Expose latest values on window for debugging / dashboards.
  const w = window as unknown as { __webVitals?: Record<string, Metric> };
  w.__webVitals = { ...(w.__webVitals ?? {}), [metric.name]: metric };
}

export function initWebVitals() {
  onLCP(report);
  onCLS(report);
  onTTFB(report);
  onFCP(report);
  onINP(report);
}
