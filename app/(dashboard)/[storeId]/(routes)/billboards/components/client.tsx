"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import prisma from "@/lib/prismadb"
import { Billboard } from "@prisma/client"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface BillBoardProps{
    data:BillboardColumn[];

}

export const BillboardClient:React.FC<BillBoardProps> = async({data}) => {
    
    const router = useRouter();
    const params= useParams();
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title={`Billboards (${data.length})`} desc="Manage Billboard for your store"/>
                <Button
                onClick={() =>router.push(`/${params.storeId}/billboards/new`)}
                > <Plus className=" h-4 w-4 mr-2"/> Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey="label" columns={columns} data={data}/>
            <Heading title="API" desc="API calls for billboards"/>
            <ApiList entityName="billboards" entityIdName="billboardId"/>
        </>
    ) 
}