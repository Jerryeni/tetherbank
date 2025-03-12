// components/ui/Modal.tsx
'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  cancelText?: string;
  approveText?: string;
  onApprove?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  cancelText = 'Cancel',
  approveText = 'Approve',
  onApprove,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#EBF8FF] rounded-2xl p-6 w-[90%] max-w-md shadow-lg"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
          >
            <div className="flex justify-end">
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              {icon && <div className="mb-4">{icon}</div>}
              <h2 className="text-xl font-bold">{title}</h2>
              {description && <p className="text-gray-500 mt-2">{description}</p>}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" className="flex-1 bg-gray-200" onClick={onClose}>
                {cancelText}
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 ml-2" onClick={onApprove}>
                {approveText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}