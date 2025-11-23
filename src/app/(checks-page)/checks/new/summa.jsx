import { Input } from "@heroui/react"
import { useController, useForm } from "react-hook-form"

export default function Summa({ control, name, lastSumma }) {
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
      min: {
        value: 0,
        message: "Должно быть больше 0"
      },
      max: {
        value: 10000,
        message: `Не должно быть больше 10000 руб.`
      }
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
      label={<p className="text-sm font-bold"> Сумма </p>}
      type="number"
      labelPlacement={"inside"}
      description={
        !lastSumma ?
          <p className="text-sm font-bold">{`Предыдущее значение не определено`}</p> :
          <p className="text-sm font-bold">{`Предыдущее значение: ${lastSumma} руб.`}</p>
      }
      endContent={<p className="text-sm"> руб. </p>}
    />
  )
}