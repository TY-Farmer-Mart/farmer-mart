
import { ReactNode } from "react";
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    showClose?: boolean;
    headerImage?: string;
    headerClassName?: string;
    contentClassName?: string;
    children: ReactNode;
    footer?: ReactNode;
}