
import prisma from "@/lib/prismadb"
import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import {format} from "date-fns"

const SizePages = async({params}:{params:{storeId:string}}) =>{
    const sizes = await prisma.size.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    const formatedsizes:SizeColumn[] =sizes.map((item)=>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt:format(item.createdAt,"MMMM do, yyyy"),
    }))
    return (
        <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formatedsizes}/>
            </div>
        </div>
        </>
    )
}

export default SizePages;