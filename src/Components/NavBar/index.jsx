import React, { useState } from "react";
import { Tabs } from "antd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentsIcon from "@mui/icons-material/Payments";
import ForumIcon from "@mui/icons-material/Forum";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaidIcon from "@mui/icons-material/Paid";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
// import "./index.css";
function NavBar() {
  const [selectedKey, setSelectedKey] = useState("1");
  //   const navigate = useNavigate();
  //   const onChange = (key) => {
  //     console.log(key);
  //     setSelectedKey(key);
  //     if (key === "1") {
  //       navigate("/ar");
  //     } else if (key === "2") {
  //       navigate("tasks");
  //     } else if (key === "3") {
  //       navigate("priorauth");
  //     } else if (key === "4") {
  //       navigate("coding");
  //     } else if (key === "5") {
  //       navigate("eligibility");
  //     } else if (key === "6") {
  //       navigate("admin");
  //     }
  //   };
  const items = [
    {
      key: "1",
      label: (
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#139696",
            paddingRight: "1.4rem",
            borderRight: "2px solid #C1C9D2",
          }}
        >
          <CalendarMonthIcon fontSize="large" />
          <div>Calender</div>
        </div>
      ),
      children: "",
    },
    {
      key: "2",
      label: (
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#139696",
            paddingRight: "1.4rem",
            borderRight: "2px solid #C1C9D2",
          }}
        >
          <AccountBoxIcon fontSize="large" />
          <div>Accounts</div>
        </div>
      ),
      children: "",
    },
    {
      key: "3",
      label: (
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#139696",
            paddingRight: "1.4rem",
            borderRight: "2px solid #C1C9D2",
          }}
        >
          <PaidIcon fontSize="large" />
          <div>Claims</div>
        </div>
      ),
      children: "",
    },
    {
      key: "4",
      label: (
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#139696",
            paddingRight: "1.4rem",
            borderRight: "2px solid #C1C9D2",
          }}
        >
          <PaymentsIcon fontSize="large" />
          <div>Payments</div>
        </div>
      ),
      children: "",
    },
    {
      key: "5",
      label: (
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#139696",
            paddingRight: "1.4rem",
            borderRight: "2px solid #C1C9D2",
          }}
        >
          <ForumIcon fontSize="large" />
          <div>Messages</div>
        </div>
      ),
      children: "",
    },
    {
      key: "6",
      label: (
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#139696",
            paddingRight: "1.4rem",
            borderRight: "2px solid #C1C9D2",
          }}
        >
          <AssessmentIcon fontSize="large" />
          <div>Rounding</div>
        </div>
      ),
      children: "",
    },
    {
      key: "7",
      label: (
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#139696",
            paddingRight: "1.4rem",
            borderRight: "2px solid #C1C9D2",
          }}
        >
          <ArticleIcon fontSize="large" />
          <div>Reports</div>
        </div>
      ),
      children: "",
    },
  ];
  return (
    <>
      <Tabs
        className=" subheading"
        activeKey={selectedKey}
        // defaultActiveKey="3"
        items={items}
        size="small"
        // onChange={onChange}
      />
    </>
  );
}

export default NavBar;