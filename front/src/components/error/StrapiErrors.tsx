import React from "react";

export function StrapiErrors({
  error,
}: {
  readonly error: IStrapiErrorsProps;
}) {
  if (!error?.message) return null;
  return (
    <div className="text-pink-500 text-md italic py-2">{error.message}</div>
  );
}
