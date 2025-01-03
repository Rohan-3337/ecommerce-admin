"use client"

import { AlertModal } from "@/components/alert-modal";
import ApiAlert from "@/components/api-alert";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client"
import axios from "axios";
import { Router, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";


interface SettingFormProps {
    initialData: Store;
}
const formSchema = z.object({
    name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;
export const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    })
    const onSubmit = async(data:SettingsFormValues) =>{
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`,data);
            router.refresh();
        } catch (error) {
            toast.error("something went wrong")
        }finally{
            setLoading(false);
        }
    }
    const OnDelete= async() => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            toast.success("Store deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error("something went wrong")
        }finally{
            setLoading(false);
        }
    }
    return (
        <>
        <AlertModal isOpen={open}
        onClose={()=>setOpen(false)}
        onConfirm={()=>{OnDelete();}}
        loading={loading}
        />
            <div className=" flex items-center justify-between">
                <Heading title="Settings"
                    desc="Manage Store Preferences" />
                <Button variant={"destructive"}
                    size={"sm"}
                    onClick={() => { }}>
                    <Trash className=" h-4 w-4"  onClick={()=>setOpen(true)}/>

                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store Name"{...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                        }/>
                    </div>
                    <Button className=" ml-auto" disabled={loading}>
                        Save Changes
                    </Button>
                
                </form>

            </Form>
            <Separator/>
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
        </>

    )
}