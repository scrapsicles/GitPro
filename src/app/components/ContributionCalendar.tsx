"use client";

import React from "react";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import CalendarHeatmap from "react-calendar-heatmap";

interface ContributionCalendarProps {
  calendarData: {
    totalContributions: number;
    weeks: Array<{
      firstDay: string;
      contributionDays: Array<{
        color: string;
        contributionCount: number;
        date: string;
        weekday: number;
      }>;
    }>;
  };
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({
  calendarData,
}) => {

  const contributions = calendarData.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
    }));

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Contribution Calendar ({calendarData.totalContributions} contributions)
      </h2>
      <CalendarHeatmap
        startDate={oneYearAgo}
        endDate={today}
        values={contributions}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 20) return "color-scale-4";
          if (value.count >= 10) return "color-scale-3";
          if (value.count >= 5) return "color-scale-2";
          if (value.count >= 1) return "color-scale-1";
          return "color-empty";
        }}
        tooltipDataAttrs={(value) => ({
          "data-tooltip-id": "calendar-tooltip",
          "data-tooltip-content": value.date
            ? `${value.date}: ${value.count} contributions`
            : "",
        })}
        showWeekdayLabels
      />
      <ReactTooltip id="calendar-tooltip" />
      <style jsx global>{`
        .color-empty {
          fill: #ebedf0;
        }
        .color-scale-1 {
          fill: #9be9a8;
        }
        .color-scale-2 {
          fill: #40c463;
        }
        .color-scale-3 {
          fill: #30a14e;
        }
        .color-scale-4 {
          fill: #216e39;
        }
      `}</style>
    </div>
  );
};

export default ContributionCalendar;
