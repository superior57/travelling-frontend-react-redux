import moment from "moment";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import connect from "react-redux/es/connect/connect";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function Invoice({ val, submitInvoice, currentReservation }) {
  console.log(currentReservation);
  return (
    Boolean(val.details.length) && (
      <div className={"invoice-wrapper"}>
        {val.details[0].itemType === "additional charges" ? (
          <>
            <Accordion>
              <Accordion.Toggle eventKey="0" className={"invoice-title"}>
                <div>
                  <h2>Additional charges ({val.status})</h2>
                  <span>
                    {moment(val.createdAt).format("MM.DD.yyyy h:mm a ")}
                  </span>
                </div>
                <span className={"arrow"}></span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div className={"invoice-desc"}>
                  {val.details.map(item => (
                    <p>
                      <span>{item.description}</span>
                      <span>${item.summ}</span>
                    </p>
                  ))}
                </div>
              </Accordion.Collapse>
            </Accordion>
            <div className={"invoice-sum"}>
              <span>Total</span>
              <span>${val.summ}</span>
            </div>
          </>
        ) : (
          <>
            <Accordion>
              <Accordion.Toggle eventKey="0" className={"invoice-title"}>
                <div>
                  <h2>Space rental ({val.status})</h2>
                  <span>
                    {moment(val.createdAt).format("MM.DD.yyyy")}{" "}
                    {moment(val.createdAt).format("h:mm a")}
                  </span>
                </div>
                <span className={"arrow"}></span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div className={"invoice-desc"}>
                  <p>
                    <span>{val.details[0].itemType}:</span>
                    <span>${val.details[0].summ}</span>
                  </p>
                  <p>
                    <span>{val.details[1].itemType}:</span>
                    <span>${val.details[1].summ}</span>
                  </p>
                </div>
              </Accordion.Collapse>
            </Accordion>
            <span className={"invoice-sum"}>Total: ${val.summ}</span>
          </>
        )}
        <div className={"btns"}>
          {!currentReservation.user && val.status === "New" && (
            <>
              <button
                data-id={val.id}
                data-status="cancel"
                onClick={submitInvoice}
                className="startBooking-content-review-btn"
              >
                Cancel
              </button>
              <button
                data-id={val.id}
                data-status="pay"
                disabled={!localStorage.getItem("token")}
                className={`startBooking-content-review-btn`}
                onClick={submitInvoice}
              >
                Pay
              </button>
            </>
          )}
          {currentReservation.user && val.status === "New" && (
            <>
              <button
                data-id={val.id}
                data-status="cancel"
                onClick={submitInvoice}
                className="startBooking-content-review-btn"
              >
                Cancel
              </button>

              <button
                data-id={val.id}
                data-status="accept"
                disabled={!localStorage.getItem("token")}
                className={`startBooking-content-review-btn`}
                onClick={submitInvoice}
              >
                Accept
              </button>
            </>
          )}
        </div>
      </div>
    )
  );
}

const mapStateToProps = state => ({
  currentReservation: state.booking.currentReservation
});

export default connect(mapStateToProps)(Invoice);
