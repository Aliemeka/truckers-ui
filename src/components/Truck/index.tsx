import { FC } from "react";
import { Link } from "react-router-dom";

interface TruckProps {
  id: number | string;
  imageSrc: string;
  name: string;
  driver: string;
  range: number | string;
}

const Truck: FC<TruckProps> = ({ id, imageSrc, name, driver, range }) => {
  return (
    <div className="group relative bg-gray-200">
      <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between px-2">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{driver}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{range}</p>
      </div>
    </div>
  );
};

export default Truck;
