"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import prisma from "@/lib/prismadb"
import { Order } from "@prisma/client"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface OrderProps{
    data:OrderColumn[];

}

export const OrderClient:React.FC<OrderProps> = async({data}) => {
    
    const router = useRouter();
    const params= useParams();
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title={`Orders (${data.length})`} desc="Manage Order for your store"/>
                <Button
                onClick={() =>router.push(`/${params.storeId}/Orders/new`)}
                > <Plus className=" h-4 w-4 mr-2"/> Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey="label" columns={columns} data={data}/>
            <Heading title="API" desc="API calls for Orders"/>
            <ApiList entityName="Orders" entityIdName="OrderId"/>
        </>
    ) 
}