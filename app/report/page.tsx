"use client";

// import { useState } from "react"
// import { RetroLayout } from "@/components/retro-layout"
// import { RetroForm } from "@/components/retro-form"

// export default function ReportPage() {
//   const [submitted, setSubmitted] = useState(false)
//   const [reportId, setReportId] = useState("")

//   const hazardCategories = [
//     "Tsunami",
//     "Storm Surge",
//     "High Waves",
//     "Swell Surge",
//     "Coastal Currents",
//     "Abnormal Sea Behavior",
//     "Coastal Flooding",
//     "Other",
//   ]

//   const urgencyLevels = [
//     "Low - Observation Only",
//     "Medium - Potential Threat",
//     "High - Immediate Danger",
//     "Critical - Emergency Response Required",
//   ]

//   const formFields = [
//     {
//       name: "reporterName",
//       label: "Reporter Name",
//       type: "text" as const,
//       required: true,
//     },
//     {
//       name: "contactNumber",
//       label: "Contact Number",
//       type: "text" as const,
//       required: true,
//     },
//     {
//       name: "location",
//       label: "Location Details",
//       type: "textarea" as const,
//       required: true,
//     },
//     {
//       name: "hazardCategory",
//       label: "Hazard Category",
//       type: "select" as const,
//       options: hazardCategories,
//       required: true,
//     },
//     {
//       name: "urgencyLevel",
//       label: "Urgency Level",
//       type: "select" as const,
//       options: urgencyLevels,
//       required: true,
//     },
//     {
//       name: "description",
//       label: "Detailed Description",
//       type: "textarea" as const,
//       required: true,
//     },
//     {
//       name: "mediaFile",
//       label: "Photo/Video Evidence",
//       type: "file" as const,
//       required: false,
//     },
//   ]

//   const handleSubmit = (data: Record<string, any>) => {
//     // Simulate form submission
//     const newReportId = `HR${Date.now()}`
//     setReportId(newReportId)
//     setSubmitted(true)

//     // In a real application, this would send data to the server
//     console.log("Report submitted:", data)
//   }

//   if (submitted) {
//     return (
//       <RetroLayout title="Report Submitted Successfully">
//         <div className="retro-form">
//           <h2 className="text-xl font-bold font-mono mb-4">Report Submission Confirmation</h2>

//           <table className="retro-table mb-6">
//             <tbody>
//               <tr>
//                 <td className="font-bold w-1/3">Report ID</td>
//                 <td className="font-mono">{reportId}</td>
//               </tr>
//               <tr>
//                 <td className="font-bold">Status</td>
//                 <td className="text-accent font-bold">SUBMITTED</td>
//               </tr>
//               <tr>
//                 <td className="font-bold">Submission Time</td>
//                 <td>{new Date().toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <td className="font-bold">Next Steps</td>
//                 <td>Your report will be reviewed by INCOIS officials within 2-4 hours</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="mb-4">
//             <p className="mb-2">
//               <strong>Important Notes:</strong>
//             </p>
//             <ul className="list-disc list-inside space-y-1 text-sm">
//               <li>Keep your Report ID ({reportId}) for future reference</li>
//               <li>You may be contacted for additional information</li>
//               <li>For immediate emergencies, contact local authorities: 100 (Police), 108 (Emergency)</li>
//               <li>INCOIS Emergency Helpline: 040-23886001</li>
//             </ul>
//           </div>

//           <button
//             onClick={() => {
//               setSubmitted(false)
//               setReportId("")
//             }}
//             className="retro-button mr-4"
//           >
//             Submit Another Report
//           </button>
//           <a href="/" className="retro-button inline-block">
//             Return to Home
//           </a>
//         </div>
//       </RetroLayout>
//     )
//   }

