/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, TrendingUp } from 'lucide-react';

interface WorkHoursChartProps {
  data: {
    day: string;
    hours: number;
  }[];
}

export const WorkHoursChart: React.FC<WorkHoursChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxHours = Math.max(...data.map(d => d.hours), 8);
  const chartHeight = 160;
  const paddingBottom = 30;

  const totalHours = data.reduce((acc, curr) => acc + curr.hours, 0);
  const averageHours = (totalHours / data.length).toFixed(1);

  return (
    <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 shadow-xl text-left">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            Weekly Work Logs
          </h3>
          <p className="text-2xl font-bold font-sans text-white mt-1">
            {totalHours} h <span className="text-xs font-normal text-slate-400">logged this week</span>
          </p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-xl flex items-center gap-1 text-amber-500 text-xs font-medium">
          <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
          Avg: {averageHours} h/day
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative pt-6">
        <div className="flex items-end justify-between h-[180px] w-full gap-2">
          {data.map((item, index) => {
            // calculate height proportional to standard maximum logged hours
            const barHeightPercent = (item.hours / maxHours) * 100;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center group cursor-pointer relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                <div
                  className={`absolute -top-12 z-10 px-2.5 py-1.5 rounded-lg bg-amber-500 border border-amber-400 text-black text-xs font-bold shadow-lg transition-all duration-200 pointer-events-none flex flex-col items-center ${
                    isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'
                  }`}
                >
                  <span>{item.hours} hrs</span>
                  <div className="w-2 h-2 bg-amber-400 rotate-45 mt-[-4px]"></div>
                </div>

                {/* Grid line indicator / threshold background */}
                <div className="absolute inset-0 bg-white/5 rounded-t-lg -z-0"></div>

                {/* Animated progress Bar */}
                <div className="w-full flex justify-center items-end h-[140px] relative z-10">
                  <div
                    style={{ height: `${barHeightPercent}%` }}
                    className={`w-4/5 rounded-t-md transition-all duration-500 ease-out shadow-lg ${
                      isHovered
                        ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-amber-500/30'
                        : 'bg-gradient-to-t from-[#1b1b1e] to-white/10 shadow-black/30 border border-white/5'
                    }`}
                  ></div>
                </div>

                {/* Label text */}
                <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors mt-3 font-mono">
                  {item.day}
                </span>

                {/* Micro tick dot */}
                <div className={`mt-1.5 w-1 h-1 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-amber-400 scale-150' : 'bg-white/10'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* High performance scale lines */}
        <div className="absolute top-6 left-0 right-0 border-t border-white/5 -z-10 flex justify-between text-[10px] text-slate-600 font-mono pt-1 pointer-events-none">
          <span>Max Capacity ({maxHours}h)</span>
          <span>50%</span>
        </div>
      </div>
    </div>
  );
};
