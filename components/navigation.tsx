'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Wallet, Users, History, Settings, Menu, DotIcon, EllipsisVerticalIcon, CircleEllipsis } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GenericModal } from './ui/generic-modal';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Investment', href: '/investment', icon: Wallet },
  { name: '', href: '/wallet', icon: "/icon2.svg" }, // Center item (Bigger)
  { name: 'History', href: '/history', icon: History },
];

const modalNavigation = [
  { name: 'Referral', href: '/referral', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card max-w-md mx-auto">
        <div className="px-6">
          <div className="flex justify-between items-center py-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              const isCenterItem = index === Math.floor(navigation.length / 2); // Detect center item

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1',
                    isActive ? 'text-primary' : 'text-secondary'
                  )}
                >
                  {typeof item.icon === 'string' ? (
                    <Image
                      src={item.icon}
                      alt={item.name || "Center Icon"}
                      width={isCenterItem ? 40 : 20} // Bigger if center item
                      height={isCenterItem ? 40 : 20}
                      className={isCenterItem ? "" : ""}
                    />
                  ) : (
                    <item.icon
                      className={cn("w-5 h-5", isCenterItem && "w-10 h-10")}
                    />
                  )}
                  {item.name && <span className="text-[10px]">{item.name}</span>}
                </Link>
              );
            })}

            {/* Settings Button (Triggers Modal) */}
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="flex flex-col items-center gap-1 text-secondary"
            >
              <CircleEllipsis className="w-5 h-5" />
              <span className="text-[10px]">More</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sliding Modal */}
      <GenericModal open={isModalOpen} onOpenChange={setIsModalOpen} hideButtons>

          <div className="space-y-2 w-full">
            {modalNavigation.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="flex items-center gap-4 p-3 w-full rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                <item.icon className="w-6 h-6 text-gray-600" />
                <span className="text-md font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
      </GenericModal>
    </>
  );
}