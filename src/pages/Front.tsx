import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Truck from "../components/Truck";
import { TruckType } from "../utils/types";

const Front = () => {
  const [trucks, setTrucks] = useState<TruckType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/trucks")
      .then((res) => {
        setLoading(false);
        const data = res.data;
        setTrucks(data);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        console.log(e);
      });
  }, []);

  return (
    <Layout pageTitle="Home" heading="Welcome to Truckers Ng">
      <section className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-700">
          All Trucks
        </h2>
        {error ? (
          <div className="w-full h-60 border-2 border-red-400 bg-red-100 grid place-items-center mt-6">
            <p className="text-red-800 text-center">
              Error loading trucks
              <br />
              Reload page
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {loading ? (
              <>
                <div className="bg-gray-100 h-96 animate-pulse" />
                <div className="bg-gray-100 h-96 animate-pulse" />
                <div className="bg-gray-100 h-96 animate-pulse" />
              </>
            ) : trucks.length > 0 ? (
              trucks.map((truck) => (
                <Truck
                  key={truck.id}
                  id={truck.id}
                  driver={truck.color}
                  imageSrc={truck.imageSrc}
                  name={truck.name}
                  range={truck.range}
                />
              ))
            ) : (
              <div className="text-center text-gray-600">No trucks added</div>
            )}
          </div>
        )}
      </section>
      <section className="grid w-full justify-center">
        <Link
          to="/add-truck"
          className="w-full flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Add a truck
        </Link>
      </section>
    </Layout>
  );
};

export default Front;
