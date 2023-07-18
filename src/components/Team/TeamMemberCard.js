import React, { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { Modal, Ripple, initTE } from "tw-elements";
import TeamMemberModal from "./TeamMemberModal";

function TeamMemberCard({ member }) {
  useEffect(() => {
    initTE({ Modal, Ripple });
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="inline-block w-full rounded-lg p-5 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30 cursor-pointer"
        data-te-toggle="modal"
        data-te-target={`#member-${member.id}`}
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={() => setIsVisible(true)}
      >
        <div className="mb-12">
          <FaFileImage className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-width-100" />
          <p className="mb-2 font-bold">{member.first_name}</p>
        </div>
      </button>
      <TeamMemberModal member={member} />
    </div>
  );
}

export default TeamMemberCard;
