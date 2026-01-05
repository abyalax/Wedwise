import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Theme } from '~/app/themes/_types';

export interface OrderStore {
  orderId?: string;
  theme: Theme | null;

  setTheme: (theme: Theme) => void;
  setOrderId: (orderId: string) => void;
  reset: () => void;
}

export const useOrderStore = create<OrderStore>()(
  devtools(
    persist(
      immer((set) => ({
        orderId: undefined,
        theme: null,

        setTheme: (theme) =>
          set((state) => {
            state.theme = theme;
          }),

        setOrderId: (orderId) =>
          set((state) => {
            state.orderId = orderId;
          }),

        reset: () =>
          set(() => ({
            orderId: undefined,
            theme: null,
          })),
      })),
      {
        name: 'order-store',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          orderId: state.orderId,
          theme: state.theme,
        }),
      },
    ),
    { name: 'OrderStore' },
  ),
);
