import React from "react";

function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-800 p-4 drop-shadow-2xl">
      <input
        class="
        form-control
        block
        w-80
        px-3
        mx-auto
        py-1.5
        text-base
        font-normal
        text-white
        bg-white/10 bg-clip-padding
        border border-solid border-gray-200
        rounded
        transition
        ease-in-out
        m-0
        focus:text-white focus:bg-white/0 focus:border-blackfocus:outline-none
      "
        placeholder="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default GlobalFilter;
