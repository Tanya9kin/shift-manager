import React, { useEffect, useState } from "react";
import { useTeamContext } from "./TeamContextProvider";
import TeamMemberCard from "./TeamMemberCard";
import TeamMemberModal from "./TeamMemberModal";
import TeamActionBar from "./TeamActionBar";

export default function Team() {
  const { teamMembers, modalOpen, chosenTeamMember } = useTeamContext();

  const [team, setTeam] = useState([]);
  useEffect(() => {
    if (teamMembers.size > 0) {
      setTeam(Array.from(teamMembers.values()));
    }
  }, [teamMembers]);

  return (
    <div>
      <section className="mb-32 text-center ml-4 mr-4">
        <h2 className="mt-4 mb-4 text-3xl font-bold">Team</h2>
        <TeamActionBar />
        <div className="lg:gap-xl-12 grid gap-x-3 gap-y-3 md:grid-cols-4 xl:grid-cols-6 sm:grid-cols-3 xs:grid-cols-2">
          {team &&
            team.map((member) => (
              <TeamMemberCard member={member} key={member.id} />
            ))}
        </div>
      </section>
      {chosenTeamMember && modalOpen && <TeamMemberModal />}
    </div>
  );
}
