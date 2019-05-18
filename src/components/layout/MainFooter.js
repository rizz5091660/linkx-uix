import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import write from "../../assets/images/icon/edit.png";
import settings from "../../assets/images/icon/settings.png";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="d-flex  px-3 sticky-bottom">
        <div className="copyright border-top ml-auto my-auto mr-2 msg-overlay">{copyright}
        <div style={{display:"inline",padding:"0 5px 0 80px"}}><img src={write} width="20" height="20"/></div>
        <div style={{display:"inline",padding:"0 5px"}}><img src={settings} width="20" height="20"/></div>
        </div>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "Messaging",
  menuItems: [
    {
      title: "Home",
      to: "#"
    },
    {
      title: "Services",
      to: "#"
    },
    {
      title: "About",
      to: "#"
    },
    {
      title: "Products",
      to: "#"
    },
    {
      title: "Blog",
      to: "#"
    }
  ]
};

export default MainFooter;
