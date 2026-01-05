import { Plus, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { Guest, RsvpStatus } from '../guests/_types';

interface AddGuestDialogProps {
  onAdd?: (guest: Omit<Guest, 'id' | 'createdAt'>) => void;
}

export function AddGuestDialog({ onAdd }: AddGuestDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    rsvpStatus: 'pending' as RsvpStatus,
    numberOfGuests: 1,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd?.({
      ...formData,
      numberOfGuests: formData.rsvpStatus === 'confirmed' ? formData.numberOfGuests : 0,
    });
    setFormData({
      name: '',
      phone: '',
      email: '',
      rsvpStatus: 'pending',
      numberOfGuests: 1,
      notes: '',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Tamu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Tambah Tamu Baru
          </DialogTitle>
          <DialogDescription>Masukkan informasi tamu undangan Anda</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Masukkan nama tamu"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">No. WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rsvpStatus">Status RSVP</Label>
              <Select value={formData.rsvpStatus} onValueChange={(value: RsvpStatus) => setFormData({ ...formData, rsvpStatus: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="confirmed">Hadir</SelectItem>
                  <SelectItem value="declined">Tidak Hadir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.rsvpStatus === 'confirmed' && (
              <div className="space-y-2">
                <Label htmlFor="numberOfGuests">Jumlah Tamu</Label>
                <Input
                  id="numberOfGuests"
                  type="number"
                  min={1}
                  max={10}
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Catatan tambahan (opsional)"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={!formData.name.trim()}>
              Simpan Tamu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
