import React, { useCallback, useEffect, useState } from "react";

interface ModalProps {
  title: string;
  error: string;
  isOpen: boolean;
  body: React.ReactNode;
  actionLabel: string;
  secondaryActionLabel?: string;
  action: () => void;
  secondaryAction: () => void;
  // onSubmit: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  // onSubmit,
  actionLabel,
  action,
  secondaryActionLabel,
  body,
  error,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // if (!showModal) {
  //   return null;
  // }
  // const handleOnClose = useCallback(() => {
  //   setShowModal(false);
  //   onClose();
  // }, [onClose]);
  const handleOnClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;

    if (target.id === "container") {
      setShowModal(false);
      onClose();
    }
  };
  // const handleSubmit = useCallback(() => {
  //   onSubmit();
  // }, [onSubmit]);

  // const handleOnClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const target = e.target as HTMLDivElement;

  //   if (target.id === "container") {
  //     onClose();
  //   }
  // };
  // const handleOnAction = (e) => {
  //   action();
  // };

  return (
    <>
      {isOpen && (
        <div
          id="container"
          className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/20"
          onClick={handleOnClose}
        >
          <div className="shadow-lg p- rounded-lg border-t-4 border-blue-500 bg-white w-1/5 px-2 py-2">
            {/* {Head} */}
            <div className="flex justify-between border-b-2 border-gray text-xl font-bold my-1 mx-2 text-black">
              <h1> {title}</h1>{" "}
              <button className="" onClick={onClose}>
                X
              </button>{" "}
            </div>
            <div className="flex flex-col px-2 pt-2 text-black">
              {body}
              {secondaryActionLabel}
              <button
                type="submit"
                className="rounded bg-blue-500 text-white mt-2"
                onClick={action}
              >
                {actionLabel}
              </button>{" "}
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-lg mt-2">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
