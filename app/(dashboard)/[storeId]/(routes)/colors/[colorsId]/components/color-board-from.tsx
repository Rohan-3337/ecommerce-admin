"use client"

import { AlertModal } from "@/components/alert-modal";
import ApiAlert from "@/components/api-alert";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Color, Store } from "@prisma/client"
import axios from "axios";
import { Router, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";


interface ColorFormProps {
    initialData: Color | null;
    
}
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/,{
        message:"String must be a hex code"
    }),
})

type SettingsFormValues = z.infer<typeof formSchema>;
export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const title = initialData ? "Edit Color" : "Create a Color";
    const description = initialData ? "Edit a description" : "Create a description";
    const toastMessage = initialData ? "Color Updated" : "Created Color";
    const action = initialData ? "Save Changes" : "Create a Color";
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    })

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params?.storeId}/colors/${params?.colorsId}`, data);

            } else {

                await axios.post(`/api/${params?.storeId}/colors`, data);
            }
            router.refresh();
            router.push(`/${params?.storeId}/colors`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("something went wrong")
        } finally {
            setLoading(false);
        }
    }
    const OnDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params?.storeId}/colors/${params?.colorsId}`);
            toast.success("Color deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error("Make sure you remove all  using this Color first")
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <AlertModal isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => { OnDelete(); }}
                loading={loading}
            />
            <div className=" flex items-center justify-between">
                <Heading title={title}
                    desc={description} />
                {initialData && (

                    <Button variant={"destructive"}
                        size={"sm"}
                        onClick={() => { }}>
                        <Trash className=" h-4 w-4" onClick={() => setOpen(true)} />

                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-8 w-full">

                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Color Name"{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            } />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">

                                        <Input disabled={loading} placeholder="Color Value"{...field} />
                                        <div className="border border-black p-4 rounded-full" style={{backgroundColor:field.value}}/>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            } />
                    </div>
                    <Button className=" ml-auto" disabled={loading}>
                        {action}
                    </Button>

                </form>

            </Form>
            <Separator />
        </>

    )
}