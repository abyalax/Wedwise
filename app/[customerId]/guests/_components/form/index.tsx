'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { FallBack } from '~/components/fragments/fallback';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { GuestStatus } from '~/generated/prisma/enums';
import { FormDataGuest, guestSchema } from './schema';

interface FormProps {
  initialValues?: FormDataGuest;
  onSubmit: (_data: FormDataGuest) => void;
  isLoading?: boolean;
  buttonText?: string;
}

export const FormCustomer: FC<FormProps> = ({ onSubmit, initialValues, isLoading = false, buttonText = 'Submit' }) => {
  const form = useForm<FormDataGuest>({
    resolver: zodResolver(guestSchema),
    defaultValues: initialValues ?? {
      name: '',
      phone: '',
      participant: '1',
      note: '',
      status: GuestStatus.Invited,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Suspense fallback={<FallBack />}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter guest name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter guest phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="participant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participant</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter total participant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Status Guest Invitation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Invited">Invited</SelectItem>
                      <SelectItem value="Attending">Attending</SelectItem>
                      <SelectItem value="NotAttending">NotAttending</SelectItem>
                      <SelectItem value="Declined">Declined</SelectItem>
                      <SelectItem value="Maybe">Maybe</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any Notes to this guest ?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : buttonText}
          </Button>
        </form>
      </Form>
    </Suspense>
  );
};
