import React, { useEffect, useState } from "react";
// import { FaEdit, FaFileImage } from "react-icons/fa";
// import { Modal, Ripple, initTE } from "tw-elements";
import TeamMemberCard from "./TeamMemberCard";
// import TeamMemberModal from "./TeamMemberModal";
import TeamActionBar from "./TeamActionBar";

function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const data = await fetch("http://localhost:8080/team");
      const json = await data.json();
      setTeam(json);
    };

    fetchTeam().catch(console.error);
  }, []);

  console.log("We are here");

  return (
    <section className="mb-32 text-center ml-4 mr-4">
      <h2 className="mt-4 mb-12 text-3xl font-bold">Team</h2>
      {/* <TeamActionBar /> */}
      <div className="lg:gap-xl-12 grid gap-x-3 gap-y-3 md:grid-cols-4 xl:grid-cols-6 sm:grid-cols-3 xs:grid-cols-2">
        {team &&
          team.map((member) => (
            <TeamMemberCard member={member} key={member.id} />
          ))}
      </div>
    </section>
  );
}

export default Team;
