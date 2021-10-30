import { useCallback, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { Redirect } from "react-router-dom";

import { InputGroup } from "../components/Form";
import Layout from "../components/Layout";
import axios from "axios";

const AddTruck = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/emekadinary/upload`;
    const formData = new FormData();
    const preset = `hspftiay`;
    formData.append("upload_preset", preset);
    formData.append("file", acceptedFiles[0]);
    const response = await axios.post(cloudinaryUrl, formData);
    const data = response.data;
    setImageUrl(data.url);
    console.log(data.url);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({ onDrop, accept: "image/*", multiple: false });

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
      setLoading(true);
      setError(false);
      setSuccess(false);
      axios
        .post("http://localhost:5000/trucks", values)
        .then((res) => {
          if (res.status === 200) {
            console.log("Success");
          }
          setSuccess(true);
          setLoading(false);
        })
        .catch(() => {
          console.log("failed");
          setError(true);
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        <Redirect to="/" />;
      }, 600);
    }
    () => clearTimeout();
  }, [success]);

  useEffect(() => {
    formik.values.imgSrc = imageUrl;
  }, [imageUrl]);

  return (
    <Layout pageTitle="Add Truck" heading="Add New Truck">
      <div className="relative bg-white rounded shadow-lg p-7 sm:p-10 my-8 w-11/12 sm:w-2/3 md:w-3/4 lg:w-2/3 mx-auto">
        {success ? (
          <div className="h-10 grid place-items-center bg-green-300 text-green-700">
            Truck successfully uploaded
          </div>
        ) : (
          error && (
            <div className="h-10 bg-red-200 grid place-items-center text-red-600">
              Upload failed
            </div>
          )
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-2 gap-y-2 gap-x-4 md:gap-x-6">
            <InputGroup
              error={formik.touched.name && formik.errors.name ? true : false}
              label="Name*"
              description="model of truck"
              name="name"
              errorText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
              placeholder="MAX9123"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <InputGroup
              error={
                formik.touched.driver && formik.errors.driver ? true : false
              }
              errorText={
                formik.touched.driver && formik.errors.driver
                  ? formik.errors.driver
                  : ""
              }
              label="Driver*"
              description="name of driver"
              name="driver"
              placeholder="Kehinde Oghenekaro"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.driver}
            />
            <InputGroup
              error={formik.touched.range && formik.errors.range ? true : false}
              errorText={
                formik.touched.range && formik.errors.range
                  ? formik.errors.range
                  : ""
              }
              label="Range*"
              description="Range in km"
              name="range"
              placeholder="100"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.range}
            />
            <div>
              <label
                htmlFor="image"
                className="font-medium text-sm md:text-base w-full text-blue-600"
              >
                Image
              </label>
              {imageUrl && (
                <img src={imageUrl} alt="Trunk image" className="w-full my-1" />
              )}
              <div
                {...getRootProps()}
                className={`w-full rounded border-dashed grid place-items-center h-20 border text-sm
                ${
                  isDragActive
                    ? isDragAccept
                      ? "border border-blue-700 ring-1 ring-blue-400 text-blue-600 bg-blue-100 cursor-pointer"
                      : "border-red-500 ring-1 ring-red-300 text-red-500 bg-red-200 cursor-not-allowed"
                    : "border-gray-400 text-gray-500 cursor-pointer"
                }`}
              >
                <input {...getInputProps()} />
                {imageUrl ? "Change" : "Add"} truck image here
              </div>
            </div>
          </div>

          <div className="mt-4 mb-2 sm:mb-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none"
            >
              {loading ? "Adding truck" : "Add Truck"}
            </button>
          </div>
          <p className="text-xs text-blue-600 font-semibold sm:text-sm">
            Required*
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default AddTruck;
