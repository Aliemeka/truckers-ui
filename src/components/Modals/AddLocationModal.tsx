import { useState, useEffect, FC, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TruckContext } from "../../providers/TruckProvider";

import { InputGroup } from "../Form";
import Modal from ".";
import axios from "axios";

interface LocationProps {
  truckId: number;
  open: number;
  onSuccess: VoidFunction;
}

const AddLocationModal: FC<LocationProps> = ({ truckId, open, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [openModal, toggleModal] = useState<number>(0);

  const { increaseCount } = useContext(TruckContext);

  const formik = useFormik({
    initialValues: {
      longitude: "",
      lattitude: "",
    },
    validationSchema: Yup.object({
      longitude: Yup.number().required("Longitude is required"),
      lattitude: Yup.number().required("Lattitude is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError(false);
      setSuccess(false);
      axios
        .post(`http://localhost:5000/trucks/${truckId}/locations`, values)
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
            error={
              formik.touched.longitude && formik.errors.longitude ? true : false
            }
            label="Longitude*"
            name="longitude"
            errorText={
              formik.touched.longitude && formik.errors.longitude
                ? formik.errors.longitude
                : ""
            }
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.longitude}
          />
          <InputGroup
            error={
              formik.touched.lattitude && formik.errors.lattitude ? true : false
            }
            errorText={
              formik.touched.lattitude && formik.errors.lattitude
                ? formik.errors.lattitude
                : ""
            }
            label="Lattitude*"
            name="lattitude"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lattitude}
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

export default AddLocationModal;
