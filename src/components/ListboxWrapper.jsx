import React from "react";
import {ScrollShadow} from "@heroui/react";
export const ListboxWrapper = ({ children }) => (
  //  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
  <ScrollShadow className="w-[300px] h-[400px]">
  <div>
    {children}
  </div>
  </ScrollShadow>
)