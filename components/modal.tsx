"use client"

import React, { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface ModalProps {
  title: string;
  isOpen: boolean;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ title, isOpen, description, onClose, children }) => {
  const Onchange = (open:boolean) => {
      if(!open){
        onClose();
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={Onchange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>
            {children}
          </div>
        </DialogContent>
    </Dialog>
  );
};

export default Modal;
