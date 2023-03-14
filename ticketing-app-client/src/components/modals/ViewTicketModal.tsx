import React, { useEffect } from 'react';
import Modal from './Modal';
import { IoClose } from "react-icons/io5";
import {  useAppDispatch, useAppSelector } from '../../state-management/hooks';
import { getAllTickets, selectAllTickets, selectTicketRecord } from '../../state-management/features/ticketSlice';


type ModalProps = {
    viewModalIsOpen: boolean;
    setViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id?: string;
  };

const ViewTicketModal = ({ viewModalIsOpen, setViewModalOpen }: ModalProps) => {
  const dispatch = useAppDispatch();
  const ticketRecord = useAppSelector(selectTicketRecord);

  const formattedCreatDate = new Date(ticketRecord.createDate);
  const formattedDueDate = new Date(ticketRecord.dueDate);



  useEffect( () => {
      dispatch(getAllTickets());
  }, [dispatch]);

  return (
    <Modal modalIsOpen={viewModalIsOpen} setModalOpen={setViewModalOpen}>
      <div className="flex items-center justify-end mb-4">
        <button className="text-xl" onClick={() => setViewModalOpen(false)}>
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col  px-4 md:px-5 mb-32 space-y-7">
            <h2 className="text-blue text-3xl">Ticket Details</h2>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4"> Requested by </div>
                <div className="col-span-8"> { ticketRecord.name ? ticketRecord.name : "" } </div>
                <div className="col-span-4"> Subject </div>
                <div className="col-span-8"> { ticketRecord.subject ? ticketRecord.subject : "" } </div>
                <div className="col-span-4"> Assigned to </div>
                <div className="col-span-8"> { ticketRecord.assignedTo ? ticketRecord.assignedTo : "" } </div>
                <div className="col-span-4"> Priority </div>
                <div className="col-span-8"> { ticketRecord.priority ? ticketRecord.priority : "" } </div>
                <div className="col-span-4"> Status </div>
                <div className="col-span-8"> { ticketRecord.status ? ticketRecord.status : "" } </div> 
                <div className="col-span-4"> Created Date </div>
                <div className="col-span-8"> { formattedCreatDate.toLocaleDateString() ? formattedCreatDate.toLocaleDateString() : "" } </div>
                <div className="col-span-4"> Due Date </div>
                <div className="col-span-8"> { formattedDueDate.toLocaleDateString() ? formattedDueDate.toLocaleDateString() : "" } </div>

            </div>
        
      </div>
    </Modal>
  );
};

export default ViewTicketModal ;
