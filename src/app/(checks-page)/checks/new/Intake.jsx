import { Input } from "@heroui/react"
import { useController, useForm } from "react-hook-form"

export default function Intake({ control, name, lastIntake }) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: {
        value: true,
        message: " Не может быть пустым"
      },
      // min: {
      //   value: `${lastIntake}`,
      //   message: `Должно быть более ${lastIntake}`
      // },
      max: {
        value:
          999999,
        message: "Должно быть не более 999999"
      },
      valueAsNumber: true
    }
  })

  return (
    <Input
      
      name={field.name}
      onValueChange={field.onChange}
      value={field.value}
      onBlur={field.onBlur}
      baseRef={field.ref}

      color={error ? "danger" : "default"}
      errorMessage={error ? <p className="text-sm font-bold">{error.message}</p> : ""}
      variant="faded"
      size="sm"
      label={<p className="text-sm font-bold"> Счетчик </p>}
      type="number"
      //step="1"
      labelPlacement={"inside"}
      description={
        !lastIntake ?
          <p className="text-sm font-bold">{'Предыдущее значение не определено'} </p> :
          <p className="text-sm font-bold">{`Предыдущее значение: ${lastIntake} кВт·час`}</p>
      }  
      
      endContent={<p className="text-sm"> кВт·час </p>}
    />
  )
}