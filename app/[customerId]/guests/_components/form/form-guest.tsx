'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Select } from '~/components/fragments/input/select';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { FormDataGuest, guestSchema } from './guest-schema';

type Props = {
  initialValues?: FormDataGuest;
  onSubmit: (_data: FormDataGuest) => void;
  isLoading?: boolean;
  buttonText?: string;
};

export const FormGuest: FC<Props> = ({ onSubmit, initialValues, isLoading = false, buttonText = 'Submit' }) => {
  const form = useForm<FormDataGuest>({
    resolver: zodResolver(guestSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      rsvpStatus: 'PENDING',
      participant: 1,
      notes: '',
      reason: '',
      ...initialValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-7">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Lengkap *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan Nama Tamu" />
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
              <FormLabel>No. WhatsApp</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="08xxxxxxxxxx" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="example@gmail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rsvpStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status RSVP</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  className="cursor-pointer"
                  placeholder="Select RSVP..."
                  options={[
                    { label: 'Confirmed', value: 'CONFIRMED' },
                    { label: 'Pending', value: 'PENDING' },
                    { label: 'Cancelled', value: 'CANCELLED' },
                    { label: 'Attended', value: 'ATTENDED' },
                    { label: 'Not Available', value: 'NOTAVAILABLE' },
                    { label: 'Represented', value: 'REPRESENTED' },
                  ]}
                />
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
                <Input type="number" {...field} min={1} max={100} placeholder="How many people will be attending?" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="e.g. Coming with 2 siblings" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="e.g. Job out of town" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : buttonText}
        </Button>
      </form>
    </Form>
  );
};
