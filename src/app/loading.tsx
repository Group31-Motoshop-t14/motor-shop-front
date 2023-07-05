import { GiCarWheel } from "react-icons/gi";

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-grey3 bg-opacity-50 text-gray-900">
      <div className="flex h-screen items-center justify-center">
        <span className="text-2xl">_____________</span>
        <GiCarWheel className="animate-spin text-8xl" />
        <span className="text-2xl">_____________</span>
      </div>
    </div>
  );
}
