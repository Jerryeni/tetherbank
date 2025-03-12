'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Utility to merge Tailwind classes
import { ReactNode } from 'react';
import Image from 'next/image';

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode; // Accepts any custom content inside the modal
  hideButtons?: boolean; // Allows hiding action buttons if needed
  icon?: string;
}

export function GenericModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = 'Approve',
  cancelText = 'Cancel',
  children,
  hideButtons = false,
  icon,
}: GenericModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "bg-[#EBF8FF] max-w-md w-full mx-auto p-6 rounded-3xl fixed bottom-0 left-1/2 -translate-x-1/2",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex flex-col items-center text-center">

          {/* Optional Icon */}
          {icon && (
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-6">
              <Image src={icon} alt="Icon" width={32} height={32} />
            </div>
          )}

          {/* Optional Title */}
          {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}

          {/* Optional Description */}
          {description && <p className="text-gray-400 mb-4">{description}</p>}

          {/* Custom Content Area */}
          {children}

          {/* Buttons (Can be hidden) */}
          {!hideButtons && (
            <div className="flex gap-3 w-full mt-6">
              <Button
                variant="outline"
                className="flex-1 rounded-full text-primary"
                onClick={() => onOpenChange(false)}
              >
                {cancelText}
              </Button>
              {onConfirm && (
                <Button
                  className="flex-1 bg-primary hover:bg-blue-700 rounded-full"
                  onClick={onConfirm}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}