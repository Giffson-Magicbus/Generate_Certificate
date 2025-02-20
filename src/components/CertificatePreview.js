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
      const pdf = new jsPDF("landscape", "px", [1123, 794]);
      pdf.addImage(imgData, "PNG", 0, 0, 1123, 794);
      pdf.save(`${certificate.name || "certificate"}.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      {/* Responsive Iframe */}
      <div className="w-full max-w-[1123px] aspect-[1123/794]">
        <iframe
          title="Certificate Preview"
          srcDoc={`
            <html>
              <head>
                <style>
                  body { margin: 0; display: flex; align-items: center; justify-content: center; }
                  .certificate-container {
                    width: 100%;
                    max-width: 1123px;
                    aspect-ratio: 1123 / 794;
                    background: url('${imagesData.certificate.src}') no-repeat center/cover;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                  }
                  h1 { font-size: 40px; text-align: center; margin-bottom: 10px; }
                  h3 { font-size: 24px; text-align: center; margin-bottom: 10px; }
                  p { font-size: 18px; text-align: center; }
                  .sign { margin-top: 20px; }
                </style>
              </head>
              <body>
                <div class="certificate-container">
                  <h1>Certificate of Completion</h1>
                  <h3>${certificate.name || "Your Name"}</h3>
                  <p>has successfully completed</p>
                  <p>the ${certificate.course || "Course"} Programme in Magic Bus India Foundation at Medavakkam</p>
                  <p>from ${certificate.from || "Start Date"} to ${certificate.to || "End Date"}</p>
                  <img class="sign" src="${imagesData.sign.src}" width="150" />
                  <p>Jayant Rastogi</p>
                  <p>Global CEO, Magic Bus India Foundation</p>
                </div>
              </body>
            </html>
          `}
          className="w-full h-auto"
          style={{ aspectRatio: "1123/794", border: "none" }}
        />
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
