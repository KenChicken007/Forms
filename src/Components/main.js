import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion as m } from "framer-motion";
import { useEffect } from "react";

export default function Main() {
  const [submit, setsubmit] = useState(false);
  const [pieces, setpieces] = useState(300);

  const stopConfetti = () => {
    setTimeout(() => {
      setpieces(0);
      window.location.reload(true);
    }, 15000);
  };

  useEffect(() => {
    stopConfetti();
  }, []);

  //Formik Logic
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "United Kingdom",
      terms: "",
    },
    //Validate

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be 20 characters or less.")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      terms: Yup.array().required("Terms of service must be checked"),
    }),

    //Submit
    onSubmit: (values) => {
      console.log(values);
      setsubmit(true);
    },
  });

  const Resultmodal = () => {
    const fadeLeft = {
      hidden: { opacity: 0, y: -100 },
      visible: { opacity: 1, y: 0 },
    };
    return (
      <>
        <m.div
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className={` z-10 bg-white absolute left-1/3 top-10 bottom-1500 text-center rounded-lg border-2 border-black w-1/3 h-1/5 font-latoRegular text-gray-600 p-16`}
        >
          <h1 className="text-3xl pb-4 font-bold">Registration Complete! </h1>
          <p>We have sent you a confirmation email at {formik.values.email}</p>
        </m.div>
        <Confetti gravity={0.2} numberOfPieces={pieces} />,
      </>
    );
  };

  return (
    <>
      {submit && <Resultmodal />}
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="z-0 relative h-screen flex items-center justify-center"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white flex rounded-lg w-1/2 font-latoRegular"
        >
          <div className=" flex-1 text-gray-700 p-20">
            <h1 className="text-3xl pb-2 font-bold">Let's get Started </h1>
            <p className="text-lg text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque, corrupti!
            </p>
            {/* Name */}
            <div className="mt-6 ">
              <div className="pb-4">
                <label
                  className={`block font-latoBold pb-2 ${
                    formik.touched.name && formik.errors.name
                      ? "text-red-500"
                      : ""
                  }`}
                  htmlFor="name"
                >
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : "Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your name"
                  className="border-2 border-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                />
              </div>
              {/* Email */}
              <div className="pb-4">
                <label
                  className={`block font-latoBold pb-2 ${
                    formik.touched.email && formik.errors.email
                      ? "text-red-500"
                      : ""
                  }`}
                  htmlFor="email"
                >
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Enter your email"
                  className="border-2 border-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                />
              </div>
              {/* Country */}
              <div className="pb-4">
                <label className="block font-latoBold pb-2" htmlFor="country">
                  Country
                </label>
                <select
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  className="border-2 border-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>Norway</option>
                </select>
              </div>
              {/* Terms of Service */}
              <div className="pb-4">
                <label
                  className={`block font-latoBold pb-2 ${
                    formik.touched.terms && formik.errors.terms
                      ? "text-red-500"
                      : ""
                  }`}
                  htmlFor="terms"
                >
                  {formik.touched.terms && formik.errors.terms
                    ? formik.errors.terms
                    : "Terms of Service"}
                </label>
                <div className="flex gap-2">
                  <input
                    className="h-5 w-5 text-teal-500 border-2 focus:border-teal-500 focus:ring-teal-500"
                    name="terms"
                    value="checked"
                    type="checkbox"
                    onChange={formik.handleChange}
                  />
                  <p>I agree with the terms and conditions</p>
                </div>
              </div>
              <button
                type="submit"
                className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
              >
                Start learning Today
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            <img
              className="h-full object-fill"
              src={require("../Images/form.png")}
              alt=""
            />
          </div>
        </form>
      </m.main>
    </>
  );
}
