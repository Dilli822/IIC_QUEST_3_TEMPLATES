import React, { useState } from "react";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Replace these with your own images or URLs
const seasonImages = {
  spring:
    "https://thumbs.dreamstime.com/b/young-tree-branches-close-up-concept-early-spring-seasons-weather-modern-wallpaper-banner-design-selective-natural-focus-92065458.jpg?w=992",
  summer:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFl0BLx2vZmqi0h4hcHm2q1E4FqR09i0iZUw&s",
  autumn:
    "https://thumbs.dreamstime.com/b/orange-autum-leaves-illustration-yellow-canopy-glow-picturesque-nature-foliage-orange-autum-leaves-orange-autum-leaves-362137934.jpg?w=992",
  winter:
    "https://thumbs.dreamstime.com/b/winter-snow-falling-log-cabin-san-isabel-national-forest-old-storm-blizzard-colorado-mountains-pine-trees-54920149.jpg?w=992",
};

function getSeason(date) {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function Calender() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const season = getSeason(currentMonth);
  const seasonImage = seasonImages[season];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

  const renderHeader = () => (
    <div className="flex justify-between items-center px-4 py-2">
      <Button variant="outline" onClick={prevMonth}>
        <ChevronLeft />
      </Button>
      <h2 className="text-xl font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <Button variant="outline" onClick={nextMonth}>
        <ChevronRight />
      </Button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const start = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-sm text-gray-500">
          {format(addDays(start, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    const today = new Date();

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isToday = isSameDay(day, today);
        const isCurrentMonth = isSameMonth(day, monthStart);
        days.push(
          <div
            key={day.toString()}
            className={`p-2 text-center rounded-full text-sm ${
              isCurrentMonth ? "text-black" : "text-gray-300"
            } ${
              isToday ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200"
            }`}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <Card className="max-w-md mx-auto p-0 overflow-hidden shadow-md">
      <img
        src={seasonImage}
        alt="Season Banner"
        className="w-full h-60 object-cover"
      />
      <div className="p-4 space-y-4">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </Card>
  );
}

export default Calender;
