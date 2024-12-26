import { create } from "zustand";

interface useStoreModalInterface{
    
  isOpen: boolean;
  
  onClose: () => void;
  onOpen: () => void;
}


export const useStoreModal = create<useStoreModalInterface>((set)=>(
    {
      isOpen:false,
      onClose:()=>set({isOpen:false}),
      onOpen:()=>set({isOpen:true}),  
    }
))