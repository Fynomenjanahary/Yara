"use client";
import { useShape } from "@electric-sql/react";

function Component() {
  const { data } = useShape({
    url: `http://localhost:3001/v1/shape`,
    params: {
      table: `test`,
    },
  });

  return <pre>{data.length}</pre>;
}

export default Component;
