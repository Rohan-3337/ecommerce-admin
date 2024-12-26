
"use client"
import { AlertModal } from "@/components/alert-modal";
import ApiAlert from "@/components/api-alert";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUpload  from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Store } from "@prisma/client"
import axios from "axios";
import { Router, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";


interface BillboardFormProps {
    initialData: Billboard | null; 
}
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;
export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const title = initialData ? "Edit BillBoard" : "Create a BillBoard";
    const description = initialData ? "Edit a description" : "Create a description";
    const toastMessage = initialData ? "BillBoard Updated" : "Created BillBoard";
    const action = initialData ? "Save Changes" : "Create a BillBoard";
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label:"",
            imageUrl:"",
        },
    })
     
    const onSubmit = async(data:SettingsFormValues) =>{
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params?.storeId}/billboards/${params?.billboardId}`,data);

            }else{

                await axios.post(`/api/${params?.storeId}/billboards`,data);
            }
            router.refresh();
            router.push(`/${params?.storeId}/billboards`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("something went wrong")
        }finally{
            setLoading(false);
        }
    }
    const OnDelete= async() => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params?.storeId}/billboards/${params?.billboardId}`);
            toast.success("Billboard deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error("Make sure you remove all categories using billboard")
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
                <Heading title={title}
                    desc={description} />
                {initialData &&(

                    <Button variant={"destructive"}
                    size={"sm"}
                    onClick={() => { }}>
                    <Trash className=" h-4 w-4"  onClick={()=>setOpen(true)}/>

                </Button>
                    )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                        
                                <FormControl>
                                    <ImageUpload value={field.value ?[field.value]:[]}
                                    disabled={loading}
                                    onChange={(url)=>field.onChange(url)}
                                    onRemove={()=>field.onChange("")}/>
                                    
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }/>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                        control={form.control}
                        name="label"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store Name"{...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                        }/>
                    </div>
                    <Button className=" ml-auto" disabled={loading}>
                        {action}
                    </Button>
                
                </form>

            </Form>
            <Separator/>
        </>

    )
}