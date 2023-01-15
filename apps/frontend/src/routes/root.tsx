import React from "react";
import { Users } from "@prisma/client";

import Navbar from "../components/Navbar";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Root = () => {
  const { isLoading, data, error } = useSWR<Users, Error>(
    "http://localhost:3000/users/1",
    fetcher
  );

  return (
    <div>
      <Navbar />
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default Root;
