'use client';

import { signOut } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';

interface ConfirmLogoutProps {
  icon?: ReactNode;
}

export const ConfirmLogout: FC<ConfirmLogoutProps> = ({ icon }) => {
  const handleSignOut = () => signOut();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="cursor-pointer bg-transparent">
        {icon}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to logout ?</AlertDialogTitle>
          <AlertDialogDescription>Do you want to log out of your account and end your current session?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
