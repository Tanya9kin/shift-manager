import React, { useEffect, useState } from "react";
// import { FaFileImage } from "react-icons/fa";
import { Modal, Ripple, initTE } from "tw-elements";
import { TeamMember } from "../../utils";

function TeamMemberRolesTable({ memberId }) {
  const [allRoles, setAllRoles] = useState([]);
  const [currentMemberRoles, setCurrentMemberRoles] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberRoles = async () => {
      const data = await fetch(`http://localhost:8080/team/${memberId}/roles`);
      const json = await data.json();
      console.log(`roles of member are: ${json}`);
      setCurrentMemberRoles(json);
    };

    const fetchRoles = async () => {
      const data = await fetch(`http://localhost:8080/roles`);
      const json = await data.json();
      setAllRoles(json);
    };

    fetchMemberRoles().catch(console.error);
    fetchRoles().catch(console.error);

    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          {!loading && (
            <div className="overflow-hidden">
              {currentMemberRoles &&
                allRoles &&
                allRoles.map((role) => (
                  <div
                    key={role.role_type}
                    className="flex flex-row items-center justify-between px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800"
                  >
                    <label htmlFor={`role-${role.role_type}`} className="ml-2">
                      {role.role_type}
                    </label>
                    <input
                      type="checkbox"
                      id={`role-${role.role_type}`}
                      className="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out"
                      checked={currentMemberRoles.includes(role.role_type)}
                      disabled={true}
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

function TeamMemberModal({ member }) {
  useEffect(() => {
    initTE({ Modal, Ripple });
  }, []);
  const { id, first_name, last_name, email, phone, roles } = member;

  const [currentMember, setCurrentMember] = useState(
    new TeamMember(id, first_name, last_name, email, phone, roles)
  );

  return (
    // <!-- Modal -->
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id={`member-${currentMember.id}`}
      data-te-backdrop="static"
      tabIndex="-1"
      aria-labelledby={`modallabel-${currentMember.first_name}`}
      aria-hidden="true"
    >
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
      >
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
              data-te-modal-dismiss
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
          <div className="relative flex-auto p-4" data-te-modal-body-ref>
            <div className="grid grid-cols-2 gap-2 justify-around justify-items-center items-center">
              <img
                src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                className="w-32 rounded-full"
                alt="Avatar"
              />
              <div>
                <p>
                  {currentMember.first_name + " " + currentMember.last_name}
                </p>
                <p>{currentMember.email}</p>
                <p>{currentMember.phone}</p>
              </div>
            </div>
            {console.log(currentMember.id)}
            <TeamMemberRolesTable memberId={currentMember.id} />
          </div>

          {/* <!--Modal footer--> */}
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-modal-dismiss
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Close
            </button>
            <button
              type="button"
              className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberModal;
