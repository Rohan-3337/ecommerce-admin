import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { URL } from "url";

export async function GET(req: Request, {params}:{params:{storeId:string}}){
    try {
        // const {userId} = auth();
        
        // if(!userId) return new NextResponse("Unuthorized",{status: 401});
       const {searchParams}= new URL(req.url);
       const categoryId = searchParams.get("categoryId")|| undefined;
       const colorId = searchParams.get("colorId")|| undefined;
       const sizeId = searchParams.get("sizeId")|| undefined;
       const isFeatured = searchParams.get("isFeatured");
        if(!params.storeId) return new NextResponse("Store Id is required",{status:400});
        // const storebyUserId = await prisma.store.findFirst({
        //     where:{
        //         id: params.storeId,
        //         userId
        //     }
        // })
        // if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});
        const Products = await prisma.product.findMany({
            where:{
                storeId: params?.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured:isFeatured?true:undefined,
                isArchived:false,

            },include:{
                images:true,
                color:true,
                category:true,
                size:true,
            },
            orderBy:{
                createdAt:"desc",
            }
        })
        return NextResponse.json(Products);
        
    } catch (error) {
        console.error("[Product_POST]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}


export async function POST(req: Request, {params}:{params:{storeId:string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name,price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,

        } = body;
        if(!userId) return new NextResponse("Unuthorized",{status: 401});
        if(!name) return new NextResponse("name is required",{status:400});
        if(!price) return new NextResponse("price is required",{status:400});
        if(!categoryId) return new NextResponse("categoryId is required",{status:400});
        if(!colorId) return new NextResponse("colorId is required",{status:400});
        if(!sizeId) return new NextResponse("sizeId is required",{status:400});
        if(!images || images.length ===0) return new NextResponse("images  is required",{status:400});
        if(!params.storeId) return new NextResponse("Store Id is required",{status:400});
         
        const Product = await prisma.product.create({
            data:{
                name:name,
                price:price,
                isArchived,
                isFeatured,
                sizeId:sizeId,
                colorId:colorId,
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url:string}) =>image)
                        ]
                    }
                },
                categoryId:categoryId,
                storeId:params.storeId
            }
        })
        return NextResponse.json(Product);
        
    } catch (error) {
        console.error("[Product_GET]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}