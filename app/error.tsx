"use client";

import { Button } from "@heroui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Something went wrong</h1>
      <p className="text-lg text-gray-600 max-w-md">
        We apologize for the inconvenience. Please try again later.
      </p>
      <Button className="mt-4" color="primary" variant="flat" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
