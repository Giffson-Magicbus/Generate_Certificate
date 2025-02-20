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
    html2canvas(input, { scale: window.innerWidth < 768 ? 3 : 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", [1123, 794]); // A4 Landscape size
      const imgWidth = 1123;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${certificate.name || "certificate"}.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 w-full">
      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        className="w-full max-w-[90vw] md:max-w-[1123px] aspect-[1123/794] bg-no-repeat bg-cover bg-center p-4 md:p-16 flex flex-col justify-between"
        style={{ backgroundImage: `url(${imagesData.certificate.src})` }}
      >
        {/* Logos */}
        <div className="flex justify-between items-center mt-2 md:mt-6 mx-2 md:mx-10">
          <img className="w-16 md:w-[200px]" src={imagesData.accenture.src} alt={imagesData.accenture.name} />
          <img className="w-10 md:w-[80px]" src={imagesData.magicbus.src} alt={imagesData.magicbus.name} />
        </div>

        {/* Certificate Title */}
        <h1 className="text-xl md:text-5xl text-center font-bold mt-2 md:mt-6">Certificate of Completion</h1>

        {/* Name Field */}
        <h3 className="px-3 py-1 md:px-4 md:py-2 mt-4 md:mt-6 border-b-2 border-black w-4/5 mx-auto text-center text-lg md:text-2xl font-semibold">
          {certificate.name || "Your Name"}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-xl text-center mt-2 md:mt-4">has successfully completed</p>
        <p className="text-sm md:text-xl text-center mt-1 md:mt-3">
          {`the ${certificate.course || "Course"} Programme in Magic Bus India Foundation at Medavakkam`}
        </p>

        {/* Date Range */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-2 md:mt-3">
          <p className="text-xs md:text-xl">from</p>
          <p className="px-3 py-1 border-b-2 border-black text-sm md:text-lg">{certificate.from || "Start Date"}</p>
          <p className="text-xs md:text-xl">to</p>
          <p className="px-3 py-1 border-b-2 border-black text-sm md:text-lg">{certificate.to || "End Date"}</p>
        </div>

        {/* Signature */}
        <div className="mt-6 md:mt-8 flex flex-col items-center">
          <img src={imagesData.sign.src} alt={imagesData.sign.name} className="w-20 md:w-auto" />
          <p className="text-xs md:text-base text-center">Jayant Rastogi</p>
          <p className="text-xs md:text-base text-center">Global CEO</p>
          <p className="text-xs md:text-base text-center">Magic Bus India Foundation</p>
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
