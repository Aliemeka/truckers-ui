import { FC } from "react";

interface LocationProps {
  longitude: number;
  lattitude: number;
}

const TruckLocation: FC<LocationProps> = ({ longitude, lattitude }) => {
  return (
    <div className="bg-gray-300 py-4 px-5 rounded-sm flex w-full space-x-4">
      <p className="text-sm">Longitude: {longitude}</p>
      <p className="text-sm">Longitude: {lattitude}</p>
    </div>
  );
};

export default TruckLocation;
