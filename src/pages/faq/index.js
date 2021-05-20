import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import "./styles.scss";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: theme.typography.pxToRem(0.36)
  }
}));

function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const data = [
    {
      question: "Frequently Asked Questions",
      answer:
        "Host will have the option to accept the reservation to acknowledge that they are aware of the reservation – So they will receive a notification of the reservation and they will have to Accept or Decline. Once a reservation is accepted. Guest will receive a notification of the acceptance. If a host did not accept three consecutive reservations, or 48hours after reservation, their listing will be deactivated and the guest will immediately be notified to consider other listings. Vent-Vent does not. ",
      key: 1
    },
    {
      question: "Question 2",
      answer: "Answer 2",
      key: 2
    },
    {
      question: "Question 3",
      answer: "Answer 3",
      key: 3
    }
  ];
  return (
    <div className="wrapper">
      <div>
        <div className="wrapper">
          <Header isAuthenticated={props.isAuthenticated} find={true} />
        </div>
        <div className="main">
          <main>
            <h1>Frequently Asked Questions</h1>
            <div className="faq">
              {data.map(({ question, answer, key }) => {
                return (
                  <div className="faq-item" key={key}>
                    <ExpansionPanel
                      className={classes.root}
                      expanded={expanded === `panel${key}`}
                      onChange={handleChange(`panel${key}`)}
                    >
                      <ExpansionPanelSummary
                        expandIcon={
                          expanded === `panel${key}` ? (
                            <RemoveIcon fontSize={"large"} />
                          ) : (
                            <AddIcon fontSize={"large"} />
                          )
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          {question}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>{answer}</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, {})(ControlledExpansionPanels);
