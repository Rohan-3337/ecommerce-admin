import prisma from "@/lib/prismadb"
import { BillboardForm } from "./components/bill-board-from"

const page = async({params}:{params:{billboardId:string}}) => {
    const billboard = await prisma.billboard.findUnique({
        where:{
            id:params.billboardId,
        }
    })
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">

  <BillboardForm initialData={billboard}/>
      </div>
    </div>
  )
}

export default page