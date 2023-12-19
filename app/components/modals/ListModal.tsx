"use client";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { tasks } from "../navBar/Tasks";
import ImageUploadWidget from "../upload/ImageUploadWidget";
import TaskInput from "./TaskInput";
import { useSession } from "next-auth/react";
import User from "@/app/schemas/user";
import mongoose from "mongoose";

interface ListModalProps {
  open: boolean;
  onClose: () => void;
}

enum STEPS {
  TASK = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
}

const ListModal: React.FC<ListModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<STEPS>(STEPS.TASK);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [task, setTask] = useState<string>("");
  const [location, setLocation] = useState("");
  const [info, setInfo] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [minGuests, setMinGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(1);
  const [iD, setID] = useState("");

  const [serverData, setServerData] = useState<User | null>(null);
  const getServerData = async (email) => {
    try {
      const res = await fetch(`api/users?email=${encodeURIComponent(email)}`, {
        method: "GET",
      });

      if (res.ok) {
        const { user } = await res.json();

        await setServerData(user);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleSubmit = async () => {
    console.log("serverData :>> submit", serverData);
    // setEmail(useremail);
    if (!title || !task || !location || !info || !images || !iD) {
      setError("all Fields must be applied");
    } else {
      try {
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("tasks", task);
        formdata.append("location", location);
        formdata.append("info", info);
        formdata.append("user", iD);

        images.forEach((image, index) => {
          formdata.append("images", image);
        });

        formdata.append("minGuests", minGuests);
        formdata.append("maxGuests", maxGuests);
        console.log("formdata :>> ", formdata);
        const res = await fetch("api/listings", {
          method: "POST",
          body: formdata,
        });

        if (res.ok) {
          const { message } = await res.json();
          console.log("res :>> ", res);
          alert(message);
          onClose();
        } else {
          console.log("Listing creation failed :>> ");
          const { message } = await res.json();
          console.log("message :>> ", message);
        }
      } catch (error) {
        console.log("something went wrong with listing creation :>> ", error);
      }
    }
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    if (step === STEPS.IMAGES) {
      handleSubmit();
    }
    setStep((value) => value + 1);
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
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
    // if (step === STEPS.TASK) {
    //   return setTask(item);
    // }
  };

  useEffect(() => {
    if (serverData) {
      const { _id: id } = serverData;
      console.log("ID aus serverData:", id);
      setID(id);
    }
  }, [serverData]);

  const { data } = useSession();
  useEffect(() => {
    const email = data?.user?.email as string;
    console.log("email :>> ", email);
    //  setEmail(userEmail);

    const fetchData = async () => {
      if (email) {
        const bla = await getServerData(email);
        console.log("bla :>> ", bla);
      }
    };

    fetchData();
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <h1>Which tasks you want to have done ?</h1>
      <div className="grid grid-cols-2 gap-3  overflow-y-hidden">
        {tasks.map((item) => (
          <div key={item.label} className="col-span-1">
            <TaskInput
              onClick={handleAction}
              selected={task === item.label}
              // selected={task === item.label}
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
        <h1>Upload some images for your listing</h1>
        <ImageUploadWidget
          value={images}
          fileCount={5}
          onChange={async (url) => {
            // console.log("url :>> ", url);
            // await setImages(url);
            setImages((prevImages) => [...prevImages, url]);
          }}
        />
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
