"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import {  CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface CategoryProps{
    data:CategoryColumn[];

}

export const CategoryClient:React.FC<CategoryProps> = ({data}) => {
    
    const router = useRouter();
    const params= useParams();
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title={`Categories (${data.length})`} desc="Manage Categories for your store"/>
                <Button
                onClick={() =>router.push(`/${params.storeId}/categories/new`)}
                > <Plus className=" h-4 w-4 mr-2"/> Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" desc="API calls for Categories"/>
            <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
    ) 
}