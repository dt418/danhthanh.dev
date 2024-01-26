import React, { Fragment } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

export default async function HeaderInfo() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLogin: boolean = await isAuthenticated();
  const userInfo = await getUser();
  return (
    <div className="flex flex-row gap-2">
      <ThemeSwitcher />
      {isLogin ? (
        <Fragment>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={String(userInfo?.picture)} />
                <AvatarFallback>
                  {userInfo?.given_name?.at(0) ?? "DT"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{userInfo?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogoutLink
                    className="inline-flex gap-2"
                    postLogoutRedirectURL="/"
                  >
                    <LogOutIcon size={20} /> Log out
                  </LogoutLink>
                  <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      ) : (
        <Fragment>
          <LoginLink postLoginRedirectURL="/">
            <Button>Login</Button>
          </LoginLink>
          <RegisterLink postLoginRedirectURL="/">
            <Button variant="secondary">Sign up</Button>
          </RegisterLink>
        </Fragment>
      )}
    </div>
  );
}
