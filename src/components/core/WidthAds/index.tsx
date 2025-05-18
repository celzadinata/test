import Image from "next/image";
import sample from "../../../../public/assets/oasis.jpg";

export default function WidthAds({ value }: { value: number }) {
  return (
    <div
      className={`mt-6 bg-gray-100 aspect-${value}/1 rounded-lg flex items-center justify-center`}
    >
      <p className="text-center">Advertisement</p>
    </div>
  );
}
