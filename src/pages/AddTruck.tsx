import { useFormik } from "formik";
import * as Yup from "yup";

import { InputGroup } from "../components/Form";
import Layout from "../components/Layout";

const AddTruck = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      driver: "",
      range: "",
      imgSrc: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(22, "Name is too long more than 22 characters")
        .required("Name is required"),
      driver: Yup.string()
        .max(22, "Driver name is too long more than 22 characters")
        .required("Driver is required"),
      range: Yup.number().required("Range is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout pageTitle="Add Truck" heading="Add New Truck">
      <div className="relative bg-white rounded shadow-lg p-7 sm:p-10 my-8 w-11/12 sm:w-2/3 md:w-3/4 lg:w-2/3 mx-auto">
        <h3 className="mb-4 text-xl font-semibold sm:text-center text-blue-700 sm:mb-6 sm:text-2xl">
          Truck Details
        </h3>
        <form>
          <div className="grid md:grid-cols-2 gap-y-2 gap-x-4 md:gap-x-6">
            <InputGroup
              error={false}
              label="Name*"
              description="model of truck"
              name="name"
              placeholder="MAX9123"
              type="text"
            />
            <InputGroup
              error={false}
              label="Driver*"
              description="model of truck"
              name="driver"
              placeholder="MAX9123"
              type="text"
            />
            <InputGroup
              error={false}
              label="Name"
              description="model of truck"
              name="name"
              placeholder="MAX9123"
              type="text"
            />
            <InputGroup
              error={false}
              label="Name"
              description="model of truck"
              name="name"
              placeholder="MAX9123"
              type="text"
            />
          </div>

          <div className="mt-4 mb-2 sm:mb-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none"
            >
              Add Truck
            </button>
          </div>
          <p className="text-xs text-gray-600 sm:text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default AddTruck;
