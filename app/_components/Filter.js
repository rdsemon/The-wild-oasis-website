"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex mb-4 border border-primary-800  justify-end">
      <Button
        filter="all"
        onHandlefilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        onHandlefilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        onHandlefilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;6 guests
      </Button>
      <Button
        filter="large"
        onHandlefilter={handleFilter}
        activeFilter={activeFilter}
      >
        7 or more guests
      </Button>
    </div>
  );
}

function Button({ filter, onHandlefilter, children, activeFilter }) {
  return (
    <div
      className={` ${
        activeFilter === filter ? "bg-primary-700" : ""
      } px-5 py-2 hover:bg-primary-700 cursor-pointer`}
      onClick={() => onHandlefilter(filter)}
    >
      {children}
    </div>
  );
}

export default Filter;
