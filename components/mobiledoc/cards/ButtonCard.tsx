"use client";

export interface ButtonCardPayload {
  alignment: string;
  buttonText: string;
  buttonUrl: string;
  key: number;
}

export default function ButtonCard({ payload }: { payload: ButtonCardPayload }) {
  const containerClass = `flex w-full justify-${payload.alignment == "center" ? "center" : "start"}`;

  return (
    <div className={containerClass}>
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href = payload.buttonUrl;
        }}
        className="transform-gpu rounded-md bg-pink-600 p-3 text-center transition duration-300 hover:bg-pink-400"
      >
        {payload.buttonText}
      </button>
    </div>
  );
}
