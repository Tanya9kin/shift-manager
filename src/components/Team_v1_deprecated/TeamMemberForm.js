import React, { useState, useEffect } from "react";
import { useTeamContext } from "../Team/TeamContextProvider";
import { useForm, useController, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { initTE, Input, Ripple } from "tw-elements";
import { TeamMember } from "../../../public/utils";

import validator from "validator";

function TeamMemberForm() {
  useEffect(() => {
    initTE({ Ripple });
  }, []);

  const { allRoles, setChosenTeamMember, chosenTeamMember } = useTeamContext();

  const [teamMemberData, setTeamMemberData] = useState({ ...chosenTeamMember });

  const { control, handleSubmit } = useForm({
    defaultValues: teamMemberData,
  });

  useEffect(() => {
    const roleMap = new Map(
      allRoles.map((role) => [
        role.getString(),
        chosenTeamMember.roles.find((memberRole) => memberRole.id === role.id)
          ? true
          : false,
      ])
    );

    console.log(
      `roleMap.get("Bachata Instructor"): ${roleMap.get("Bachata Instructor")}`
    );

    setTeamMemberData((prev) => ({
      ...prev,
      bachata_instructor: roleMap.get("Bachata Instructor"),
      salsa_instructor: roleMap.get("Salsa Instructor"),
      zouk_instructor: roleMap.get("Zouk Instructor"),
      bachata_dj: roleMap.get("Bachata DJ"),
      salsa_dj: roleMap.get("Salsa DJ"),
      zouk_dj: roleMap.get("Zouk DJ"),
    }));
  }, []);

  const textFields = [
    {
      name: "first_name",
      label: "First Name",
      rules: { required: "First name is required" },
    },
    {
      name: "last_name",
      label: "Last Name",
      rules: { required: "Last name is required" },
    },
    {
      name: "email",
      label: "Email",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "phone",
      label: "Phone",
      rules: {
        required: "Phone is required",
        pattern: {
          value: /^\d{10}$/, // Assuming a 10-digit phone number
          message: "Invalid phone number",
        },
      },
    },
  ];

  const checkboxFields = [
    {
      name: "bachata_instructor",
      label: "Bachata Instructor",
    },
    {
      name: "salsa_instructor",
      label: "Salsa Instructor",
    },
    {
      name: "zouk_instructor",
      label: "Zouk Instructor",
    },
    {
      name: "bachata_dj",
      label: "Bachata DJ",
    },
    {
      name: "salsa_dj",
      label: "Salsa DJ",
    },
    {
      name: "zouk_dj",
      label: "Zouk DJ",
    },
  ];

  async function handleSave(formValues) {
    console.log(JSON.stringify(formValues));
    try {
      console.log(`Submitting team member: ${teamMemberData.id}`);
      const response = await fetch(
        `http://localhost:8080/team/${teamMemberData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      );
      console.log(`Response from server: ${response}`);
      const json = await response.json();
      console.log(`JSON from server: ${json}`);
      setChosenTeamMember(TeamMember.fromJSON(json));
    } catch (error) {
      console.error(error);
    }
  }

  function TextInput({ name, control, rules, label }) {
    useEffect(() => {
      initTE({ Input });
    }, []);

    const { field: textInput } = useController({ name, control, rules: rules });

    return (
      <div className="relative mb-6" data-te-input-wrapper-init>
        <input
          {...textInput}
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          {label}
        </label>
      </div>
    );
  }

  function Checkbox({ control, name, label }) {
    useEffect(() => {
      initTE({ Input });
    }, []);

    const { field } = useController({ name, control });

    const [value, setValue] = useState(field.value);

    return (
      <div className="mb-6 flex min-h-[1.5rem] items-center pl-[1.5rem]">
        <input
          {...field}
          type="checkbox"
          onChange={(e) => {
            const valueCopy = e.target.checked ? false : true;
            field.onChange(valueCopy);
            setValue(valueCopy);
          }}
          checked={value}
          value={name}
          className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
        />
        <label
          htmlFor={name}
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="relative flex-auto p-4 justify-around justify-items-center items-center">
      <form onSubmit={handleSubmit(handleSave)}>
        {textFields.map((field) => (
          <TextInput
            key={field.name}
            name={field.name}
            label={field.label}
            control={control}
            rules={field.rules}
          />
        ))}
        {checkboxFields.map((field) => (
          <Checkbox
            key={field.name}
            name={field.name}
            label={field.label}
            control={control}
          />
        ))}
        <div>
          <button
            type="submit"
            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Save
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default TeamMemberForm;
