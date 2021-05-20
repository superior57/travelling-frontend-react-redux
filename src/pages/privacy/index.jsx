import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import history from "../../history";
import "./style.scss";

class PrivacyPolice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: "Effective Privacy Statement",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Vent-Vent, Inc (Vent-Vent, “we, this site, the site, us, our”) presents this Privacy Policy for consumers and usersof this site. Protecting our consumer’s information is our utmost priority including, the collection and disclosure of personal information entered on our site (“Vent-Vent.com”) and all other services provided by us, Vent-Vent (all services via the Vent-Vent site or applications). By using the Vent-Vent site, you consent (agree) to adhere to the practices described in this statement."
        },
        {
          title: "Information Collection",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Vent-Vent indirectly and directly collects information that is provided to us from users and/or third parties. The information collected is necessary in order to provide services requested by the individual. The individual (consumer, user, or a third party) may be required to provide specific personal information (identifiable or identified information pertaining to the subject of the information) to this site when the user chooses to use the services provided by this site. Vent-Vent may also collect analytical information that informs us of what users think of the site and any improvements"
        },
        {
          title: "Use of the collected Information",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Users may view our site, but in order to benefit from the services provided the user must create an account. Information may be collected when determining the type of event, event’s location, and all other features related to your event, this may also include payment information when requesting our services. We will use your information to communicate with you in relation to the services you requested from us. Vent Vent may also use your personally identifiable information to inform you of other products or services available from Vent Vent and its affiliates. For marketing reasons, we may use your information to send newsletters, promotions, discounts or special offers, and/or to contact you about features that you may be interested in."
        },
        {
          title: "Cookies and Tracking Behaviors",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Cookies are data mechanisms used to remember information and browsing history. This site use cookies and other tracking strategies to store your login information for future reasons. Another reason why we use cookies is to track and monitor the usage of browsing on our site. You have the option to configure your web browser toavoid cookies and/or to be aware that the site uses cookies. In addition, you have the option to delete cookie files from your hard drive."
        },
        {
          title: "Emailing through Vent Vent Account",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Vent-Vent will be using the site as a tool to communicate with users. Participants and hosts will need to communicate only via the Vent-Vent site. After creating a profile, users will receive email notifications of messages from venue owners and/or VentVent team. The use of the VentVent site to communicate with one another about information and/ or certain requests are due to various circumstances and services. Exchanging phone numbers, personal addresses, and other private information is prohibited, and at your own expense."
        },
        {
          title: "Information Disclosure",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Vent-Vent does not sell, rent, or lease the participant’s (members and venue owners) information to any third parties. Vent-Vent may contact you (members and venue owners) about particular offerings or deals that may be an interest to you. In that case, your identifiable information (email address and name) will be shared with that venue owner or third party. In accordance with the law, we may disclose your personal information without notice and if required by the law or deemed as necessary or appropriate to protect the property and rights of Vent-Vent, to conform to the edicts of law or comply with legal process served on the website Vent-Vent, to protect and defend the rights of Vent-Vent, and/or to perform under pressing and emergent circumstances to protect the personal safety of users of Vent-Vent and/or the public"
        },
        {
          title: "Updating or Deleting Information",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "All participants have the option to change, correct, update, or delete their information on their profiles. If you are wanting to delete your account you must contact the Vent-Vent customer service team so they’ll better assistyou or emails contact@ventvent.com. Should you want to recover your account contact the Vent-Vent customerservice team or email contact@ventvent.com."
        },
        {
          title: "Security",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Vent-Vent has taken the proper security measures to ensure that your information is protected. Vent-Vent advises users to secure their personal information by implementing anti-virus mechanisms, and other protectivecyber tools. Vent-Vent is not responsible for any lost, stolen, or any other unauthorized account usage."
        },
        {
          title: "Children Under 18 years old",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Services are not granted to individuals under the age of 18. Vent-Vent will not deliberately collect or gather information from persons under the age of 18 without parental consent. If you are under the age of 18, you must ask permission to use this site. If a parent becomes aware that their child used the site without their permission, they must contact the Vent-Vent team."
        },
        {
          title: "Changes to this Statement",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text:
            "Vent-Vent reserves the right to change this policy at any given time. Your continued use of the site and/or services available through our site after such modifications will constitute your 1). acknowledgment of the modified privacy policy and 2). Agreement to abide and be bound by the policy."
        },
        {
          title: "Questions about Privacy Policy",
          sign: "+",
          classCss: "privacy-police-page__text-title",
          classContent: "privacy-police-page__text-text mobile-hidden",
          text: `Should you have questions about our privacy policy please contact us at `,
          link: "mailto:contact@ventvent.com"
        }
      ]
    };
  }

  toChangeSign(index, sign) {
    this.state.items[index].sign = sign;
    this.setState(this.state);
  }

  toToggleTitleStyle(index, classCss) {
    this.state.items[index].classCss = classCss;
    this.setState(this.state);
  }

  toToggleItemContent(index) {
    if (this.state.items[index].sign === "+") {
      this.toChangeSign(index, "-");
      this.toToggleTitleStyle(index, "privacy-police-page__text-title green");
      this.state.items[index].classContent = "privacy-police-page__text-text";
    } else {
      this.toChangeSign(index, "+");
      this.toToggleTitleStyle(index, "privacy-police-page__text-title");
      this.state.items[index].classContent =
        "privacy-police-page__text-text mobile-hidden";
    }
    this.setState(this.state);
  }

  render() {
    let items = this.state.items.map((item, index) => {
      return (
        <div key={index} className="privacy-police-page__text-block">
          <h2
            className={item.classCss}
            onClick={this.toToggleItemContent.bind(this, index)}
          >
            {item.title}
            <span className="privacy-police-page__text-title-toggler">
              {item.sign}
            </span>
          </h2>
          <p className={item.classContent}>
            {item.text}
            <a
              href={item.link}
              className="privacy-police-page__text-link"
              target="_blank"
            >
              {item.link ? item.link : ""}
            </a>
          </p>
        </div>
      );
    });
    return (
      <div className="privacy-police-page">
        <div className="wrapper">
          <Header />
        </div>
        <div className="ContactPage__page-name-wrapper">
          <span className="privacy-police-page__page-name">Privacy Policy</span>
        </div>
        <main className="container privacy-police-page__content">
          <img
            className="privacy-police-page__img"
            src="/images/image-privacy-police.png"
            alt=""
          />
          <div className="privacy-police-page__text-block">
            <div className="privacy-police-page__text-date-changing">
              Last Updated: June 4th, 2020
            </div>
          </div>
          {items}
        </main>
        <Footer />
      </div>
    );
  }
}

export default PrivacyPolice;
