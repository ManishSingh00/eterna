"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogContent = ({ className, ...props }: DialogPrimitive.DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[min(95vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-pulse-border bg-pulse-surface p-6 shadow-2xl focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  </DialogPrimitive.Portal>
);

const DialogTitle = ({ className, ...props }: DialogPrimitive.DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn("text-xl font-semibold text-pulse-text", className)}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: DialogPrimitive.DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-pulse-text-muted", className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
