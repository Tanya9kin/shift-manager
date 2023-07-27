import React, { useState, useEffect } from "react";
import { useTeamContext } from "./TeamContextProvider";
import { Ripple, Input, initTE } from "tw-elements";
import TeamMemberEditFormContainer from "./TeamMemberEditFormContainer";
import TeamMemberAddFormContainer from "./TeamMemberAddFormContainer";

export default function TeamMemberModal() {
  useEffect(() => {
    initTE({ Ripple });
  }, []);

  const { chosenTeamMember, setModalOpen, allRoles } = useTeamContext();

  function ModalHeading() {
    return (
      <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        {/* <!--Modal title--> */}
        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
          {chosenTeamMember.id !== null
            ? chosenTeamMember.first_name + " " + chosenTeamMember.last_name
            : "New Team Member"}
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
            onClick={() => setModalOpen(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  function ModalBody() {
    const roleFields = allRoles.map((role) => {
      return {
        name: role.getString().toLowerCase().replace(" ", "_"),
        label: role.getString(),
        id: role.id,
      };
    });

    const memberRolesValues = new Map(
      roleFields.map(({ id, name }) => [
        name,
        chosenTeamMember.roles.find((role) => role.id === id) ? true : false,
      ])
    );

    const dataWithRoles = {
      ...chosenTeamMember,
      ...Object.fromEntries(memberRolesValues),
    };

    return (
      <div>
        {chosenTeamMember.id === null ? (
          <TeamMemberAddFormContainer
            data={dataWithRoles}
            roleFields={roleFields}
          />
        ) : (
          <TeamMemberEditFormContainer
            data={dataWithRoles}
            roleFields={roleFields}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-neutral-300 bg-opacity-50 dark:bg-neutral-900 dark:bg-opacity-50"
      data-te-backdrop="static"
      tabIndex="-1"
    >
      <div className="pointer-events-none relative w-auto translate-y-[50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <ModalHeading />
          <ModalBody />
        </div>
      </div>
    </div>
  );
}
