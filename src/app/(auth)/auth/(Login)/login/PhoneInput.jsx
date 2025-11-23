'use client'

import { Input } from "@heroui/react"
import {useState} from "react"

export default function PhoneInput({
  color,
  description,
  })
{

  const [phone, setPhone] = useState("+7");
  const [valid, setValid] = useState()
  const [error,setError]=useState("")

  const handleChange = (value) => {
    if (value.length <= 1) {
      value = '+7'
      //trigger('phone')
    }
    const cardValue = value
      .replace(/[^\d|\+]/g, '')
      .match(/([\+7|8]{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    //.replace(/[^\d]/g, '')
    //.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    value =
      (cardValue[1] ? `${cardValue[1]}` : '').concat(
        cardValue[2] ? ` ( ${cardValue[2]}` : '').concat(
          cardValue[3] ? ` ) ${cardValue[3]}` : '').concat(
            cardValue[4] ? ` - ${cardValue[4]}` : '').concat(
              cardValue[5] ? ` - ${cardValue[5]}` : '')
    setPhone(value);
    //setValid(validate)
    setError({ validate })
  }
  return (
    <>
      <Input
        value={phone}
        onValueChange={handleChange}
        validate={(v) => {
          const rest = 12 - v.replace(/[^\d|\+]/g, '').length
          return (!(rest <= 10 && rest > 0) || `Осталось ввести ${rest} цифр`)
        }}
        
        variant="faded"
        size="sm"
        label={<p className="text-sm font-bold"> Номер телефона </p>} type="text"
        labelPlacement={"inside"}
        isClearable
        color={color}
        //isInvalid={isInvalid}
        description={description}
        //errorMessage={errorMessage}

        //color={(!isValid) ? "danger" : "default"}
        // isInvalid={!isValid}

        // description={session ?
        //   <div className="h-6">
        //     <p className="font-bold">{session?.user?.name}</p>
        //     <p className="font-bold">{state?.status}</p>
        //   </div> : null}
        
        // errorMessage={errors?.phone ?
        //   <div className="h-6">
        //     <p className="font-bold">{errors?.phone?.message}</p>
        //   </div> : null}

      />
     
    </>
  )
}