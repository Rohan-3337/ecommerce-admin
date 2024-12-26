"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type ProductColumn = {
  id: string
  name: string
  isFeatured: boolean
  isArchived: boolean
  size:string
  color:string
  category:string

  price: string
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },{
    accessorKey:"isArchived",
    header:"Archived",
  },{
    accessorKey:"isFeatured",
    header:"Featured",
  },{
    accessorKey:"size",
    header:"Size",
  },
  {
    accessorKey:"price",
    header:"Price",
  },{
    accessorKey:"category",
    header:"Category",
  },{
    accessorKey:"color",
    header:"Color",
    cell:({row})=>(
      <div className=" flex items-center gap-x-2">
        {row.original.color}
        <div className="border border-black rounded-full p-4" style={{backgroundColor:row.original.color}}/>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:"action",
    cell:({row})=><CellAction data={row.original}/>
  }

]
