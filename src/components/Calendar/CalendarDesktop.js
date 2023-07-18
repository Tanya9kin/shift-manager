import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaFileImage } from "react-icons/fa";
import {
  format,
  startOfToday,
  endOfMonth,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  isToday,
  isSameMonth,
  isEqual,
  parse,
  add,
  sub,
  isSameDay,
  getMonth,
} from "date-fns";
import state from "../../state";

import { Datepicker, Input, Collapse, initTE } from "tw-elements";
import DayOverview from "./DayOverview";

const week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarDesktop() {
  const [data, setData] = useState([]);
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  useEffect(() => {
    initTE({ Datepicker, Input, Collapse });
    const month = getMonth(selectedDay) + 1;

    const fetchEvents = async () => {
      const data = await fetch(`http://localhost:8080/events/${month}`);
      const json = await data.json();
      console.log(json);
      setData(json);
    };

    fetchEvents().catch(console.error);
  }, [currentMonth]);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function classNamesForDays(day) {
    const dayIsToday = isToday(day);
    const dayIsSelected = isEqual(day, selectedDay);
    const dayFromCurrentMonth = isSameMonth(day, firstDayCurrentMonth);
    if (dayFromCurrentMonth && !dayIsToday && !dayIsSelected) {
      return "  text-gray-900";
    } else if (!dayIsToday && !dayIsSelected) {
      return " text-gray-400";
    } else if (!dayIsToday && dayIsSelected) {
      return " text-white bg-gray-700 font-semibold";
    } else if (dayIsToday && dayIsSelected) {
      return " bg-red-500 text-white font-semibold";
    } else if (dayIsToday && !dayIsSelected) {
      return " text-red-500 font-semibold";
    }
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function prevMonth() {
    const firstDayPrevMonth = sub(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
  }

  const shifts = state.events;

  // const shifts = data;

  let selectedDayShifts = shifts.filter((shifts) =>
    isSameDay(shifts.date, selectedDay)
  );

  function Events({ day }) {
    return (
      <div>
        {shifts.map(
          (shift) =>
            isSameDay(shift.date, day) && (
              <div
                key={shift.id}
                className="flex place-content-between bg-info-900 text-white rounded p-1 text-sm mb-1"
              >
                <span className="event-name">{shift.type}</span>
              </div>
            )
        )}
      </div>
    );
  }

  function CalendarFull() {
    return (
      <div className="container mx-auto mt-10">
        <div className="wrapper bg-white rounded shadow w-full ">
          <div className="header flex justify-between border-b p-2">
            <h2 className="flex-auto font-semibold text-grey-900">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>{" "}
            <div className="flex items-center">
              <button
                className="flex justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={prevMonth}
              >
                <span className="sr-only">Prev Month</span>
                <FaChevronLeft
                  className="w-5 h-5"
                  aria-hidden="true"
                ></FaChevronLeft>
              </button>
              <button
                className="flex justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={nextMonth}
              >
                <span className="sr-only">Next Month</span>
                <FaChevronRight
                  className="w-5 h-5"
                  aria-hidden="true"
                ></FaChevronRight>
              </button>
            </div>
          </div>
          <div className="w-full grid grid-cols-7 mt-3 text-xs leading-6 text-center text-gray-500">
            <div className="p-2 border-r">Sun</div>
            <div className="p-2 border-r">Mon</div>
            <div className="p-2 border-r">Tue</div>
            <div className="p-2 border-r">Wen</div>
            <div className="p-2 border-r">Thu</div>
            <div className="p-2 border-r">Fri</div>
            <div className="p-2 border-r">Sat</div>
          </div>
          <div className="grid grid-cols-7 mt-2 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={
                  "border p-1 overflow-auto transition cursor-pointer duration-300 ease hover:bg-gray-200 "
                }
                onClick={() => setSelectedDay(day)}
              >
                <div className="flex flex-col h-20 w-full mx-auto ">
                  <div className=" text-center top h-4 w-full mb-2">
                    <span
                      className={
                        "mx-auto flex h-6 w-6 items-center justify-center rounded-full" +
                        classNamesForDays(day)
                      }
                    >
                      {day.getDate()}
                    </span>
                  </div>
                  <div className="bottom flex-grow h-20 py-1 w-full cursor-pointer">
                    <Events day={day} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-1 ml-2 mr-5">
      <div className="col-start-1 col-span-4">
        <p>{!data ? "Loading..." : "Got it!"}</p>
        <CalendarFull />
      </div>
      <div className="col-start-5 col-span-2">
        <DayOverview day={selectedDay} dayEvents={selectedDayShifts} />
      </div>
    </div>
  );
}
export default CalendarDesktop;
