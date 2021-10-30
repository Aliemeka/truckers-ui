import axios from "axios";
import { useState, useEffect, useContext, lazy } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import AddLocationModal from "../components/Modals/AddLocationModal";
import EditTruckModal from "../components/Modals/EditTruckModal";
import TruckLocation from "../components/TruckLocation";
import { LocationType, TruckType } from "../utils/types";

const TruckPage = () => {
  const { id } = useParams<{ id: string }>();
  const [truck, setTruck] = useState<TruckType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [modalOpen, openModal] = useState<number>(0);
  const [updated, setUpdated] = useState<number>(0);
  const [locationModal, setLocationModal] = useState<number>(0);

  const [loadLocations, setLoadLocations] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    setLoading(true);
    setSuccess(false);
    axios
      .get(`http://localhost:5000/trucks/${id}`)
      .then((res) => {
        const truckData = res.data;
        setLoading(false);
        setSuccess(true);
        setTruck(truckData);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [updated]);

  useEffect(() => {
    if (success) {
      setLoadLocations(true);
      axios
        .get(`http://localhost:5000/trucks/${id}/locations`)
        .then((res) => {
          console.log(res.data);
          setLoadLocations(false);
          setLocations(res.data);
        })
        .catch(() => {
          setLoadLocations(false);
        });
    }
  }, [success]);

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      openModal(0);
      setLocationModal(0);
      setUpdated(Math.random);
    }, 300);
  };

  useEffect(() => {
    setLocationModal(0);
    openModal(0);
  }, []);

  const handleClick = () => {
    openModal(modalOpen + 1);
  };

  return (
    <Layout pageTitle="Truck Details" heading="Details of truck">
      {loading ? (
        <div className="container bg-gray-300 animate-pulse h-60 mx-auto my-10" />
      ) : truck ? (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={truck.imageSrc}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  SN: {truck.id}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {truck.name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <div className="leading-relaxed">
                  Locations:
                  {loadLocations ? (
                    <div className="grid w-full gap-y-3">
                      <div className="bg-gray-300 h-12 animate-pulse" />
                      <div className="bg-gray-300 h-12 animate-pulse" />
                      <div className="bg-gray-300 h-12 animate-pulse" />
                    </div>
                  ) : locations.length ? (
                    <div className="grid w-full gap-y-3">
                      {locations.map((loct) => (
                        <TruckLocation
                          lattitude={loct.longitude}
                          longitude={loct.latitude}
                          key={id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm  text-gray-500">
                      <em>No locations</em>
                      <br />
                      <br />
                      <br />
                    </div>
                  )}
                </div>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    {truck.color}
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Range</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option>{truck.range}km</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-lg text-gray-900">
                    Driven by {truck.driver}
                  </span>
                  <button
                    onClick={() => handleClick()}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 justify-center items-center focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setLocationModal(Math.random())}
                    className="rounded-full px-6 py-2 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                    Add Location
                  </button>
                </div>
              </div>
            </div>
          </div>
          <EditTruckModal
            open={modalOpen}
            driver={truck.driver}
            name={truck.name}
            range={truck.range}
            truckId={truck.id}
            onSuccess={handleUpdate}
          />
          <AddLocationModal
            onSuccess={handleUpdate}
            truckId={truck.id}
            open={locationModal}
          />
        </section>
      ) : (
        <section className="grid py-12 place-items-center h-20">
          Truck not found!
        </section>
      )}
    </Layout>
  );
};

export default TruckPage;
