"use client";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Tasks, { tasks } from "../navBar/Tasks";
import ListInput from "./ListInput";
import ImageUploadWidget from "../upload/ImageUploadWidget";

interface ListModalProps {
  open: boolean;
  onClose: () => void;
}

enum STEPS {
  TASK = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
}

const ListModal: React.FC<ListModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<STEPS>(STEPS.TASK);
  const [error, setError] = useState("");
  const [task, setTask] = useState<typeof tasks | null>(null);
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<[string]>([""]);

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return "send";
    }
    return "next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.TASK) {
      return undefined;
    }
    return "back";
  }, [step]);
  () => {};

  const handleAction = (item) => {
    setTask(item);
    if (step === STEPS.TASK) {
      return setTask(item);
    }
  };
  const handleSubmit = () => {
    onClose();
  };
  useEffect(() => {
    console.log("task :>> ", task);
    console.log("location :>> ", location);
    console.log("info :>> ", info);
    console.log("title :>> ", title);
  }, [task, location, info, title]);
  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <h1>Which tasks you want to have done ?</h1>
      <div className="grid grid-cols-2 gap-3  overflow-y-hidden">
        {tasks.map((item) => (
          <div key={item.label} className="col-span-1">
            <ListInput
              onClick={handleAction}
              selected={task === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div>
        <form action={onNext}>
          <h1>Where is your location?</h1>
          <input
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Adress"
            className="bg-zinc-100 rounded-lg "
          />
        </form>
      </div>
    );
  }
  //   title: String;
  //   description: String;
  //   tasks: [String];
  //   location: String;
  //   info: String;
  //   image: [String];
  //   minGuests: number;
  //   maxGuests: number;
  if (step === STEPS.INFO) {
    bodyContent = (
      <div>
        {/* Modal content */}
        {/* </div>
      <div> */}
        <h1>Give a short description of your listing</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="bg-zinc-100 rounded-lg mt-2 w-full"
        />
        <input
          onChange={(e) => setInfo(e.target.value)}
          type="text"
          placeholder="Info"
          className="bg-zinc-100 rounded-lg py-5 mt-2 w-full"
        />
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div>
        {/* Modal content */}
        {/* </div>
        <div> */}
        <h1>Upload some images for your listing</h1>
      </div>
    );
  }
  return (
    <Modal
      title="Create your own listing"
      isOpen={open}
      onClose={handleSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.TASK ? undefined : onBack}
      action={onNext}
      error={error}
      body={bodyContent}
    ></Modal>
  );
};

export default ListModal;
