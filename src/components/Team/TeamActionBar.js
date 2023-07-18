import React, { useEffect, useState } from "react";
import { Tab, initTE } from "tw-elements";
function SearchBar() {
  return (
    <div className="flex justify-center w-full">
      <div className="relative flex w-72 flex-wrap items-stretch">
        <input
          type="search"
          id="search-team-members"
          className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
        />

        {/* <!--Search icon--> */}
        <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

function TeamActionBar() {
  useEffect(() => {
    initTE({ Tab });
  }, []);
  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await fetch(`http://localhost:8080/roles`);
      const json = await data.json();
      setAllRoles(json.map((role) => role.role_type));
    };

    fetchRoles().catch(console.error);
  }, []);

  function handleClick(event) {
    event.preventDefault();
    // console.log("The link was clicked.");
    const button = event.target;
    console.log(button.getAttribute("id"));
  }

  return (
    <div>
      <SearchBar />
      <div className="flex flex-auto justify-center flex-wrap">
        <button
          id="all"
          onClick={(event) => handleClick(event)}
          className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
        >
          All
        </button>
        {allRoles.map((role) => (
          <button
            onClick={(event) => handleClick(event)}
            key={role}
            id={role}
            className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TeamActionBar;
