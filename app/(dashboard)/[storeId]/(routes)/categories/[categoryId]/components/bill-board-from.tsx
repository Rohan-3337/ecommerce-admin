"use client"

import { AlertModal } from "@/components/alert-modal";
import ApiAlert from "@/components/api-alert";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category, Store } from "@prisma/client"
import axios from "axios";
import { Router, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";


interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[];
}
const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;
export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const title = initialData ? "Edit Category" : "Create a Category";
    const description = initialData ? "Edit a description" : "Create a description";
    const toastMessage = initialData ? "Category Updated" : "Created Category";
    const action = initialData ? "Save Changes" : "Create a Category";
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        },
    })

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params?.storeId}/categories/${params?.categoryId}`, data);

            } else {

                await axios.post(`/api/${params?.storeId}/categories`, data);
            }
            router.refresh();
            router.push(`/${params?.storeId}/categories`)
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
            await axios.delete(`/api/${params?.storeId}/categories/${params?.categoryId}`);
            toast.success("Category deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error("Make sure you remove all categories using this category first")
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
                                        <Input disabled={loading} placeholder="Category Name"{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            } />
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>BillboardId</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (

                                                <SelectItem key={billboard.id} value={billboard.id}>
                                                    {billboard.label}
                                                </SelectItem>

)

                                            )}
                                        </SelectContent>

                                    </Select>
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