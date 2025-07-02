declare module "react-calendar-heatmap" {
  import * as React from "react";

  interface HeatmapValue {
    date: string;
    count: number;
  }

  interface CalendarHeatmapProps {
    startDate: Date | string;
    endDate: Date | string;
    values: HeatmapValue[];
    classForValue?: (value: HeatmapValue) => string;
    tooltipDataAttrs?: (
      value: HeatmapValue
    ) => React.HTMLAttributes<HTMLDivElement>;
    showWeekdayLabels?: boolean;
    horizontal?: boolean;
    gutterSize?: number;
    showMonthLabels?: boolean;
    showOutOfRangeDays?: boolean;
    onClick?: (value: HeatmapValue) => void;
  }

  const CalendarHeatmap: React.FC<CalendarHeatmapProps>;

  export default CalendarHeatmap;
}
