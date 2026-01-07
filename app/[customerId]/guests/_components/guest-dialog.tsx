import { Plus, UserPlus } from 'lucide-react';
import { FC, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { FormGuest } from './form/form-guest';
import { FormDataGuest } from './form/guest-schema';

type Props = {
  initialValues?: FormDataGuest;
  onSubmit: (_data: FormDataGuest) => void;
  isLoading?: boolean;
  buttonText?: string;
};

export const GuestDialog: FC<Props> = ({ onSubmit, initialValues, isLoading, buttonText }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Guest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            {buttonText}
          </DialogTitle>
          <DialogDescription>Enter the guest information for your wedding</DialogDescription>
        </DialogHeader>
        <FormGuest isLoading={isLoading} onSubmit={onSubmit} initialValues={initialValues} buttonText="Add Guest" />
      </DialogContent>
    </Dialog>
  );
};
