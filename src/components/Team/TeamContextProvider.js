import React, { useState, useContext, useEffect, createContext } from "react";

import { TeamMember, Role } from "../../../public/utils";

const TeamContext = createContext();

export function useTeamContext() {
  return useContext(TeamContext);
}

export default function TeamContextProvider({ children }) {
  const [teamMembers, setTeamMembers] = useState({});
  const [chosenTeamMember, setChosenTeamMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await fetch("http://localhost:8080/team");
        const json = await data.json();
        const team = new Map(
          json.map((member) => [member.id, TeamMember.fromJSON(member)])
        );
        console.log(team);
        setTeamMembers(team);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await fetch(`http://localhost:8080/roles`);
        const json = await data.json();
        const rolesArray = json.map((role) => Role.fromJSON(role));
        setAllRoles(rolesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <TeamContext.Provider
      value={{
        teamMembers,
        setTeamMembers,
        modalOpen,
        setModalOpen,
        chosenTeamMember,
        setChosenTeamMember,
        allRoles,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
