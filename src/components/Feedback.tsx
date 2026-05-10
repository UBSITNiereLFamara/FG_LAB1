import React, { useState } from "react";

const Feedback: React.FC = () => {
const [formData, setFormData] = useState({
studentName: "",
course: "",
rating: "",
comments: "",
});

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

if (
!formData.studentName ||
!formData.course ||
!formData.rating ||
!formData.comments
) {
alert("All fields are required");
return;
}

try {
const res = await fetch("http://localhost:5000/feedback", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
...formData,
rating: Number(formData.rating),
}),
});

const data = await res.json();
alert(data.message);

setFormData({
studentName: "",
course: "",
rating: "",
comments: "",
});

} catch (error) {
console.error(error);
alert("Error submitting feedback");
}
};

return (
  <div
    className="min-vh-100 d-flex align-items-center"
    style={{
      background: "linear-gradient(to right, #5f7fa3, #8faec7)",
    }}
  >
    <div className="container">
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          borderRadius: "20px",
          backgroundColor: "#f4f8fb",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{ color: "#4b6584" }}
        >
          Course Feedback
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6">

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#4b6584" }}
                >
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  className="form-control shadow-sm"
                  placeholder="Enter your name"
                  value={formData.studentName}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #a7bed3",
                  }}
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label d-block fw-semibold"
                  style={{ color: "#4b6584" }}
                >
                  Rating
                </label>

                <div className="p-3 rounded shadow-sm bg-white">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div className="form-check" key={num}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        value={num}
                        checked={formData.rating === String(num)}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{num}</label>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="col-md-6">

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#4b6584" }}
                >
                  Course
                </label>

                <select
                  name="course"
                  className="form-select shadow-sm"
                  value={formData.course}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #a7bed3",
                  }}
                >
                  <option value="">Select Course</option>
                  <option value="SIT">
                    School of Science Information Technology
                  </option>
                  <option value="SON">School of Nursing</option>
                  <option value="SEA">
                    School of Engineering and Architecture
                  </option>
                  <option value="SOL">School of Law</option>
                  <option value="SBAA">
                    School of Business Administration and Accountancy
                  </option>
                  <option value="SIHTM">
                    School of International Hospitality and Tourism Management
                  </option>
                  <option value="SCJPS">
                    School of Criminal Justice and Public Safety
                  </option>
                  <option value="SOD">School of Dentistry</option>
                  <option value="SNS">School of Natural Science</option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#4b6584" }}
                >
                  Comments
                </label>

                <textarea
                  name="comments"
                  className="form-control shadow-sm"
                  rows={5}
                  placeholder="Write your feedback..."
                  value={formData.comments}
                  onChange={handleChange}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #a7bed3",
                  }}
                />
              </div>

            </div>

          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn px-5 py-2 fw-semibold shadow"
              style={{
                backgroundColor: "#5f7fa3",
                color: "white",
                borderRadius: "12px",
              }}
            >
              Submit Feedback
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);
};

export default Feedback;