
import prisma from "@/lib/prismadb"
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import {format} from "date-fns"
import { formatter } from "@/lib/utils";

const ProductPages = async({params}:{params:{storeId:string}}) =>{
    const Products = await prisma.product.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
            category:true,
            size:true,
            color:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    const formatedProducts:ProductColumn[] =Products.map((item)=>({
        id:item.id,
        name:item.name,
        isArchived:item.isArchived,
        isFeatured:item.isFeatured,
        price:formatter.format(item.price.toNumber()),
        size:item.size.value,
        color:item.color.value,
        category:item.category.name,
        createdAt:format(item.createdAt,"MMMM do, yyyy"),
    }))
    return (
        <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formatedProducts}/>
            </div>
        </div>
        </>
    )
}

export default ProductPages;