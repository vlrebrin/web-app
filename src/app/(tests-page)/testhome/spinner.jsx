//'use client'

import { Spinner } from "@heroui/spinner"
export default function App() {
  return (
 <>
      <div className="flex min-h-[660px] justify-center items-center">
      {/* <div className="flex flex-col min-h-[660px] justify-center items-center"> */}
        <Spinner label="Загрузка ..." size="sm" color="danger" />
      </div> 
    </>
  )}