"use client"
import { Spinner } from "@heroui/spinner";

export function Loader(props) {

  if (props.loading) {
    return (
      <div className='flex justify-center  h-auto relative'>
        <Spinner label="Загрузка данных..." />
      </div>
    )
  }
}