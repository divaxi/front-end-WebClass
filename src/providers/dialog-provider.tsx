import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactElement } from "react";

interface DialogContextType {
  openDialog: (dialog: ReactElement) => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [currentDialog, setCurrentDialog] = useState<ReactElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (currentDialog) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [currentDialog]);

  const openDialog = useCallback((dialog: ReactElement) => {
    setCurrentDialog(dialog);
  }, []);

  const closeDialog = useCallback(() => {
    setCurrentDialog(null);
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isDialogOpen }}>
      {children}
      {currentDialog}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog phải được sử dụng trong DialogProvider");
  }
  return context;
};
