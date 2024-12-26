"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface ColorProps{
    data:ColorColumn[];

}

export const ColorClient:React.FC<ColorProps> =({data}) => {
    
    const router = useRouter();
    const params= useParams();
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title={`Colors (${data.length})`} desc="Manage Color for your store"/>
                <Button
                onClick={() =>router.push(`/${params.storeId}/colors/new`)}
                > <Plus className=" h-4 w-4 mr-2"/> Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" desc="API calls for Colors"/>
            <ApiList entityName="colors" entityIdName="colorId"/>
        </>
    ) 
}