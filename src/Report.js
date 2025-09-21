import { useState, useRef } from "react";
import EXIF from "exif-js";
import "./Form.css";

function Report() {
  const [formData, setFormData] = useState({
    hazard: "",
    otherHazard: "",
    file: null,
    location: "",
    description: "",
  });
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Open Camera
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

  // Capture Photo
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
        setFormData((prev) => ({ ...prev, file }));
        setCameraOpen(false);
        video.srcObject.getTracks().forEach((track) => track.stop()); // stop stream
      }, "image/jpeg");
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files[0]) {
      const file = files[0];
      setFormData({ ...formData, file });

      const reader = new FileReader();
      reader.onload = function () {
        EXIF.getData(file, function () {
          const lat = EXIF.getTag(this, "GPSLatitude");
          const lon = EXIF.getTag(this, "GPSLongitude");
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

  // Submit
  const handleSubmit = (e) => {
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

        {/* Upload from file + Camera */}
        <label>Upload Photo/Video:</label>
        <div className="upload-container">
          <input
            type="file"
            name="file"
            accept="image/*,video/*"
            onChange={handleChange}
          />
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
















