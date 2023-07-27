import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { initTE, Input, Ripple } from "tw-elements";

function LoadingSpinner() {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

function TeamMemberForm({
  handleSave,
  defaultData = {},
  roleFields,
  textFields,
  isLoading,
}) {
  useEffect(() => {
    initTE({ Ripple });
  }, []);

  const form = useForm({ defaultValues: defaultData });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  function TextInput({ name, rules, label }) {
    useEffect(() => {
      initTE({ Input });
    }, []);
    return (
      <div>
        <p className="text-danger-500 ">{errors[name]?.message}</p>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            {...register(name, rules)}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label
            htmlFor={name}
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            {label}
          </label>
        </div>
      </div>
    );
  }

  function CheckboxInput({ name, label }) {
    useEffect(() => {
      initTE({ Input });
    }, []);

    return (
      <div className="mb-6 flex min-h-[1.5rem] items-center pl-[1.5rem]">
        <input
          {...register(name)}
          type="checkbox"
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
            rules={field.rules}
            label={field.label}
          />
        ))}
        {roleFields.map((field) => (
          <CheckboxInput
            key={field.name}
            name={field.name}
            label={field.label}
          />
        ))}
        <button
          type="submit"
          className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-ripple-init
          data-te-ripple-color="light"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Save"}
        </button>
        {/* <button
          type="cancel"
          className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-ripple-init
          data-te-ripple-color="light"
          disabled={isLoading}
          onClick={(e) =>
            dirtyFields
              ? alert("Are you sure you want to dismiss the changes?")
              : ""
          }
        >
          Cancel
        </button> */}
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default TeamMemberForm;
