import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import imagesData from "../assets/images";

const CertificatePreview = () => {
  const navigate = useNavigate();
  const certificate = useSelector((state) => state.certificate) || {};
  const certificateRef = useRef();

  // Function to Download PDF
  const handleDownloadPDF = () => {
    const input = certificateRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", [1123, 794]); // A4 Landscape size
      pdf.addImage(imgData, "PNG", 0, 0, 1123, 794);
      pdf.save(`${certificate.name || "certificate"}.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      {/* Scaled Certificate Container */}
      <div className="w-full flex justify-center">
        <div
          ref={certificateRef}
          className="relative origin-top-left scale-[0.5] md:scale-100 transform"
          style={{ width: "1123px", height: "794px" }}
        >
          <div
            className="w-full h-full bg-no-repeat bg-cover bg-center p-6 md:p-16"
            style={{ backgroundImage: `url(${imagesData.certificate.src})` }}
          >
            <div className="flex justify-between items-center mt-6 mx-4 md:mx-10">
              <img className="w-24 md:w-[200px]" src={imagesData.accenture.src} alt="Accenture" />
              <img className="w-12 md:w-[80px]" src={imagesData.magicbus.src} alt="Magic Bus" />
            </div>
            <h1 className="text-2xl md:text-6xl text-center mt-4 md:mt-6">Certificate of Completion</h1>
            <h3 className="px-2 md:px-4 py-1 md:py-2 mt-4 md:mt-8 border-b-2 border-black w-3/4 mx-auto text-center text-lg md:text-2xl">
              {certificate.name || "Your Name"}
            </h3>
            <p className="text-sm md:text-xl text-center mt-4 md:mt-6">has successfully completed</p>
            <p className="text-sm md:text-xl text-center mt-2 md:mt-4">
              {`the ${certificate.course || "Course"} Programme in Magic Bus India Foundation at Medavakkam`}
            </p>
            <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-3">
              <p className="text-sm md:text-2xl">from</p>
              <p className="px-2 md:px-4 py-1 md:py-2 border-b-2 border-black text-sm md:text-lg">{certificate.from}</p>
              <p className="text-sm md:text-2xl">to</p>
              <p className="px-2 md:px-4 py-1 md:py-2 border-b-2 border-black text-sm md:text-lg">{certificate.to}</p>
            </div>
            <div className="mt-6 md:mt-8">
              <img src={imagesData.sign.src} alt="Signature" className="mx-auto w-24 md:w-auto" />
              <p className="text-xs md:text-base text-center mt-1">Jayant Rastogi</p>
              <p className="text-xs md:text-base text-center mt-1">Global CEO</p>
              <p className="text-xs md:text-base text-center mt-1">Magic Bus India Foundation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <button onClick={handleDownloadPDF} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:text-base">
          Download PDF
        </button>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm md:text-base">
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;
