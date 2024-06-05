import React from "react";

export function StrapiErrors({
  error,
}: {
  readonly error: IStrapiErrorsProps;
}) {
  if (!error?.message) return null;
  return <div className="">{error.message}</div>;
}
