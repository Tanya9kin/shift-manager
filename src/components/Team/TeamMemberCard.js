import React, { useEffect } from "react";
import { FaFileImage } from "react-icons/fa";
import { Ripple, initTE } from "tw-elements";
import { useTeamContext } from "./TeamContextProvider";

export default function TeamMemberCard({ member }) {
  const { setChosenTeamMember, setModalOpen } = useTeamContext();
  useEffect(() => {
    initTE({ Ripple });
  });

  const { id, first_name, last_name, roles } = member;
  const memberName = `${first_name} ${last_name}`;
  const memberRoles = roles.map((role) => role.getString()).join(" | ");

  function handleClick() {
    setChosenTeamMember(member);
    setModalOpen(true);
  }

  return (
    <button
      type="button"
      className="inline-block w-full rounded-lg p-5 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30 cursor-pointer"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={handleClick}
    >
      <div className="mb-12">
        <FaFileImage className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-width-100" />
        <p className="mb-2 font-bold">{memberName}</p>
        <p className="mb-2">{memberRoles}</p>
      </div>
    </button>
  );
}
