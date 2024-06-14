import React, { useCallback, useEffect, useState } from "react";
import { ConfigProvider, Table, Tooltip } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewListIcon from "@mui/icons-material/ViewList";
import "./style.css";
import { getClaimsData, deleteClaim } from "../../Redux/Claim/claim.actions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ClaimsTable = ({
  start,
  limit,
  selectedServices,
  selectedProvider,
  selectedFacility,
  selectedStatus,
  selectedColumns,
  startDate,
  endDate,
}) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { claimData, claimDeleteResponse } = useSelector(
    (state) => state.claim
  );
  //status
  const statuses = [
    // { name: "All Statuses", value: 0 },
    { name: "Visit Completed", value: 1 },
    { name: "Created", value: 2 },
    { name: "Filed", value: 3 },
    { name: "Rejected", value: 4 },
    { name: "Denied", value: 5 },
    { name: "Sec Ready", value: 6 },
    { name: "Sec Pending", value: 7 },
    { name: "Ter Ready", value: 8 },
    { name: "Ter Pending", value: 9 },
    { name: "Pat Balance", value: 10 },
    { name: "Closed", value: 11 },
    { name: "Clar Opened", value: 12 },
    { name: "Clar Closed", value: 13 },
    { name: "On Hold", value: 14 },
  ];
  //trim text
  const truncateText = (text, length) => {
    if (text?.length <= length) return text;
    return text?.slice(0, length) + "...";
  };

  //table columns
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      render: (text) => (
        <span className="table-item">{truncateText(text, 14)}</span>
      ),
    },

    {
      title: "MRN",
      dataIndex: "mrn",
      render: (text) => (
        <span className="table-item">{truncateText(text, 14)}</span>
      ),
    },
    {
      title: "DOS",
      dataIndex: "dos",
      render: (text) => (
        <span className="table-item">{truncateText(text, 14)}</span>
      ),
    },
    {
      title: "Provider",
      dataIndex: "provider",
      render: (text) => (
        <Tooltip title={text}>
          <span className="table-item">{truncateText(text, 14)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Payor",
      dataIndex: "payor",
      render: (text) => (
        <Tooltip title={text}>
          <span className="table-item">{truncateText(text, 10)}</span>
        </Tooltip>
      ),
    },

    {
      title: "Facility",
      dataIndex: "facility",
      render: (text) => (
        <Tooltip title={text}>
          <span className="table-item">{truncateText(text, 12)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Service",
      dataIndex: "service",
      render: (text) => (
        <Tooltip title={text}>
          <span className="table-item">{truncateText(text, 14)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Charges",
      dataIndex: "charges",
      render: (text) => <span className="table-item">{text}</span>,
    },
    {
      title: "Payments",
      dataIndex: "payments",
      render: (text) => <span className="table-item">{text}</span>,
    },
    {
      title: "Ins Bal",
      dataIndex: "insBal",
      render: (text) => <span className="table-item">{text}</span>,
    },
    {
      title: "Pat Bal",
      dataIndex: "patBal",
      render: (text) => <span className="table-item">{text}</span>,
    },
    {
      title: "Claim Status",
      dataIndex: "claimStatus",
      render: (text) => (
        <Tooltip title={text}>
          <span className="table-item">{truncateText(text, 10)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      dataIndex: "claimId",
      render: (_, record) => (
        <span
          style={{
            color: "#A3ACB9",
            cursor: "pointer",
            display: "flex",
            gap: "5px",
          }}
        >
          <ViewListIcon
            fontSize="small"
            onClick={() => navigate("/claimslist/claims-details")}
          ></ViewListIcon>
          <EditIcon fontSize="small" />
          <DeleteIcon
            fontSize="small"
            onClick={() => handleDelete(record.claimId)}
          />
        </span>
      ),
    },
  ];
  // // const columns = selectedColumns.map((col) => columnDefinitions[col]);
  // const columns = columnDefinitions.filter((col) =>
  //   selectedColumns.includes(col.title)
  // );

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const lastYear = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear() - 1;
    return `${year}-${month}-${day}`;
  };

  // useCallback to fetch data
  const fetchData = useCallback(() => {
    dispatch(
      getClaimsData({
        clinicId: 93422,
        start: start,
        limit: limit,
        providerId: selectedProvider,
        serviceIds: selectedServices,
        facilityIds: selectedFacility,
        status: selectedStatus,
        startDate: lastYear(new Date()),
        endDate: formatDate(new Date()),
      })
    );
  }, [
    dispatch,
    start,
    limit,
    selectedProvider,
    selectedServices,
    selectedFacility,
    selectedStatus,
  ]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (claimData?.result?.providerSummary) {
      setData(
        claimData.result.providerSummary.map((item, index) => ({
          key: index + 1,
          claimId: item.claimId,
          patientName: item.spatientName ?? "",
          // FirstName: "Jenny",
          mrn: item.smrn ?? "",
          dos: formatDate(item.sdos) ?? "",
          provider: item.sproviderName ?? "",
          payor: item.payorName ?? "",
          facility: item.facilityName ?? "",
          service: item.serviceName ?? "",
          charges: `$${item.dcharges}` ?? "$ 0.00",
          payments: `$${item.dpayments}` ?? "$ 0.00",
          insBal: ` $${item.insuranceBalance}.00` ?? "$ 0.00",
          patBal: `$${item.patientBalance}.00` ?? "$ 0.00",
          claimStatus: item.claimStatus
            ? statuses[item.claimStatus - 1].name
            : "",
        }))
      );
    }
  }, [claimData]);

  useEffect(() => {
    if (claimDeleteResponse) {
      toast.success("Claim deleted successfully");
      fetchData(); // Call fetchData to refresh data after deletion

      //Here need to remove the value of claimDeleteResponse is needed claimDeleteResponse=null/with a reducer function
    }
  }, [claimDeleteResponse, fetchData]);
  // Handle delete claim action
  const handleDelete = (claimId) => {
    dispatch(deleteClaim(claimId));
  };

  // Calculate totals
  const totalCharges = claimData?.result?.reportSummary?.dtotalCharges;
  const totalPayments = claimData?.result?.reportSummary?.dtotalPayments;
  const totalInsBal = claimData?.result?.reportSummary?.dtotalInsuranceBalance;
  const totalPatBal = claimData?.result?.reportSummary?.dtotalPatientBalance;

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#139696",
            colorText: "black",
          },
          components: {
            Table: {
              headerBg: "#E0F0F2",
            },
          },
        }}
      >
        <Table
          className="custom-scrollbar"
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          size="small"
          scroll={{ y: "calc(100vh - 200px)" }}
          summary={() => (
            <Table.Summary.Row className="  sticky-summary-row">
              <Table.Summary.Cell index={0} colSpan={8}>
                Grand Total
              </Table.Summary.Cell>
              <Table.Summary.Cell index={7}>
                {totalCharges?.toFixed(2)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={8}>
                {totalPayments?.toFixed(2)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={9}>
                {totalInsBal?.toFixed(2)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={10}>
                {totalPatBal?.toFixed(2)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={11} colSpan={2}></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
          // summary={
          //   <Table.Summary.Row className="sticky-summary-row">
          //     <Table.Summary.Cell index={0} colSpan={columns.length - 4}>
          //       Grand Total
          //     </Table.Summary.Cell>
          //     {columns.map((col, index) => {
          //       switch (col.dataIndex) {
          //         case "charges":
          //           return (
          //             <Table.Summary.Cell key={index}>
          //               {totalCharges?.toFixed(2)}
          //             </Table.Summary.Cell>
          //           );
          //         case "payments":
          //           return (
          //             <Table.Summary.Cell key={index}>
          //               {totalPayments?.toFixed(2)}
          //             </Table.Summary.Cell>
          //           );
          //         case "insBal":
          //           return (
          //             <Table.Summary.Cell key={index}>
          //               {totalInsBal?.toFixed(2)}
          //             </Table.Summary.Cell>
          //           );
          //         case "patBal":
          //           return (
          //             <Table.Summary.Cell key={index}>
          //               {totalPatBal?.toFixed(2)}
          //             </Table.Summary.Cell>
          //           );
          //         default:
          //           return (
          //             <Table.Summary.Cell key={index}></Table.Summary.Cell>
          //           );
          //       }
          //     })}
          //     <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
          //   </Table.Summary.Row>
          // }
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
};

export default ClaimsTable;
