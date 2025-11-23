"use client"
//import { prisma } from "@/lib/prisma";
import React from "react";
import { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Select, SelectItem,
  Spacer, Button, RadioGroup, Radio,
  Tooltip, Input, Textarea, Listbox, ListboxItem,
  Table,
  TableHeader, TableColumn,
  TableBody, TableRow, TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationCursor,
  ScrollShadow
} from "@heroui/react";
import { useTransition } from "react";
import { fillMeteringData, CalculateMeteringData } from "@/lib/server-actions"
import { useRouter, redirect } from 'next/navigation'

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const columns = [
  { name: "УЧАСТ.", uid: "name", sortable: true },
  { name: "НАИМЕН.", uid: "num" },
  { name: "СЧЕТЧ.", uid: "value" },
  { name: "ПОТР.", uid: "intake", sortable: true },
  { name: "ВЗНОС", uid: "contribution", sortable: true },
  { name: "СУММА", uid: "payment", sortable: true },
];

export default function TableCounters(props) {

  const INITIAL_VISIBLE_COLUMNS = ["name", "num", "value", "intake","payment","contribution"]
  const { checks, users, meterings } = props
  const rowsPerPage = 15;
  const pages = checks.length
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [disabledItems, setDisabledKeys] = React.useState(new Set([]));
  const [page, setPage] = React.useState(1);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return meterings.slice(start, end);
  }, [page, meterings]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);
  
  const disabledKeys = React.useMemo(() => {
    var temp
    if (checks[page - 1].closed) temp = new Set(["Fill", "Calculate"]) 
    else temp = new Set(["newCheck"])
      setDisabledKeys(temp)
   }, [checks, page]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between gap-3 items-end">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              variant="flat"
              fullWidth
            > Cтолбцы </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={setVisibleColumns}
          >
            {columns.map((column) => (
              <DropdownItem className="capitalize" key={column.uid}>
                {capitalize(column.name)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button className="mx-12"
          type="submit" color="primary"
          fullWidth
          size="sm"
          onClick={() => router.back()}
        > Назад </Button>
         
        {/* <Dropdown>
          <DropdownTrigger>
            <Button size="sm" variant="flat"
              fullWidth
            > Действия </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Menu Actions"
            closeOnSelect={true}
            disabledKeys={disabledItems}
            onAction={(key) => {
            if (key === "Fill") {
              startTransition(() => {
                fillMeteringData(page, rowsPerPage)
              })
            } else if (key === "Calculate") {
              startTransition(() => {
                CalculateMeteringData(page, rowsPerPage)
              })
            } else if (key === "newCheck") router.push('/checks/new')
            else alert(key)
          }}>
            <DropdownItem key="newCheck">   Новый счет </DropdownItem>
            <DropdownItem key="Fill">       Заполнить </DropdownItem>
            <DropdownItem key="Calculate">  Расчитать </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </div>
    )
  }, [ router, visibleColumns, disabledItems,page, ])

  const bottomContent = React.useMemo(() => {
    const currentCheck = checks[page - 1]
    const pcolor = !currentCheck.closed ? "success" : "default"

    return (
      <div className=" flex-col items-center">
        <div className=" pb-2 w-[100%] text-small text-default-800 text-center">
          Счет : {currentCheck.createdAt.toLocaleString() + ` (${currentCheck.id})`
            + ` ${currentCheck.intake}` + ` ${currentCheck.summa}`}
        </div>
        <div className="flex-col items-center">
          <Pagination
            loop
            initialPage={1}
            isCompact
            showControls
            showShadow
            color={pcolor}
            page={page}
            total={pages}
            onChange={setPage}
            //classNames={{}}
          />
        </div>
      </div>
    )
  }, [ checks, page, pages ])

  const renderCell = React.useCallback((metering, columnKey) => {
    const cellValue = metering[columnKey];
    //const isNoValue=mettering.isNoValue
    const isNoValueClass = metering.isNoValue ? "text-red-800 bg-yellow-200" : ""
    switch (columnKey) {
      case "name":
        return (
          //<User
          // avatarProps={{ radius: "lg", src: user.avatar }}
          // description={user.email}
          //name={cellValue}
          //  { user.email }
          //</User>
          (< div className="flex flex-col gap-0" >
            <p className="text-bold text-small">{cellValue}</p>
          </div >)
        );
      case "num":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
          </div>
        );
      case "value":
        return (
          // <div className={isNoValueClass}>
          (<div>
            <p>{cellValue}</p>
          </div>)
        );
      case "intake":
        return (
          <div >
            <p >{cellValue}</p>
          </div>
        );
      case "payment":
        return (
          <div >
            <p >{cellValue.toFixed(2)}</p>
          </div>
        );
      case "contribution":
        return (
          <div >
            <p >{cellValue.toFixed(2)}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // const HandlerRowAction = (key) => {
  //   const k = key
  //   console.log(key)
  //   console.log(prevMetering(key))
  // }

  return (
     <div className="flex">
    {/* <Card className = "mx-2 my-4 h-full">
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> История </p>
      </CardHeader>
      </Card>
         */}
        <Table
          shadow="none"
          radius="none"
          isCompact="true"
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            tr: "hover:bg-blue-400",
            td: "pl-0 pt-1 pb-0",
          }}
          selectedKeys={selectedKeys}
          selectionBehavior="replace"
          //onRowAction={HandlerRowAction}
          topContent={topContent}
          topContentPlacement="inside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                allowsSorting={column.sortable}
              > {column.name} </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No users found"}
            items={items}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
          </Table>
       
      
     
     </div>
  )
}

export function CheckIsEmpty() {
  const router = useRouter()
  return (
    <>
      <p className=" p-5 ">
        Нет ни одного Счета
        <Button
          color="primary"
          variant="light"
          onPress={(e) => { router.push("/checks/new") }}
        > Создать счет </Button>
      </p>
    </>
  )
}