// components/ReusableDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface ReusableDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm?: () => void;
  children?: React.ReactNode;
  showFooter?: boolean;
  confirmButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const ReusableDialog = ({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  children,
  showFooter = true,
}: ReusableDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] px-6 py-20 border-none rounded-2xl bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle
            className={`text-[24px] md:text-[32px] border-b-2 border-b-gray-200 pb-2 ${
              variant === "destructive" ? "text-[#F04438]" : "text-heading-blue"
            } font-bold mb-3`}
          >
            {title}
          </DialogTitle>
          <DialogDescription className="text-[16px] text-paragraph-gray">
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}

        {showFooter && (
          <DialogFooter className="pt-6 flex gap-4">
            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                className="bg-primary-orange px-2 rounded-md text-white hover:bg-orange-600 cursor-pointer"
              >
                {confirmText}
              </button>
            )}

            <DialogClose asChild>
              <button className="text-[#F04438] border border-gray-300 hover:bg-gray-100  hover:text-primary-orange rounded-md px-4 py-2 cursor-pointer">
                {cancelText}
              </button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
