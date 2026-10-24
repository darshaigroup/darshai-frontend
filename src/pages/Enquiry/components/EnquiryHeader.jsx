import{ArrowLeft}from"lucide-react";
import{motion}from"framer-motion";
import{useNavigate}from"react-router-dom";

export default function EnquiryHeader({step}){
  const navigate=useNavigate();

  const handleBack=()=>{
    navigate("/enquiry");
  };

  return(
    <></>
  );
}