"use client";
interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
   mx-auto
   px-10"
    >
      {children}
    </div>
  );
};

export default Container;
