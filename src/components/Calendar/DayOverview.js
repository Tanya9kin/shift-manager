import React, { useEffect, useState } from "react";
import { FaEdit, FaFileImage, FaCheckCircle } from "react-icons/fa";
import { Collapse, Select, Input, initTE } from "tw-elements";

import { format, isSameDay } from "date-fns";

const workers = {
  Bachata: ["Tanya", "Hezi", "Lior"],
  Salsa: ["Bat-Hen", "Vova"],
  Zouk: ["Tanya", "Daniel", "Gali"],
};

function DisplayModeShift({ lesson, eventName }) {
  console.log(lesson);

  return (
    <div className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      {lesson.imageUrl ? (
        <img
          src={lesson.imageUrl}
          alt="avatar"
          className="flex w-8 h-8 rounded-full hover:drop-shadow-md"
        />
      ) : (
        <FaFileImage className="flex w-8 h-8 rounded hover:drop-shadow-md" />
      )}
      <div className="flex-auto">
        <h3 className="mt-0.5">
          <strong>{`Level: ${lesson.level}`}</strong>
        </h3>
        <p className="text-gray-900">{lesson.first_name}</p>
        <p className="text-gray-900">Helper:</p>
        <p className="mt-0.5">{`Class: ${lesson.class}`}</p>
      </div>
    </div>
  );
}

function EditModeShift({ lesson, eventName }) {
  useEffect(() => {
    initTE({ Select, Input });
  }, []);

  console.log(workers[eventName]);
  return (
    <div className="flex items-start px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="rounded-full bg-gray-300 flex h-6 w-6 items-center justify-center">
        <h2 className="m-2 font-semibold">{`${lesson.level}`}</h2>
      </div>
      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-row w-full justify-between">
          <select
            data-te-select-init
            data-te-select-placeholder={lesson.first_name}
          >
            {workers[eventName].map((worker) => (
              <option value={worker} key={worker}>
                {worker}
              </option>
            ))}
          </select>
          <label data-te-select-label-ref>Instructor</label>
          {lesson.imageUrl ? (
            <img
              src={lesson.imageUrl}
              alt="avatar"
              className="flex w-8 h-8 rounded-full hover:drop-shadow-md"
            />
          ) : (
            <FaFileImage className="flex w-8 h-8 rounded hover:drop-shadow-md" />
          )}
        </div>
        <div className="relative mt-3" data-te-input-wrapper-init>
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="helperInput"
            placeholder=""
          />
          <label
            htmlFor="helperInput"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Helper
          </label>
        </div>
        <p className="mt-0.5">{`Class: ${lesson.class}`}</p>
      </div>
    </div>
  );
}

function ShiftsAccordion({ event, editMode }) {
  console.log(event.type);
  return (
    <div
      id={`accordion${event.id}`}
      className="border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800"
    >
      <h2 className="mb-0" id={`heading${event.id}`}>
        <button
          className="group relative flex w-full items-center bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
          type="button"
          data-te-collapse-init
          data-te-target={`#collapsible${event.id}`}
          aria-expanded="true"
          aria-controls={event.id}
        >
          {event.type}
          <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={`collapsible${event.id}`}
        className="!visible"
        data-te-collapse-item
        data-te-collapse-show
        aria-labelledby={`heading${event.id}`}
        data-te-parent={`#accordion${event.id}`}
      >
        <div className="px-5 py-4">
          {!editMode &&
            event.workers &&
            event.workers.map((worker) => (
              <DisplayModeShift
                lesson={worker}
                eventName={event.type}
                key={`${event.type}_${event.id}_${worker.id}_display`}
              />
            ))}
          {editMode &&
            event.workers &&
            event.workers.map((worker) => (
              <EditModeShift
                lesson={worker}
                eventName={event.type}
                key={`${event.type}_${event.id}_${worker.id}_edit`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default function DayOverview({ day, dayEvents, editMode, setEditMode }) {
  useEffect(() => {
    initTE({ Collapse, Select });
  }, []);

  function approveEdit() {
    // some code that approves the edit
    setEditMode(false);
  }

  return (
    <section className="mt-12 mt:mt-0 md:pl-14">
      <div className="flex w-full justify-between mb-2">
        <h2 className="font-semibold text-gray-900">
          Schedule for{" "}
          <time dateTime={format(day, "dd-MM-yyyy")}>
            {format(day, "dd MM yyyy")}
          </time>
        </h2>
        {editMode ? (
          <button onClick={approveEdit}>
            <FaCheckCircle className="w-7 h-7 rounded text-blue-500 hover:text-blue-700 hover:drop-shadow-sm" />
          </button>
        ) : (
          <button onClick={() => setEditMode(true)}>
            <FaEdit className="w-7 h-7 rounded text-blue-500 hover:text-blue-700 hover:drop-shadow-sm" />
          </button>
        )}
      </div>
      <div className="rounded-t-lg mb-10 border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        {dayEvents &&
          dayEvents.map((event) => (
            <ShiftsAccordion event={event} key={event.id} editMode={editMode} />
          ))}
      </div>
    </section>
  );
}
