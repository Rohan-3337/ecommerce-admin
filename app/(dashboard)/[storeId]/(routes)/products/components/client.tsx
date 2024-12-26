"use client"
import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface ProductProps{
    data:ProductColumn[];

}

export const ProductClient:React.FC<ProductProps> = async({data}) => {
    
    const router = useRouter();
    const params= useParams();
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title={`Products (${data.length})`} desc="Manage Product for your store"/>
                <Button
                onClick={() =>router.push(`/${params.storeId}/products/new`)}
                > <Plus className=" h-4 w-4 mr-2"/> Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" desc="API calls for Products"/>
            <ApiList entityName="products" entityIdName="productId"/>
        </>
    ) 
}