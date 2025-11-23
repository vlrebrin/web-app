
'use client'
//import { navbar } from "@heroui/react";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
//import { AcmeLogo } from "./AcmeLogo.jsx";
import { useRouter, redirect } from 'next/navigation'



export default function Menubar() {
  const router=useRouter()
  return (
    <div>
    <Navbar >
      
        <NavbarContent className=" sm:flex gap-2 px-0 " justify="center">
        <NavbarItem>
            <Button onClick={() => router.replace('/')} color="primary" variant="flat">
            Главная
          </Button>
          </NavbarItem>
          {/* <NavbarItem >
            <Button onClick={() => router.replace('/test/users')} color="primary" variant="flat">
              Users
            </Button>
          </NavbarItem> */}
        <NavbarItem>
            <Button onClick={() => router.replace('/auth')} color="primary" variant="flat">
            Auth
          </Button>
        </NavbarItem>
        {/* <NavbarItem>
            <Button onClick={() => router.replace('/checks/new')} color="primary"  variant="flat">
            Новый счет
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      
      </Navbar>
    </div>
  );
}