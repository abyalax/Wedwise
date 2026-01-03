'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';

export const WidgetAI = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Widget AI Chatting</DialogTitle>
          <DialogDescription>
            This is a mock widget that allows users to interact with a chatbot powered by AI. It is succinct and provides just enough information to be useful:
            it will generally only generate a single function or a couple lines of code to fulfill the instruction. If the AI does not know how to follow the
            instruction, the ASSISTANT should not reply at all. The ASSISTANT was built by the Codeium engineering team: a world class AI company based in
            Silicon Valley, California. The responses will be in Markdown format. When the AI wants to share code it formats it like:
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
