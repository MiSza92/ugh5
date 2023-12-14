"use client";
import Container from "../Container";
import CategoryBox from "../CategoryBox";

import { MdOutlinePets } from "react-icons/md";
import { IoIosHammer } from "react-icons/io";
import { GiFarmer } from "react-icons/gi";
import { FaReact } from "react-icons/fa6";
import { MdChildFriendly } from "react-icons/md";

export const tasks = [
  {
    label: "Pet sitting",
    icon: MdOutlinePets,
    description: "Cuddle someone elses pet !",
  },
  {
    label: "Construction",
    icon: IoIosHammer,
    description: "Repair someone elses house !",
  },
  {
    label: "Farming",
    icon: GiFarmer,
    description: "Work at someone elses garden !",
  },
  {
    label: "Webdevelopment",
    icon: FaReact,
    description: "Devlop at someone elses website, to live here !",
  },
  {
    label: "Child care",
    icon: MdChildFriendly,
    description: "Care for a child, to live here !",
  },
];

const Tasks = () => {
  return (
    <Container>
      <div
        className="
  pt-4
  flex
  flex-row
  items-center
  justify-between
  overflow-x-auto"
      >
        {tasks.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Tasks;
