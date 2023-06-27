"use client"; // Error components must be Client Components

import { Button } from "@/Components/Button";
import { useEffect } from "react";

interface IErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: IErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4">
        <h2 className="prose-heading-2-600">Oops!</h2>
        <p className="prose-body-1-600"> Erro: {error.name}</p>
        <h4 className="prose-heading-4-500">Tente carregar de novo:</h4>
        <div className="max-w-xs">
          {" "}
          <Button
            variant="text"
            type="reset"
            fullWidth
            color="red"
            size="primary"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }>
            Tente Carregar de novo
          </Button>
        </div>
      </div>
    </div>
  );
}
