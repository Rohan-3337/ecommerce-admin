"use client"

import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandList, Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "./ui/command";

type popovertriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends popovertriggerProps {
    items: Store[];

}

export default function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map(item => (
        {
            label: item.name,
            value: item.id,
        }
    ));
    const [open, setOpen] = useState(false);


    const currentStore = formattedItems.find(items => items.value === params.storeId);
    const onStoreSelect = (store: { value: string }) => {
        setOpen(false);
        router.push(`/${store.value}`)
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"sm"} role="combobox" aria-expanded={true}
                    aria-label="Select a Store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="h-4 mr-2 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className=" ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Store..." />
                        <CommandEmpty>No Store Found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((item) => (
                                <CommandItem key={item.value}
                                    onSelect={() => onStoreSelect(item)}
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {item.label}
                                    <Check className={cn("ml-auto h-4 w-4", currentStore?.value === item.value ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandGroup heading="Create New Store">

                        <CommandItem
                            onSelect={() => { setOpen(false); storeModal.onOpen() }}>
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create Store
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}