import RingLoader from "react-spinners/RingLoader";

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <RingLoader color="#0067FF" />
    </div>
  );
}

export default Loading;
