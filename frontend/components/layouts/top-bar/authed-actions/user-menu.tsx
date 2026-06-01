"use client";

import { Avatar } from "@/components/ui/avatar/avatar";
import { logoutAction } from "@/features/auth/actions/logout";
import { SessionUser } from "@/features/auth/types/session-user";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";

type Props = {
  user: SessionUser;
};

const menuItems = [
  {
    href: "/profile",
    text: "Profile settings",
  },
  {
    href: "/library",
    text: "My content",
  },
];

export function UserMenu({ user }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cursor-pointer">
        <Avatar user={user} size="sm" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={20}
          className="w-sm bg-white shadow-sm font-medium"
        >
          <DropdownMenu.Item className="outline-none flex flex-col items-center p-6 gap-4 bg-gray-50">
            <Avatar user={user} size="xl" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-xl">
                {user.firstName} {user.lastName}
              </span>
              <span className="font-normal">{user.email}</span>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="bg-gray-200 h-px" />

          {menuItems.map((item) => (
            <DropdownMenu.Item key={item.text} className="outline-none" asChild>
              <Link
                href={item.href}
                className="inline-block w-full px-4 py-3 text-lg data-highlighted:text-kahoot-purple"
              >
                {item.text}
              </Link>
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className="bg-gray-200 h-px" />

          <DropdownMenu.Item
            onClick={logoutAction}
            className="outline-none border-l-2 border-transparent hover:border-red-600 w-full flex gap-3 px-4 py-3 items-center text-lg text-red-600 cursor-pointer"
          >
            <LogOut size={24} />
            <span>Sign out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
