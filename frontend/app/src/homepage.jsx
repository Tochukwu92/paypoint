import React, { useState, useEffect } from "react";
import "./homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Gallery from "./component/gallery";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
//import About from "./component/about";
//import Footer from "./component/footer";
//import CustomModal from "./component/modal"; // Import the custom modal

const Homepage = () => {
  const [installPrompt, setInstallPrompt] = useState(null); // Store the prompt event
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent default browser prompt
      setInstallPrompt(e); // Save the event
      setShowPopup(true); // Show custom popup
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Handle install button click
  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt(); // Trigger the install prompt
    const { outcome } = await installPrompt.userChoice; // Wait for user response
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    setInstallPrompt(null); // Clear the prompt
    setShowPopup(false); // Hide popup
  };

  // Handle popup dismissal
  const handleDismiss = () => {
    setShowPopup(false);
  };
  return (
    <div className="slider">
      <div className="load"></div>
      <div className="content">
        <div className="header">
          <Navbar key="lg" expand="lg" className="bgi2 mb-3">
            <Container fluid>
              <Navbar.Brand href="#">PayPoint</Navbar.Brand>
              {/* Toggle button for mobile view */}
              <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
              <Navbar.Offcanvas
                id="offcanvasNavbar-expand-lg"
                aria-labelledby="offcanvasNavbarLabel-expand-lg"
                placement="end"
              >
                <Offcanvas.Header closeButton className="bgi">
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg"></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bgi">
                  {/* Navigation Links */}
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#Gallery">About</Nav.Link>
                    <Nav.Link href="#About">Service</Nav.Link>
                    <Nav.Link href="#About">Price</Nav.Link>
                    <Nav.Link href="#About">Contact</Nav.Link>
                  </Nav>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#home">Sign up</Nav.Link>
                    <Nav.Link href="#Gallery">Sign in</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
          <div className="landingpage_head">
            <div className="landingpage_center">
              <h3>WELCOME TO </h3>
              <h1>PayPoint</h1>
              <h6>
                PayPoint is your one-stop solution for affordable data, airtime,
                and TV subscriptions! Enjoy seamless access to fast internet,
                instant airtime top-ups, and premium TV entertainment at
                unbeatable prices. With reliable service and quick delivery,
                PayPoint ensures you stay connected and entertained
                effortlessly. Join us today!
              </h6>
              <Nav.Link href="#home">
                <button>Sign in</button>
              </Nav.Link>
              <Nav.Link href="#Gallery">
                <button>Sign up</button>
              </Nav.Link>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Install Popup */}
      {showPopup && (
        <div className="install-popup">
          <div className="popup-content">
            <h2>Install PayPoint</h2>
            <button onClick={handleInstall} className="install-button">
              Install Now
            </button>
            <button onClick={handleDismiss} className="dismiss-button">
              Not Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Homepage;
