import React, { useState } from "react";
import CalendarMobile from "./CalendarMobile";
import CalendarDesktop from "./CalendarDesktop";

function Calendar() {
  const mql = window.matchMedia("(max-width: 900px)");
  const [mobileView, setMobileView] = useState(mql.matches);

  mql.addEventListener("change", (e) => {
    setMobileView(mql.matches);
  });

  return <div>{mobileView ? <CalendarMobile /> : <CalendarDesktop />}</div>;
}

export default Calendar;
