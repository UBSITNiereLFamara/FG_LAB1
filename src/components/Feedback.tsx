import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    rating: "",
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      alert("All fields are required!");
      return;
    }

    if (Number(formData.rating) < 1 || Number(formData.rating) > 5) {
      alert("Rating must be 1–5");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: formData.studentName,
          course: formData.course,
          rating: Number(formData.rating),
          comments: formData.comments,
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
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Course Feedback</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.studentName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Rating</label>
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
              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <select
              name="course"
              className="form-select"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="SIT">School of Science Information Technology</option>
              <option value="SON">School of Nursing</option>
              <option value="SEA">School of Engineering and Architecture</option>
              <option value="SOL">School of Law</option>
              <option value="SBAA">School of Business Administration and Accountancy</option>
              <option value="SIHTM">School of International Hospitality and Tourism Management</option>
              <option value="SCJPS">School of Criminal Justice and Public Safety</option>
              <option value="SOD">School of Dentistry</option>
              <option value="SNS">School of Natural Science</option>
            </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Comments</label>
                  <textarea
                    name="comments"
                    className="form-control"
                    rows={5}
                    placeholder="Write your feedback..."
                    value={formData.comments}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary px-5">
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