//   return (
//     <RetroLayout title="Submit Ocean Hazard Report">
//       <div className="mb-6">
//         <div className="retro-form">
//           <h2 className="text-xl font-bold font-mono mb-4">Important Instructions</h2>
//           <table className="retro-table">
//             <tbody>
//               <tr>
//                 <td className="font-bold w-1/4">Emergency</td>
//                 <td>For immediate life-threatening situations, call 100 (Police) or 108 (Emergency) first</td>
//               </tr>
//               <tr>
//                 <td className="font-bold">Location</td>
//                 <td>Provide exact location with landmarks, GPS coordinates if available</td>
//               </tr>
//               <tr>
//                 <td className="font-bold">Media Files</td>
//                 <td>Photos and videos will be automatically geotagged for location verification</td>
//               </tr>
//               <tr>
//                 <td className="font-bold">Contact</td>
//                 <td>Ensure your contact number is correct for follow-up communication</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <RetroForm
//         title="Ocean Hazard Report Form"
//         fields={formFields}
//         onSubmit={handleSubmit}
//         submitLabel="Submit Hazard Report"
//       />
//     </RetroLayout>
//   )
// }

// ----------------------------Evraj's Code----------------------------------
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import EXIF from "exif-js";
// import "./Form.css";

interface FormData {
  hazard: string;
  otherHazard: string;
  file: File | null;
  location: string;
  description: string;
}

function Report() {
  const [formData, setFormData] = useState<FormData>({
    hazard: "",
    otherHazard: "",
    file: null,
    location: "",
    description: "",
  });

  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start camera stream
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraOpen(true);
      }
    } catch (err) {
      alert("Camera access denied or not available.");
      console.error(err);
    }
  };

  // Capture image from camera
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
          setFormData((prev) => ({ ...prev, file }));
          setCameraOpen(false);
          // stop camera
          const tracks = (video.srcObject as MediaStream)?.getTracks();
          tracks?.forEach((track) => track.stop());
        }
      }, "image/jpeg");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "file" &&
      e.target instanceof HTMLInputElement &&
      e.target.files?.[0]
    ) {
      const file = e.target.files[0];
      setFormData({ ...formData, file });

      // extract GPS if present
      const reader = new FileReader();
      reader.onload = function () {
        EXIF.getData(file as any, function () {
          const lat = EXIF.getTag(file, "GPSLatitude");
          const lon = EXIF.getTag(file, "GPSLongitude");
          if (lat && lon) {
            setFormData((prev) => ({
              ...prev,
              location: `${lat}, ${lon}`,
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              location: "No GPS data found in image",
            }));
          }
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Hazard Report Submitted!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="form-container">
      <h3>Report Ocean Hazard</h3>
      <form onSubmit={handleSubmit}>
        <label>Hazard Type:</label>
        <select
          name="hazard"
          value={formData.hazard}
          onChange={handleChange}
          required
        >
          <option value="">Select Hazard</option>
          <option value="unusual_tides">Unusual Tides</option>
          <option value="flooding">Flooding</option>
          <option value="coastal_damage">Coastal Damage</option>
          <option value="tsunami">Tsunami</option>
          <option value="swell_surges">Swell Surges</option>
          <option value="high_waves">High Waves</option>
          <option value="other">Other</option>
        </select>

        {formData.hazard === "other" && (
          <>
            <label>Specify Hazard:</label>
            <input
              type="text"
              name="otherHazard"
              value={formData.otherHazard}
              onChange={handleChange}
              placeholder="Enter hazard type"
              required
            />
          </>
        )}

        {/* Upload from file */}
        <label>Upload from Gallery:</label>
        <input
          type="file"
          name="file"
          accept="image/*,video/*"
          onChange={handleChange}
        />

        {/* Camera Icon Button */}
        <div className="camera-upload">
          <button
            type="button"
            className="camera-btn"
            onClick={openCamera}
            title="Open Camera"
          >
            <img
              src="https://i.etsystatic.com/36262552/r/il/b32f2f/4239329917/il_fullxfull.4239329917_gcxb.jpg"
              alt="Camera"
            />
          </button>
        </div>

        {cameraOpen && (
          <div>
            <video ref={videoRef} autoPlay style={{ width: "100%" }} />
            <button
              type="button"
              className="submit-btn"
              onClick={capturePhoto}
              style={{ marginTop: "10px" }}
            >
              Capture Photo
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}

        <label>Location (from image GPS):</label>
        <input type="text" value={formData.location} readOnly />

        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Describe the hazard"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Report;
