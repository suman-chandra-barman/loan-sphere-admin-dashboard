"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LegalPolicyDialogProps {
  title: string;
  triggerLabel: string;
}

export default function LegalPolicyDialog({
  title,
  triggerLabel,
}: LegalPolicyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={triggerLabel === "View" ? "secondary" : "outline"}
          size="sm"
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogCloseButton />
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Details {title}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>{title}</Label>
            <Input defaultValue={`App - ${title}`} className="bg-zinc-50" />
          </div>
          <div className="space-y-2">
            <Label>Effective Date</Label>
            <Input defaultValue="11/21/2024" className="bg-zinc-50" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              defaultValue="ACCEPTANCE OF TERMS You access to and use of www.sozohair.net (the Website) and any Services referred to in Clause 2, is subject exclusively to these Terms and Conditions. You will not use the Website/Services for any purpose that is unlawful or prohibited by these Terms and Conditions. By using the Website/Services you are fully accepting the terms, conditions and disclaimers contained in this notice. If you do not accept these Terms and Conditions you must immediately stop using the Website/Services."
              className="min-h-[180px] bg-zinc-50"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button>Edit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
