"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AlertModal } from "@/components/alert-modal";

interface CellActionProps{
    data:BillboardColumn;
}

export const CellAction:React.FC<CellActionProps> = ({data}) =>{
    const router = useRouter();
    const params =useParams();

    const onCopy = (id:string) =>{
        navigator.clipboard.writeText(id);
        toast.success("Billboard Id copied successfully");
        
    }
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const OnDelete= async() => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params?.storeId}/billboards/${data.id}`);
            toast.success("Billboard deleted successfully");
            router.refresh();

        } catch (error) {
            toast.error("Make sure you remove all categories using billboard")
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }
    return(
        <>
        <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={OnDelete} loading={loading}/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="w-8 h-8 p-0">
                    <span className="sr-only"> open menu</span>
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Action
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>router.push(`/${params?.storeId}/billboards/${data.id}`)}>
                    <Edit className=" mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                    <Copy className=" mr-2 h-4 w-4"/>
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem className={cn("text-red-500")} onClick={()=>setOpen(true)}>
                    <Trash className=" mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}