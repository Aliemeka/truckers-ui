import { useState, useEffect, FC, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TruckContext } from "../../providers/TruckProvider";

import { InputGroup } from "../Form";
import Modal from ".";
import axios from "axios";

interface EditTruckProps {
  name: string;
  driver: string;
  range: string;
  truckId: number;
  open: number;
  onSuccess: VoidFunction;
}

const EditTruckModal: FC<EditTruckProps> = ({
  name,
  driver,
  range,
  truckId,
  open,
  onSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [openModal, toggleModal] = useState<number>(0);

  const { increaseCount } = useContext(TruckContext);

  const formik = useFormik({
    initialValues: {
      name: name,
      driver: driver,
      range: range,
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
        .put(`http://localhost:5000/trucks/${truckId}`, values)
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
    toggleModal(open);
  }, [open]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        toggleModal(0);
        increaseCount();
        onSuccess();
      }, 600);
    }
    return () => clearTimeout();
  }, [success]);

  return (
    <Modal open={openModal} title="Edit truck">
      <form className="mt-2" onSubmit={formik.handleSubmit}>
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
        <div className="grid gap-y-2">
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
            error={formik.touched.driver && formik.errors.driver ? true : false}
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
        </div>

        <div className="mt-4 mb-2 sm:mb-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none"
          >
            {loading ? "Updating truck" : "Update Truck"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTruckModal;
