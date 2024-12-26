"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "../modal"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema =z.object({
    name:z.string().min(3),
})
export const StoreModal =()=>{
    const useModal =useStoreModal();
    const [loading, setLoading] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
        }
    });

    const submit = async (values:z.infer<typeof formSchema>)=>{
        try {
            setLoading(true);
            const res = await axios.post("/api/stores",values);

            toast.success("Store Created Successfully");
            window.location.assign(`/${res?.data?.id}`);

        } catch (error) {
            toast.error("Something went wrong...")
            console.log(error);
        }finally {
            setLoading(false);
        }
    }

    return (
        <Modal 
         title={"Create Store"}
          isOpen={useModal.isOpen}
          description="Add a new Store To Menage Products and Categories"
          onClose={useModal.onClose}

          >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submit)}>
                            <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="E-commerce" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}>

                            </FormField>
                            <div className="pt-6 space-x-2 flex items-center justify-end">
                                 <Button variant={"outline"} onClick={useModal.onClose}>Cancel</Button>
                                 <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}