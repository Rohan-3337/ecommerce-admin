
import prisma from "@/lib/prismadb"
import { ProductForm } from "./components/product-from"

const page = async({params}:{params:{productId:string,storeId:string}}) => {
  
    const Product = await prisma.product.findUnique({
        where:{
            id:params.productId,
        },include:{
          images:true
        }
    })
    console.log(Product);
    const categories = await prisma.category.findMany({
      where: {
          storeId: params.storeId
      }
  });

  const sizes = await prisma.size.findMany({
      where: {
          storeId: params.storeId
      }
  });

  const colors = await prisma.color.findMany({
      where: {
          storeId: params.storeId
      }
  });
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">

  <ProductForm initialData={Product}
  
  categories={categories}
  sizes={sizes}
  colors={colors}/>
      </div>
    </div>
  )
}

export default page