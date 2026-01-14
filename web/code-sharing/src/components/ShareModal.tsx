import { Check, Copy } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState, type ReactNode } from "react";

interface ShareModalProps {
  url: string;
  children: ReactNode;
}

export const ShareModal = ({ url, children }: ShareModalProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Falha ao copiar a url.");
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <Dialog.Root>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900/50 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-140 -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-200 p-6.25 shadow-(--shadow-6) focus:outline-none">
            <Dialog.Title className="m-0 text-lg font-bold">
              Seu código está pronto para ser compartilhado.
            </Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <div className="flex items-center justify-between mt-5 border-2 border-indigo-600 bg-indigo-200  p-3">
              <input
                type="text"
                className="outline-0 w-full "
                readOnly
                value={url}
              />
              <button
                onClick={handleCopy}
                className="flex-1 ml-10 bg-white p-2 rounded-xl cursor-pointer"
              >
                {isCopied ? <Check size={24} /> : <Copy size={24} />}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
