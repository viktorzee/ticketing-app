import { useState, useEffect } from 'react';
import { ModalProps } from "../../types/modalProps";
import Modal from './Modal';
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {  useAppDispatch } from '../../state-management/hooks';
import LoadingSpinner from '../LoadingSpinner';
import { store } from "../../state-management/features/ticketSlice";
import Swal from "sweetalert2";
import { getAllTickets } from '../../state-management/features/ticketSlice';

const AddTicketModal = ({ modalIsOpen, setModalOpen }: ModalProps) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  let initialValues = {
    name: "" , 
    subject: "" ,
    assignedTo:  "" ,
    priority: "" , 
    status:  "" ,
    createDate:  "" ,	
    dueDate: "" ,  
  } 

  useEffect( () => {
    dispatch(getAllTickets()).unwrap()
    .then((promiseResult: string) => {
      setErrorMessage("");
    })
    .catch((errorResponse: any) => {
      setErrorMessage(errorResponse.message);
    })
    }, 
    [dispatch]
  )

  return (
    <Modal modalIsOpen={modalIsOpen} setModalOpen={setModalOpen}>
      <div className="flex items-center justify-end mb-4">
        <button className="text-3xl" onClick={() => setModalOpen(false)}>
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col items-center px-4 md:px-5 mb-32 space-y-7">
        <h2 className="text-blue text-3xl">Add Ticket</h2>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={Yup.object({
            name: Yup.string().required('Requester is Required'),
            subject: Yup.string().required('Subject is Required'),
            assignedTo: Yup.string().required('Assignee is Required'),
            priority: Yup.string().required('Priority is Required'),
            status: Yup.string().required('Status is Required'),
            createDate: Yup.string().required('Create Date is Required'),
            dueDate: Yup.string().required('Due Date is Required'),
            })}
            onSubmit={ async (values, actions) => {
              try {
                await dispatch(store(values)).unwrap();     
                Swal.fire({
                  title: 'Success',
                  text: 'Ticket saved successfully!',
                  icon: 'success',
                }).then(() => {
                  window.location.reload(); // reload the page
                });
              } catch (err) {
                Swal.fire({
                  title: 'Error',
                  text: 'Failed to save ticket.',
                  icon: 'error',
                });
                console.log(err);
              } 
  
            }}
      >
       {({
         isSubmitting,
         isValid,
         status
       }) => (
         <Form className="form" >

            { isSubmitting && <LoadingSpinner /> }
            { status &&  <div className="text-white "> { status } </div>   }
           <div className="grid grid-cols-12 gap-5">
           
            <div className="col-span-12">
            <label className="block" htmlFor="name">
                  Requested By
              </label>
              <Field
                type="text"
                name="name"
                className="form-input"
              />
              <ErrorMessage name="name" component="div" className="text-red-900" />
            </div>

            <div className="col-span-12">
            <label className="block" htmlFor="subject">
                  Subject
              </label>
              <Field
                type="text"
                name="subject"
                className="form-input"
              />
              <ErrorMessage name="subject" component="div" className="text-red-900" />
            </div>
           

            <div className="col-span-6">
              <label className="block" htmlFor="assignedTo">
                Assigned To
              </label>
              <Field
                type="text"
                name="assignedTo"
                className="form-input"
              />
                <ErrorMessage name="assignedTo" component="div" className="text-red-900" />
            </div>

            <div className="col-span-6">
            <label className="block" htmlFor="priority">
                Priority
              </label>
                <Field as="select" name="priority" className="form-input">
                  <option value="">Select Priority </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  </Field>
                <ErrorMessage name="priority" component="div" className="text-red-900" />
            </div>

            <div className="col-span-12">
            <label className="block" htmlFor="status">
                Status
              </label>
                <Field as="select" name="status" className="form-input">
                  <option value="">Select Status </option>
                  <option value="pending">Pending</option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-900" />
            </div>

            <div className="col-span-12">
              <label className="block" htmlFor="createDate">
                Create Date
              </label>
                <Field
                  type="date"
                  name="createDate"
                  className="form-input"
                />
                <ErrorMessage name="createDate" component="div" className="text-red-900" />
            </div>
            <div className="col-span-12">
              <label className="block" htmlFor="dueDate">
                Due Date
              </label>
                <Field
                  type="date"
                  name="dueDate"
                  className="form-input"
                />
                <ErrorMessage name="dueDte" component="div" className="text-red-900" />
            </div>

              <div className="col-span-6">
                <button type="button"  className="focus:outline-none inline-flex items-center justify-center rounded px-6 py-1.5 text-center text-white bg-gray-600" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              </div>
              <div className="col-span-6">
                <button type="submit"  className={`${ ( isValid && !isSubmitting ) ? 
                  "focus:outline-none inline-flex items-center justify-center rounded px-6 py-1.5 text-center text-white bg-blue-600" : 
                  "cancel_btn cursor-not-focus:outline-none inline-flex items-center justify-center rounded px-6 py-1.5 text-center text-white bg-gray-600" } text-lg disabled:opacity-0 float-right`} disabled={isSubmitting} >
                  Save
                </button>
              </div>
            </div>
         </Form>
       )}
     </Formik>
        
      </div>
    </Modal>
  );
};

export default AddTicketModal ;
