import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'

export default function CodeVerification() {
  const [apiError, setApiError] = useState("")
  const [callingResponse, setCallingResponse] = useState(false)
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Code is required"),
  })

  const handleCode = async (formValues) => {
    setCallingResponse(true)
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
      setApiError("")
      navigate("/resetpassword")
    } catch (error) {
      setCallingResponse(false)
      setApiError(error.response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleCode,
  })

  return (
    <div className='h-screen pt-14'>
      <h1 className='text-2xl py-5 w-3/4 mx-auto'>Please enter your Code Verification</h1>
      <form className="w-3/4 mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer"
            placeholder=" "
            required
          />
          <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Code
          </label>
        </div>
        {apiError && <div className="text-red-500 text-sm mb-3">{apiError}</div>}
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
          {callingResponse ? <ClipLoader size={16} color="#ffffff" /> : "Verify"}
        </button>
      </form>
    </div>
  )
}
