import React, { useState } from "react";
import validator from "validator";

import TeamMemberForm from "./TeamMemberForm";
import { useTeamContext } from "./TeamContextProvider";
import { TeamMember } from "../../../public/utils";

function TeamMemberEditFormContainer({ data, roleFields }) {
  const { setTeamMembers, setChosenTeamMember, setModalOpen } =
    useTeamContext();
  const [isLoading, setIsLoading] = useState(false);

  const textFields = [
    {
      name: "first_name",
      label: "First Name",
      rules: { required: { value: true, message: "First name is required" } },
    },
    {
      name: "last_name",
      label: "Last Name",
      rules: { required: { value: true, message: "Last name is required" } },
    },
    {
      name: "email",
      label: "E-mail",
      rules: {
        required: { value: true, message: "E-mail is required" },
        validate: {
          isEmailFormat: (fieldValue) => {
            return validator.isEmail(fieldValue) || "E-mail is invalid";
          },
        },
      },
    },
    {
      name: "phone",
      label: "Phone",
      rules: {
        required: { value: true, message: "Phone is required" },
        validate: {
          isPhoneFormat: (fieldValue) => {
            return validator.isMobilePhone(fieldValue) || "Phone is invalid";
          },
        },
      },
    },
  ];

  async function handleSave(formValues) {
    setIsLoading(true);
    console.log(JSON.stringify(formValues));
    try {
      console.log(`Submitting team member: ${data.id}`);
      const response = await fetch(`http://localhost:8080/team/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      console.log(`Response from server: ${response}`);
      const json = await response.json();
      console.log(`JSON from server: ${json}`);
      setTeamMembers(
        (prevTeamMembers) =>
          new Map(prevTeamMembers.set(json.id, TeamMember.fromJSON(json)))
      );
      setChosenTeamMember(TeamMember.fromJSON(json));
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TeamMemberForm
      handleSave={handleSave}
      defaultData={data}
      roleFields={roleFields}
      textFields={textFields}
      isLoading={isLoading}
    />
  );
}

export default TeamMemberEditFormContainer;
