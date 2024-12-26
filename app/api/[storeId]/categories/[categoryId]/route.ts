import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req: Request, {params}:{params:{storeId:string,categoryId:string}}){

    try {
        
        
        const categories = await prisma.category.findFirst({
            where:{
                id: params.categoryId,
                
            },
            include:{
                billboard:true,
            }
            
        });

        return NextResponse.json(categories);



    } catch (error) {
        console.log("[BillBoard_GET]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
export async function PATCH(req: Request, {params}:{params:{storeId:string,categoryId:string}}){

    try {
        const {userId} =auth();
        const body = await req.json();
        const {name,billboardId} = body;
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        if(!name){
            return new NextResponse("name is Missing",{status:400});

        }
        if(!billboardId){
            return new NextResponse("billboard Id is Missing",{status:400});

        }
        if(!params.categoryId){
            return new NextResponse("Category Id is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});

        const billboard = await prisma.category.updateMany({
            where:{
                id: params.categoryId,
                
            },
            data:{
                name,
                billboardId
            }
        });

        return NextResponse.json(billboard);



    } catch (error) {
        console.log("[CATEGORYID_PATCH]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}


export async function DELETE(req: Request, {params}:{params:{storeId:string,categoryId:string}}){

    try {
        const {userId} =auth();
       
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        
        if(!params.categoryId){
            return new NextResponse("Category Id is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});
        const category = await prisma.category.delete({
            where:{
                id: params.categoryId,
                
            },
            
        });

        return NextResponse.json(category);



    } catch (error) {
        console.log("[CATEGORYID_DELETE]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}