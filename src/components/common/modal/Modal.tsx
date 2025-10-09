import React from "react";
import { X } from "lucide-react";
import { ModalProps } from "@/types/commonTypes";

/**
 * 
 * @param isOpen | boolean | Mandatory
 * @param title | string | Optional
 * @param showClose | ReactNode | Optional 
 * @param headerImage | ReactNode | Optional 
 * @param children | JSX.Element | Optional 
 * @param headerClassName | string | Optional 
 * @param contentClassName | string | Optional 
 * @param footer | JSX.Element | Optional 
 * @returns 
 */

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    showClose = true,
    headerImage,
    headerClassName = "",
    contentClassName = "",
    children,
    footer,
}) => {
    if (!isOpen) return null;
    const footerArray = React.Children.toArray(footer);

    return (
        <div className="fixed inset-0 bg-[#00000099] flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md relative overflow-hidden">
                {showClose && (
                    <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-black z-10"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                )}

                {headerImage && (
                    <div className="w-full flex justify-center pt-[30px]">
                        <img
                            src={headerImage}
                            alt="Header"
                            className="w-12 h-12 object-cover"
                        />
                    </div>
                )}

                {title && (
                    <h2
                        className={`text-2xl font-poppins font-bold py-[30px] px-4 text-center ${headerClassName}`}
                    >
                        {title}
                    </h2>
                )}

                <div className={`px-4 pb-4 justify-center ${contentClassName}`}>
                    {children}
                </div>

                {footer && (
                    <div className="px-4 py-6 flex gap-3 w-full">
                        {footerArray.length === 1
                            ? (() => {
                                const child = footerArray[0];
                                if (!React.isValidElement(child)) return child;

                                return React.cloneElement(
                                    child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
                                    {
                                        className: `${(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props
                                            .className || ""
                                            } w-full text-center`,
                                    }
                                );
                            })()
                            : footerArray.map((child, i) => {
                                if (!React.isValidElement(child)) return child;

                                return React.cloneElement(
                                    child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
                                    {
                                        key: i,
                                        className: `${(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props
                                            .className || ""
                                            } flex-1`,
                                    }
                                );
                            })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
