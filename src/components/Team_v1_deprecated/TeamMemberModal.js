import React, { useEffect, useState } from "react";
// import { FaFileImage } from "react-icons/fa";
import { Ripple, Input, initTE } from "tw-elements";
import { TeamMember, TeamMemberRole, Role } from "../../utils";
import { set } from "date-fns";

function TeamMemberModal({ member, toggleVisibilityFunc }) {
  useEffect(() => {
    initTE({ Ripple, Input });
  }, []);

  const { id, first_name, last_name, email, phone, roles } = member;

  const [currentMember, setCurrentMember] = useState(
    new TeamMember(id, first_name, last_name, email, phone, roles)
  );

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstNameInput, setFirstNameInput] = useState(first_name);
  const [lastNameInput, setLastNameInput] = useState(last_name);
  const [emailInput, setEmailInput] = useState(email);
  const [phoneInput, setPhoneInput] = useState(phone);

  function handleGetIntoEditMode() {
    console.log("Edit clicked");
    setEditMode(true);
  }

  function checkInputsValidity() {
    console.log("Checking inputs validity");
    if (
      length(firstNameInput) < 2 ||
      length(lastNameInput) < 2 ||
      length(emailInput) < 5 ||
      length(phoneInput) < 10
    ) {
      return false;
    }
    return true;
  }

  async function updateMember() {
    const data = await fetch(`http://localhost:8080/team/${currentMember.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
        phone: phoneInput,
        roles: currentMember.roles,
      }),
    });
    const json = await data.json();
    return json;
  }

  function handleSaveChanges() {
    console.log("Save clicked");
    setLoading(true);
    try {
      if (checkInputsValidity()) {
        const updatedMemberData = updateMember();
        setCurrentMember(updatedMemberData);
      } else {
        throw new Error("Inputs are not valid");
      }
      setEditMode(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function TeamMemberRolesTable({ memberId, editMode }) {
    const [allRoles, setAllRoles] = useState([]);
    const [currentMemberRoles, setCurrentMemberRoles] = useState([]);

    const [loadingTable, setloadingTable] = useState(true);

    useEffect(() => {
      const fetchMemberRoles = async () => {
        const data = await fetch(
          `http://localhost:8080/team/${memberId}/roles`
        );
        const json = await data.json();
        const roles = json.map(
          (role) => new TeamMemberRole(role.type, role.style)
        );
        console.log(
          `roles of member are: ${roles.map((r) => r.style + " " + r.type)}`
        );
        setCurrentMemberRoles(roles);
      };

      const fetchRoles = async () => {
        const data = await fetch(`http://localhost:8080/roles`);
        const json = await data.json();
        const allRolesToSet = json.map(
          (role) => new Role(role.type, role.style.name, role.team_members)
        );
        setAllRoles(allRolesToSet);
      };

      fetchMemberRoles().catch(console.error);
      fetchRoles().catch(console.error);

      setloadingTable(false);
    }, []);

    return (
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            {!loadingTable && (
              <div className="overflow-hidden">
                {currentMemberRoles &&
                  allRoles &&
                  allRoles.map((role) => (
                    <div
                      key={role.type + "-" + role.style}
                      className="flex flex-row items-center justify-between px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800"
                    >
                      <label htmlFor={`role-${role.type}`} className="ml-2">
                        {role.style} {role.type}
                      </label>
                      <input
                        type="checkbox"
                        id={`role-${role.style}-${role.type}`}
                        className="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out"
                        checked={currentMemberRoles.find(
                          (currMemberRole) =>
                            currMemberRole.type === role.type &&
                            currMemberRole.style === role.style
                        )}
                        onChange={(e) => {
                          console.log(`Trying to change this: ${e.target.id}`);
                        }}
                        disabled={!editMode}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    // <!-- Modal -->
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
              id={`modallabel-${currentMember.first_name}`}
            >
              {currentMember.first_name + " " + currentMember.last_name}
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
            <form>
              <div className="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 disabled:bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="firstNameInput"
                  value={firstNameInput}
                  readOnly={!editMode}
                  disabled={!editMode}
                  onChange={(e) => setFirstNameInput(e.target.value)}
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
                  value={lastNameInput}
                  readOnly={!editMode}
                  disabled={!editMode}
                  onChange={(e) => setLastNameInput(e.target.value)}
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
                  value={emailInput}
                  readOnly={!editMode}
                  disabled={!editMode}
                  onChange={(e) => setEmailInput(e.target.value)}
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
                  value={phoneInput}
                  readOnly={!editMode}
                  disabled={!editMode}
                  onChange={(e) => setPhoneInput(e.target.value)}
                />
                <label
                  htmlFor="phoneInput"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Phone
                </label>
              </div>
              <TeamMemberRolesTable
                memberId={currentMember.id}
                editMode={editMode}
                key={currentMember.id}
              />
            </form>
          </div>

          {/* <!--Modal footer--> */}
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={() => toggleVisibilityFunc(false)}
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

export default TeamMemberModal;
