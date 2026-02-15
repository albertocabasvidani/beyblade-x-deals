'use client';

import { useEffect, useRef } from 'react';
import type { PricePoint } from '@/lib/types';

interface PriceHistoryChartProps {
  historyJp: PricePoint[];
  historyIt: PricePoint[];
}

export function PriceHistoryChart({ historyJp, historyIt }: PriceHistoryChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<unknown>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (historyJp.length === 0 && historyIt.length === 0) return;

    let mounted = true;

    async function loadChart() {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);

      if (!mounted || !canvasRef.current) return;

      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }

      const allDates = [...new Set([...historyJp.map(p => p.date), ...historyIt.map(p => p.date)])].sort();

      const jpMap = new Map(historyJp.map(p => [p.date, p.price_eur]));
      const itMap = new Map(historyIt.map(p => [p.date, p.price_eur]));

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: allDates.map(d => {
            const parts = d.split('-');
            return `${parts[2]}/${parts[1]}`;
          }),
          datasets: [
            {
              label: 'Amazon JP',
              data: allDates.map(d => jpMap.get(d) ?? null),
              borderColor: '#dc2626',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              fill: false,
              tension: 0.3,
              pointRadius: 3,
              spanGaps: true,
            },
            {
              label: 'Amazon IT',
              data: allDates.map(d => itMap.get(d) ?? null),
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              fill: false,
              tension: 0.3,
              pointRadius: 3,
              spanGaps: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: €${ctx.parsed.y?.toFixed(2)}`,
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => `€${value}`,
              },
            },
          },
        },
      });
    }

    loadChart();

    return () => {
      mounted = false;
      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }
    };
  }, [historyJp, historyIt]);

  if (historyJp.length === 0 && historyIt.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-200 py-8 text-sm text-slate-400">
        Nessuno storico prezzi disponibile
      </div>
    );
  }

  return (
    <div className="h-64">
      <canvas ref={canvasRef} />
    </div>
  );
}
