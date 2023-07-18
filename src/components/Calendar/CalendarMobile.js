import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaFileImage,
} from "react-icons/fa";
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
} from "date-fns";
import DayOverview from "./DayOverview";
import state from "../../state";

// import { Datepicker, Input, initTE } from "tw-elements";
// initTE({Datepicker, Input})
const week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarMobile() {
  let today = startOfToday();

  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [editMode, setEditMode] = useState(false);

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
      return " text-white bg-gray-900 font-semibold";
    } else if (dayIsToday && dayIsSelected) {
      return " bg-red-500 text-white font-semibold";
    } else if (dayIsToday && !dayIsSelected) {
      return " text-red-500";
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

  //this will be dynamically retrieved from database per day (or per month even)
  const shifts = state.events;

  let selectedDayShifts = shifts.filter((shifts) =>
    isSameDay(shifts.date, selectedDay)
  );

  function setSelectedDayIfPossible(day) {
    if (!editMode) {
      setSelectedDay(day);
    } else {
      console.log("can't update until changes are saved");
      // return (
      //   <div
      //     className="mb-3 inline-flex w-full items-center rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
      //     role="alert"
      //   >
      //     <span className="mr-2">
      //       <svg
      //         xmlns="http://www.w3.org/2000/svg"
      //         viewBox="0 0 24 24"
      //         fill="currentColor"
      //         class="h-5 w-5"
      //       >
      //         <path
      //           fillRule="evenodd"
      //           d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
      //           clipRule="evenodd"
      //         />
      //       </svg>
      //     </span>
      //     A simple danger alert - check it out!
      //   </div>
      // );
    }
  }

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-grey-900">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
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
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className="border-t border-gray-200 py-1.5"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDayIfPossible(day)}
                    className={
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full" +
                      classNamesForDays(day) +
                      (!isEqual(day, selectedDay) ? " hover:bg-gray-100" : "")
                    }
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                  <div className="w-1 h-1 mx-auto mt-1 ">
                    {shifts.some((lesson) => isSameDay(day, lesson.date)) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DayOverview
            day={selectedDay}
            dayEvents={selectedDayShifts}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarMobile;
