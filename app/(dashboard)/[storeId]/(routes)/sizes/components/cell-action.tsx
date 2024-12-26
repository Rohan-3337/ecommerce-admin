"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SizeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/alert-modal";

interface CellActionProps {
    data: SizeColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Size Id copied successfully");
    };

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Track dropdown menu state

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params?.storeId}/sizes/${data.id}`);
            toast.success("Size deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error("Make sure you remove all categories using Size");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    useEffect(() => {
        if (!open) {
            setMenuOpen(false);
        }
    }, [open]);

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="w-8 h-8 p-0" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className="sr-only"> open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                {menuOpen && (
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/${params?.storeId}/sizes/${data.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCopy(data.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Id
                        </DropdownMenuItem>
                        <DropdownMenuItem className={cn("text-red-500")} onClick={() => setOpen(true)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </>
    );
};

export default CellAction;
