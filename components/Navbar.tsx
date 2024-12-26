import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./MainNav";
import StoreSwitcher from "./store-switch";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

const Navbar =async ()=>{
    const {userId} = auth();
    if(!userId) redirect("/sign-in");
    const stores= await prisma.store.findMany({
        where:{
            userId: userId,
        }
    })
    
    

    return(
        <div className="border-b">
            <div className="flex h-16 items-center px-4 gap-3">
                <StoreSwitcher items={stores}/>
                <MainNav/>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle/>
                    <UserButton/>
                </div>
            </div>
        </div>
    )
}
export default Navbar;