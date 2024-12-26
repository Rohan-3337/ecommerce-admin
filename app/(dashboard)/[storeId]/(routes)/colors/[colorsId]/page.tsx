import prisma from "@/lib/prismadb"
import { ColorForm } from "./components/color-board-from"

const page = async({params}:{params:{colorsId:string}}) => {
    const Color = await prisma.color.findUnique({
        where:{
            id:params.colorsId,
        }
    })
    
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">

  <ColorForm initialData={Color}/>
      </div>
    </div>
  )
}

export default page