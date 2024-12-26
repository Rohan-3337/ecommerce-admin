import prisma from "@/lib/prismadb"
import { SizeForm } from "./components/size-board-from"

const page = async({params}:{params:{sizeId:string}}) => {
    const Size = await prisma.size.findUnique({
        where:{
            id:params.sizeId,
        }
    })
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">

  <SizeForm initialData={Size}/>
      </div>
    </div>
  )
}

export default page