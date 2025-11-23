'use client'

import { Input } from "@heroui/react"
//import { color } from "framer-motion"
import { useState } from "react"

export default function Phone( props ) {

 

  const [value, setValue] = useState('+7')
  const [message, setMessage] = useState('')
    
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

    setValue(value)
    const msg = validate(cardValue[0])
    props.onValid(msg)
    setMessage(msg)
    
  };

  function validate (v) {
    const rest = v.length
    if ( rest <= 2 ) return ('Введи 10 цифр')
    else if ( rest >2 &&  rest <= 7 ) return (`Осталось ввести ${12 - rest} цифр`)
    else if ( rest >7 && rest <= 10 ) return (`Осталось ввести ${12 - rest} цифры`)
    else if (rest == 11) return (`Осталось ввести ${12 - rest} цифру`)
    else return('')
  }

  return (
    <>
      <Input {...props}
        type="text"
        defaultValue="+7"
        value={value}
        onValueChange={handleChange}
        variant="faded"
        size="md"
        isClearable
        label={<p className="text-sm font-bold"> Номер телефона </p>}

        // errorMessage={
        //   <div className="h-6">
        //     <p className="font-bold"> ERROR </p>
        //   </div>
        // }

        description={
          <div>
            <div className="h-6">
              <p className="font-bold">{message}</p>
             </div>
          </div>
        }
      />
    </>
  )
}
