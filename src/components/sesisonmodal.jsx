"use client"
import { Spinner } from "@heroui/spinner";
import { Modal, ModalContent, ModalHeader, ModalBody,Card, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { useEffect, useState, useMemo } from 'react'

export function ModalSession(props) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backdrops = ["opaque", "blur", "transparent"];
  //const [backdrop, setBackdrop] = useState("opaque")

  
  // const handleOpen = (backdrop) => {
  //   //setBackdrop(backdrop)
 
  
  useEffect(() => {
   //console.log(JSON.stringify(props.session?.user))
   if (props.status === "loading") onOpen()
   else onClose()
    //console.log(props.status)
    
 }, [props.status])

  
  
    return (
      <>
        <Modal
          backdrop='opaque'
          isOpen={isOpen}
          onClose={onClose}
          size="xs"
          hideCloseButton
          //placement='center'
          classNames={{
            
            base: "min-w-fit min-h-fit p-0",
            //wrapper: "modal",
            wrapper: "w-[375px] h-[660px] mx-auto",
            backdrop: "w-[375px] h-[660px] mx-auto bg-[#292f46]/50 backdrop-opacity-40",
            //backdrop: "modal bg-[#292f46]/50 backdrop-opacity-40",
           //backdrop:"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
           //base: "border-[#292f46] bg-[#00002c] dark:bg-[#19172c] text-[#a8b0d3]",
           // header: "border-b-[1px] border-[#292f46]",
           //footer: "border-t-[1px] border-[#292f46]",
           //closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            {/* <ModalBody> */}
              <Card className="w-full h-full p-4">
                <Spinner size="sm" label="Загрузка сессии..." />
              </Card>
            {/* </ModalBody> */}
          </ModalContent>
        </Modal>
      </>
    )
}