"use client";

import config from "@/site.config";
import { useState } from "react";
import { useForm, Form } from "react-hook-form";

type FormFields = {
  email: string;
};

export default function SignupCard({ payload }: { payload: any }) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<FormFields>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col gap-4 rounded-md dark:bg-gray-800 bg-gray-200 bg-opacity-30 p-8">
      <span className="mr-4 text-3xl font-bold text-pink-600">{config.newsletterSignupHeading}</span>
      <span className="text-md dark:text-gray-200 text-gray-700">{config.newsletterSignupBody}</span>
      <Form
        className="flex items-center justify-start gap-4"
        action="/api/members/subscribe" // Send post request with the FormData
        encType={"application/json"}
        onSuccess={() => {
          setSuccess(true);
          setLoading(false);
        }}
        onError={async (resp) => {
          const responseText = await resp.response.text();
          setSuccess(false);
          setLoading(false);
          setError(responseText);
        }}
        onSubmit={() => {
          setLoading(true);
          setSuccess(false);
          setError("");
        }}
        control={control}
      >
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          className={`rounded-md dark:bg-gray-500 bg-white p-3 text-gray-700 dark:text-gray-200 placeholder:text-gray-700 dark:placeholder:text-gray-200 ${(errors.email || error !== "") && "border-[2px] border-red-400"}`}
          placeholder="Email Address"
        />

        <div className="group relative transform-gpu text-white duration-300">
          <div className="absolute -z-10 h-full w-full -rotate-6 transform-gpu rounded-lg bg-gray-400 opacity-20 duration-300 group-hover:rotate-0 group-hover:scale-90 dark:opacity-25 dark:mix-blend-overlay"></div>
          <input
            type="submit"
            disabled={loading}
            value="Submit"
            className="flex transform-gpu flex-row items-center rounded-lg bg-pink-600 p-4 px-5 text-sm font-semibold uppercase duration-300 group-hover:scale-90 disabled:group-hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </Form>
      {errors.email && <span className="text-red-400">{errors.email.message}</span>}
      {error !== "" && <span className="text-red-400">{error}</span>}
      {success && <span className="text-green-400">{config.newsletterSignupComplete}</span>}
    </div>
  );
}
