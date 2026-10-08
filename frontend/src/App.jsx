import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // ================= STATES =================

  const [showDoctors, setShowDoctors] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showMyAppointments, setShowMyAppointments] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [showVirtualConsultation, setShowVirtualConsultation] =
    useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [consultationDoctor, setConsultationDoctor] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [consultationScheduled, setConsultationScheduled] =
    useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // ================= APPOINTMENTS =================

  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      localStorage.getItem("appointments");

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [];
  });

  // ================= DOCTORS =================

  const doctors = [
    {
      name: "Dr. Priya Sharma",
      specialization: "Cardiologist",
    },
    {
      name: "Dr. Rahul Kumar",
      specialization: "Dentist",
    },
    {
      name: "Dr. Ananya Rao",
      specialization: "Dermatologist",
    },
  ];

  // ================= LOCAL STORAGE =================

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  // ================= NAVIGATION =================

  const goHome = () => {
    setShowDoctors(false);
    setShowAppointment(false);
    setShowMyAppointments(false);
    setShowRecords(false);
    setShowReminders(false);
    setShowVirtualConsultation(false);
    setShowLogin(false);
  };

  const openDoctors = () => {
    setShowDoctors(true);
    setShowAppointment(false);
    setShowMyAppointments(false);
    setShowRecords(false);
    setShowReminders(false);
    setShowVirtualConsultation(false);
    setShowLogin(false);
  };

  const openMyAppointments = () => {
    setShowDoctors(false);
    setShowAppointment(false);
    setShowMyAppointments(true);
    setShowRecords(false);
    setShowReminders(false);
    setShowVirtualConsultation(false);
    setShowLogin(false);
  };

  const openRecords = () => {
    setShowDoctors(false);
    setShowAppointment(false);
    setShowMyAppointments(false);
    setShowRecords(true);
    setShowReminders(false);
    setShowVirtualConsultation(false);
    setShowLogin(false);
  };

  const openReminders = () => {
    setShowDoctors(false);
    setShowAppointment(false);
    setShowMyAppointments(false);
    setShowRecords(false);
    setShowReminders(true);
    setShowVirtualConsultation(false);
    setShowLogin(false);
  };

  const openVirtualConsultation = () => {
    setShowDoctors(false);
    setShowAppointment(false);
    setShowMyAppointments(false);
    setShowRecords(false);
    setShowReminders(false);
    setShowVirtualConsultation(true);
    setShowLogin(false);
  };

  const openLogin = () => {
    setShowDoctors(false);
    setShowAppointment(false);
    setShowMyAppointments(false);
    setShowRecords(false);
    setShowReminders(false);
    setShowVirtualConsultation(false);
    setShowLogin(true);
  };

  // ================= BOOK APPOINTMENT =================

  const openAppointment = (doctorName) => {
    setSelectedDoctor(doctorName);
    setEditingAppointment(null);

    setPatientName("");
    setPatientEmail("");
    setPatientPhone("");
    setAppointmentDate("");
    setAppointmentTime("");

    setShowDoctors(false);
    setShowAppointment(true);
    setShowMyAppointments(false);
    setShowRecords(false);
    setShowReminders(false);
    setShowVirtualConsultation(false);
    setShowLogin(false);
  };

  const confirmAppointment = () => {
    if (
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !appointmentDate ||
      !appointmentTime
    ) {
      alert("Please fill all the details.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      patientName: patientName,
      email: patientEmail,
      phone: patientPhone,
      date: appointmentDate,
      time: appointmentTime,
      status: "Confirmed",
    };

    setAppointments([
      ...appointments,
      newAppointment,
    ]);

    alert("Appointment booked successfully!");

    setShowAppointment(false);
    setShowMyAppointments(true);
  };

  // ================= CANCEL =================

  const cancelAppointment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    const updatedAppointments =
      appointments.filter(
        (appointment) =>
          appointment.id !== id
      );

    setAppointments(updatedAppointments);
  };

  // ================= RESCHEDULE =================

  const startReschedule = (appointment) => {
    setEditingAppointment(appointment);

    setSelectedDoctor(appointment.doctor);
    setPatientName(appointment.patientName);
    setPatientEmail(appointment.email);
    setPatientPhone(appointment.phone);
    setAppointmentDate(appointment.date);
    setAppointmentTime(appointment.time);

    setShowDoctors(false);
    setShowAppointment(true);
    setShowMyAppointments(false);
    setShowRecords(false);
    setShowReminders(false);
    setShowVirtualConsultation(false);
    setShowLogin(false);
  };

  const updateAppointment = () => {
    if (
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !appointmentDate ||
      !appointmentTime
    ) {
      alert("Please fill all the details.");
      return;
    }

    const updatedAppointments =
      appointments.map(
        (appointment) => {
          if (
            appointment.id ===
            editingAppointment.id
          ) {
            return {
              ...appointment,
              date: appointmentDate,
              time: appointmentTime,
              patientName: patientName,
              email: patientEmail,
              phone: patientPhone,
            };
          }

          return appointment;
        }
      );

    setAppointments(updatedAppointments);

    alert(
      "Appointment rescheduled successfully!"
    );

    setEditingAppointment(null);
    setShowAppointment(false);
    setShowMyAppointments(true);
  };

  // ================= LOGIN =================

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password.");
      return;
    }

    setIsLoggedIn(true);

    alert("Login successful!");

    goHome();
  };

  // ================= VIRTUAL CONSULTATION =================

  const scheduleConsultation = () => {
    if (
      !consultationDoctor ||
      !consultationType
    ) {
      alert(
        "Please select a doctor and consultation type."
      );
      return;
    }

    setConsultationScheduled(true);
  };

  // ================= RETURN =================

  return (
    <div>

      {/* ================= NAVIGATION ================= */}

      <nav className="navbar">

        <div className="logo">
          🏥 MediCare
        </div>

        <ul className="nav-links">

          <li onClick={goHome}>
            Home
          </li>

          <li onClick={openDoctors}>
            Doctors
          </li>

          <li onClick={openMyAppointments}>
            My Appointments
          </li>

          <li onClick={openRecords}>
            Patient Records
          </li>

          <li onClick={openReminders}>
            Reminders
          </li>

          <li onClick={openLogin}>
            {isLoggedIn ? "Logged In" : "Login"}
          </li>

        </ul>

      </nav>


      {/* ================= HOME ================= */}

      {!showDoctors &&
        !showAppointment &&
        !showMyAppointments &&
        !showRecords &&
        !showReminders &&
        !showVirtualConsultation &&
        !showLogin && (

          <section className="hero">

            <h1>
              Healthcare Made Simple
            </h1>

            <p>
              Find the right doctor and book
              your appointment easily.
            </p>

            <button
              className="primary-button"
              onClick={openDoctors}
            >
              Find a Doctor
            </button>

          </section>

        )}


      {/* ================= DOCTORS ================= */}

      {showDoctors && (

        <section className="doctors">

          <h2>
            Our Doctors
          </h2>

          <div className="doctor-list">

            {doctors.map((doctor) => (

              <div
                className="doctor-card"
                key={doctor.name}
              >

                <div className="doctor-icon">
                  👨‍⚕️
                </div>

                <h3>
                  {doctor.name}
                </h3>

                <p>
                  {doctor.specialization}
                </p>

                <button
                  className="primary-button"
                  onClick={() =>
                    openAppointment(
                      doctor.name
                    )
                  }
                >
                  Book Appointment
                </button>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* ================= APPOINTMENT ================= */}

      {showAppointment && (

        <section className="appointment">

          <h2>
            {editingAppointment
              ? "Reschedule Appointment"
              : "Book Your Appointment"}
          </h2>

          <p>
            Doctor:{" "}
            <strong>
              {selectedDoctor}
            </strong>
          </p>

          <input
            type="text"
            placeholder="Enter your name"
            value={patientName}
            onChange={(e) =>
              setPatientName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={patientEmail}
            onChange={(e) =>
              setPatientEmail(e.target.value)
            }
          />

          <input
            type="tel"
            placeholder="Enter your phone number"
            value={patientPhone}
            onChange={(e) =>
              setPatientPhone(e.target.value)
            }
          />

          <input
            type="date"
            value={appointmentDate}
            onChange={(e) =>
              setAppointmentDate(e.target.value)
            }
          />

          <input
            type="time"
            value={appointmentTime}
            onChange={(e) =>
              setAppointmentTime(e.target.value)
            }
          />

          {editingAppointment ? (

            <button
              className="primary-button"
              onClick={updateAppointment}
            >
              Update Appointment
            </button>

          ) : (

            <button
              className="primary-button"
              onClick={confirmAppointment}
            >
              Confirm Appointment
            </button>

          )}

        </section>

      )}


      {/* ================= MY APPOINTMENTS ================= */}

      {showMyAppointments && (

        <section className="my-appointments">

          <h2>
            My Appointments
          </h2>

          {appointments.length === 0 ? (

            <div className="empty-appointments">

              <div className="empty-icon">
                📅
              </div>

              <h3>
                No appointments yet
              </h3>

              <p>
                Book an appointment with
                one of our doctors.
              </p>

              <button
                className="primary-button"
                onClick={openDoctors}
              >
                Find a Doctor
              </button>

            </div>

          ) : (

            <div className="appointment-list">

              {appointments.map(
                (appointment) => (

                  <div
                    className="appointment-card"
                    key={appointment.id}
                  >

                    <div className="appointment-top">

                      <div>

                        <h3>
                          {appointment.doctor}
                        </h3>

                        <p>
                          Patient:{" "}
                          {appointment.patientName}
                        </p>

                      </div>

                      <span className="status">
                        {appointment.status}
                      </span>

                    </div>

                    <div className="appointment-details">

                      <p>
                        📅 {appointment.date}
                      </p>

                      <p>
                        🕐 {appointment.time}
                      </p>

                      <p>
                        📧 {appointment.email}
                      </p>

                    </div>

                    <div className="appointment-actions">

                      <button
                        className="reschedule-button"
                        onClick={() =>
                          startReschedule(
                            appointment
                          )
                        }
                      >
                        ✏️ Reschedule
                      </button>

                      <button
                        className="cancel-button"
                        onClick={() =>
                          cancelAppointment(
                            appointment.id
                          )
                        }
                      >
                        ❌ Cancel
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      )}


      {/* ================= PATIENT RECORDS ================= */}

      {showRecords && (

        <section className="records-section">

          <div className="records-header">

            <p className="small-heading">
              HEALTHCARE PROFILE
            </p>

            <h2>
              Patient Records
            </h2>

            <p>
              View your personal healthcare
              information and medical history.
            </p>

          </div>

          <div className="records-grid">

            <div className="record-card">

              <div className="record-icon">
                👤
              </div>

              <h3>
                Patient Information
              </h3>

              <div className="record-info">

                <p>
                  <strong>Name:</strong>{" "}
                  {patientName ||
                    "Not available"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {patientEmail ||
                    "Not available"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {patientPhone ||
                    "Not available"}
                </p>

              </div>

            </div>


            <div className="record-card">

              <div className="record-icon">
                🩺
              </div>

              <h3>
                Medical History
              </h3>

              <div className="record-info">

                <p>
                  <strong>Last Visit:</strong>{" "}
                  August 20, 2026
                </p>

                <p>
                  <strong>Condition:</strong>{" "}
                  General Checkup
                </p>

                <p>
                  <strong>Doctor:</strong>{" "}
                  Dr. Priya Sharma
                </p>

              </div>

            </div>


            <div className="record-card">

              <div className="record-icon">
                💊
              </div>

              <h3>
                Prescriptions
              </h3>

              <div className="record-info">

                <p>
                  <strong>Medicine:</strong>{" "}
                  Paracetamol
                </p>

                <p>
                  <strong>Dosage:</strong>{" "}
                  As prescribed
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  Completed
                </p>

              </div>

            </div>


            <div className="record-card">

              <div className="record-icon">
                📝
              </div>

              <h3>
                Doctor Notes
              </h3>

              <div className="doctor-note">

                <p>
                  Patient advised to maintain
                  a healthy lifestyle and attend
                  regular checkups.
                </p>

              </div>

            </div>

          </div>


          <div className="records-history">

            <h3>
              Previous Appointments
            </h3>

            {appointments.length === 0 ? (

              <p className="no-history">
                No previous appointments
                available.
              </p>

            ) : (

              appointments.map(
                (appointment) => (

                  <div
                    className="history-row"
                    key={appointment.id}
                  >

                    <div>

                      <strong>
                        {appointment.doctor}
                      </strong>

                      <p>
                        {appointment.date}
                      </p>

                    </div>

                    <span className="status">
                      {appointment.status}
                    </span>

                  </div>

                )
              )

            )}

          </div>

        </section>

      )}


      {/* ================= REMINDERS ================= */}

      {showReminders && (

        <section className="reminders-section">

          <div className="reminders-header">

            <p className="small-heading">
              STAY ON TRACK
            </p>

            <h2>
              Appointment Reminders
            </h2>

            <p>
              Keep track of your upcoming
              healthcare appointments.
            </p>

          </div>

          {appointments.length === 0 ? (

            <div className="no-reminders">

              <div className="reminder-icon">
                🔔
              </div>

              <h3>
                No reminders
              </h3>

              <p>
                You don't have any
                appointments scheduled yet.
              </p>

              <button
                className="primary-button"
                onClick={openDoctors}
              >
                Book an Appointment
              </button>

            </div>

          ) : (

            <div className="reminder-list">

              {appointments.map(
                (appointment) => (

                  <div
                    className="reminder-card"
                    key={appointment.id}
                  >

                    <div className="reminder-symbol">
                      🔔
                    </div>

                    <div className="reminder-content">

                      <span className="reminder-label">
                        UPCOMING APPOINTMENT
                      </span>

                      <h3>
                        {appointment.doctor}
                      </h3>

                      <p>
                        📅 {appointment.date}
                      </p>

                      <p>
                        🕐 {appointment.time}
                      </p>

                      <p>
                        👤 {appointment.patientName}
                      </p>

                    </div>

                    <span className="status">
                      {appointment.status}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      )}


      {/* ================= VIRTUAL CONSULTATION ================= */}

      {showVirtualConsultation && (

        <section className="virtual-section">

          <div className="virtual-header">

            <p className="small-heading">
              ONLINE HEALTHCARE
            </p>

            <h2>
              Virtual Consultation
            </h2>

            <p>
              Consult with a doctor online from
              the comfort of your home.
            </p>

          </div>

          {!consultationScheduled ? (

            <div className="virtual-card">

              <div className="virtual-icon">
                💻
              </div>

              <h3>
                Schedule an Online Consultation
              </h3>

              <label>
                Choose Doctor
              </label>

              <select
                value={consultationDoctor}
                onChange={(e) =>
                  setConsultationDoctor(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select a doctor
                </option>

                {doctors.map((doctor) => (

                  <option
                    key={doctor.name}
                    value={doctor.name}
                  >
                    {doctor.name} -{" "}
                    {doctor.specialization}
                  </option>

                ))}

              </select>

              <label>
                Consultation Type
              </label>

              <select
                value={consultationType}
                onChange={(e) =>
                  setConsultationType(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select consultation type
                </option>

                <option value="Video Consultation">
                  🎥 Video Consultation
                </option>

                <option value="Audio Consultation">
                  📞 Audio Consultation
                </option>

                <option value="Chat Consultation">
                  💬 Chat Consultation
                </option>

              </select>

              <button
                className="primary-button"
                onClick={scheduleConsultation}
              >
                Schedule Consultation
              </button>

            </div>

          ) : (

            <div className="consultation-confirmed">

              <div className="success-icon">
                ✅
              </div>

              <h3>
                Consultation Scheduled!
              </h3>

              <p>
                <strong>Doctor:</strong>{" "}
                {consultationDoctor}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {consultationType}
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  alert(
                    "Virtual consultation room opened!"
                  )
                }
              >
                Join Consultation
              </button>

            </div>

          )}

        </section>

      )}


      {/* ================= LOGIN ================= */}

      {showLogin && (

        <section className="login-section">

          <div className="login-container">

            <div className="login-visual">

              <div className="login-logo">
                🏥
              </div>

              <h1>
                Welcome to MediCare
              </h1>

              <p>
                Manage your healthcare journey
                in one simple place.
              </p>

              <div className="login-feature">
                ✓ Find trusted doctors
              </div>

              <div className="login-feature">
                ✓ Book appointments
              </div>

              <div className="login-feature">
                ✓ Manage patient records
              </div>

              <div className="login-feature">
                ✓ Get virtual consultations
              </div>

            </div>


            <div className="login-form-container">

              <span className="small-heading">
                PATIENT LOGIN
              </span>

              <h2>
                Sign in to your account
              </h2>

              <p className="login-subtitle">
                Access your appointments and
                healthcare information.
              </p>

              <form onSubmit={handleLogin}>

                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) =>
                    setLoginEmail(
                      e.target.value
                    )
                  }
                />

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) =>
                    setLoginPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="submit"
                  className="login-button"
                >
                  Sign In
                </button>

              </form>

              <p className="demo-note">
                Demo frontend login — no real
                account is created.
              </p>

            </div>

          </div>

        </section>

      )}


      {/* ================= SERVICES ================= */}

      {!showDoctors &&
        !showAppointment &&
        !showMyAppointments &&
        !showRecords &&
        !showReminders &&
        !showVirtualConsultation &&
        !showLogin && (

          <section className="services">

            <div
              className="service-card"
              onClick={openDoctors}
              style={{ cursor: "pointer" }}
            >

              <div>
                👨‍⚕️
              </div>

              <h3>
                Find Doctors
              </h3>

              <p>
                Search and find doctors based
                on specialization.
              </p>

            </div>


            <div
              className="service-card"
              onClick={openDoctors}
              style={{ cursor: "pointer" }}
            >

              <div>
                📅
              </div>

              <h3>
                Book Appointment
              </h3>

              <p>
                Choose a convenient date
                and time.
              </p>

            </div>


            <div
              className="service-card"
              onClick={openVirtualConsultation}
              style={{ cursor: "pointer" }}
            >

              <div>
                💻
              </div>

              <h3>
                Virtual Consultation
              </h3>

              <p>
                Consult with doctors online.
              </p>

            </div>

          </section>

        )}

    </div>
  );
}

export default App;