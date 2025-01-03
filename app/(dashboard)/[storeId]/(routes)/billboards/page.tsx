
import prisma from "@/lib/prismadb"
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import {format} from "date-fns"

const BillBoardPages = async({params}:{params:{storeId:string}}) =>{
    const billboards = await prisma.billboard.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    const formatedBillboards:BillboardColumn[] =billboards.map((item)=>({
        id:item.id,
        label:item.label,
        createdAt:format(item.createdAt,"MMMM do, yyyy"),
    }))
    return (
        <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formatedBillboards}/>
            </div>
        </div>
        </>
    )
}

export default BillBoardPages;