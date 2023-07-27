import React, { useState, useEffect } from "react";
import { useTeamContext } from "../Team/TeamContextProvider";
import { Ripple, Input, initTE } from "tw-elements";

export default function TeamMemberModal() {
  useEffect(() => {
    initTE({ Ripple, Input });
  }, []);

  const { chosenTeamMember, setModalOpen } = useTeamContext();

  const [currentMemberData, setCurrentMemberData] = useState("");

  useEffect(() => {
    setCurrentMemberData({ ...chosenTeamMember });
  }, [chosenTeamMember]);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCloseModal() {
    setModalOpen(false);
  }

  async function updateMember() {
    const data = await fetch(
      `http://localhost:8080/team/${chosenTeamMember.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: currentMemberData.first_name,
          last_name: currentMemberData.last_name,
          email: currentMemberData.email,
          phone: currentMemberData.phone,
          roles: currentMemberData.roles,
        }),
      }
    );
    const json = await data.json();
    return json;
  }

  function checkInputsValidity() {
    if (
      currentMemberData.first_name.length < 2 ||
      currentMemberData.last_name.length < 2 ||
      currentMemberData.email.length < 2 ||
      currentMemberData.phone.length < 2
    ) {
      return false;
    }
    return true;
  }

  function handleSaveChanges() {
    console.log("Save clicked");
    setLoading(true);
    try {
      if (checkInputsValidity()) {
        const updatedMemberData = updateMember();
        setCurrentMemberData(updatedMemberData);
      } else {
        throw new Error("Inputs are not valid");
      }
      setEditMode(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleGetIntoEditMode() {
    console.log("Getting into edit mode...");
    setEditMode(true);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCurrentMemberData((currentMemberData) => ({
      ...currentMemberData,
      [name]: value,
    }));
  };

  return (
    <div
      className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-neutral-300 bg-opacity-50 dark:bg-neutral-900 dark:bg-opacity-50"
      data-te-backdrop="static"
      tabIndex="-1"
    >
      <div className="pointer-events-none relative w-auto translate-y-[-50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            {/* <!--Modal title--> */}
            <h5
              className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
              id={`modallabel-${chosenTeamMember.first_name}`}
            >
              {chosenTeamMember.first_name + " " + chosenTeamMember.last_name}
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              aria-label="Close"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* <!--Modal body--> */}
          <div className="relative flex-auto p-4 justify-around justify-items-center items-center">
            <img
              src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
              className="w-32 rounded-full mb-3 inline-block"
              alt="Avatar"
            />
            {currentMemberData && (
              <form>
                <div className="relative mb-3" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 disabled:bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="firstNameInput"
                    name="first_name"
                    value={currentMemberData.first_name}
                    disabled={!editMode}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="firstNameInput"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 disabled:bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="lastNameInput"
                    name="last_name"
                    value={currentMemberData.last_name}
                    disabled={!editMode}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="lastNameInput"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Last Name
                  </label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                  <input
                    type="email"
                    className="peer block min-h-[auto] w-full rounded border-0 disabled:bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="emailInput"
                    name="email"
                    value={currentMemberData.email}
                    disabled={!editMode}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="emailInput"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    E-mail
                  </label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                  <input
                    type="tel"
                    className="peer block min-h-[auto] w-full rounded border-0 disabled:bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="phoneInput"
                    name="phone"
                    value={currentMemberData.phone}
                    disabled={!editMode}
                    readOnly={!editMode}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="phoneInput"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Phone
                  </label>
                </div>
                {/* <TeamMemberRolesTable
                memberId={currentMember.id}
                editMode={editMode}
                key={currentMember.id}
              /> */}
              </form>
            )}
          </div>

          {/* <!--Modal footer--> */}
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleCloseModal}
            >
              Close
            </button>
            {editMode ? (
              <button
                type="button"
                className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleGetIntoEditMode}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
