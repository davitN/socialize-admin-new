import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { isEmpty } from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap";

//შესამოწმებელია რაშია ზუსტად საჭირო
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

//redux
import { useSelector, useDispatch } from "react-redux";

const orders = [
  {
    id: "customCheck2",
    orderId: "#SK2540",
    billingName: "Neal Matthews",
    orderdate: "2019-10-08",
    total: "$400",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: "customCheck3",
    orderId: "#SK2541",
    billingName: "Jamal Burnett",
    orderdate: "2019-10-07",
    total: "$380",
    badgeclass: "danger",
    paymentStatus: "Chargeback",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: "customCheck4",
    orderId: "#SK2542",
    billingName: "Juan Mitchell",
    orderdate: "2019-10-06",
    total: "$384",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: "customCheck5",
    orderId: "#SK2543",
    billingName: "Barry Dick",
    orderdate: "2019-10-05",
    total: "$412",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: "customCheck6",
    orderId: "#SK2544",
    billingName: "Ronald Taylor",
    orderdate: "2019-10-04",
    total: "$404",
    badgeclass: "warning",
    paymentStatus: "Refund",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: "customCheck7",
    orderId: "#SK2545",
    billingName: "Jacob Hunter",
    orderdate: "2019-10-04",
    total: "$392",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: "customCheck8",
    orderId: "#SK2546",
    billingName: "William Cruz",
    orderdate: "2019-10-03",
    total: "$374",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fas fa-money-bill-alt",
    paymentMethod: "COD",
  },
  {
    id: "customCheck9",
    orderId: "#SK2547",
    billingName: "Dustin Moser",
    orderdate: "2019-10-02",
    total: "$350",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Mastercard",
  },
  {
    id: "customCheck10",
    orderId: "#SK2548",
    billingName: "Clark Benson",
    orderdate: "2019-10-01",
    total: "$345",
    badgeclass: "warning",
    paymentStatus: "Refund",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Visa",
  },
  {
    id: "customCheck11",
    orderId: "#SK2540",
    billingName: "Neal Matthews",
    orderdate: "2019-10-08",
    total: "$400",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: "customCheck12",
    orderId: "#SK2541",
    billingName: "Jamal Burnett",
    orderdate: "2019-10-07",
    total: "$380",
    badgeclass: "danger",
    paymentStatus: "Chargeback",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: "customCheck13",
    orderId: "#SK2542",
    billingName: "Juan Mitchell",
    orderdate: "2019-10-06",
    total: "$384",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: "customCheck14",
    orderId: "#SK2543",
    billingName: "Barry Dick",
    orderdate: "2019-10-05",
    total: "$412",
    badgeclass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
];

const LatestTranaction = (props) => {
  const dispatch = useDispatch();

  // const { orders } = useSelector((state) => ({
  //   orders: state.ecommerce.orders,
  // }));

  // useEffect(() => {
  //   dispatch(onGetOrders());
  // }, [dispatch]);

  const selectRow = {
    mode: "checkbox",
  };

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  //pagination customization
  const pageOptions = {
    sizePerPage: 6,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  };
  const { SearchBar } = Search;

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1);

  const EcommerceOrderColumns = (toggleModal) => [
    {
      dataField: "orderId",
      text: "Order ID",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.orderId}
        </Link>
      ),
    },
    {
      dataField: "billingName",
      text: "Billing Name",
      sort: true,
    },
    {
      dataField: "orderdate",
      text: "Date",
      sort: true,
    },
    {
      dataField: "total",
      text: "Total",
      sort: true,
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Badge className={"font-size-12 badge-soft-" + row.badgeclass} color={row.badgeClass} pill>
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      dataField: "paymentMethod",
      isDummyField: true,
      text: "Payment Method",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <i
            className={
              row.paymentMethod !== "COD"
                ? "fab fa-cc-" + toLowerCase1(row.paymentMethod) + " me-1"
                : "fab fas fa-money-bill-alt me-1"
            }
          />{" "}
          {row.paymentMethod}
        </>
      ),
    },
    {
      dataField: "view",
      isDummyField: true,
      text: "View Details",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: () => (
        <Button type="button" color="primary" className="btn-sm btn-rounded" onClick={toggleViewModal}>
          View Details
        </Button>
      ),
    },
  ];

  // useEffect(() => {
  //   if (orders && !orders.length) {
  //     onGetOrders();
  //   }
  // }, [onGetOrders, orders]);

  useEffect(() => {
    setOrderList(orders);
  }, []);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    setModal(!modal);
  };

  const toLowerCase1 = (str) => {
    return str.toLowerCase();
  };

  const defaultSorted = [
    {
      dataField: "orderId",
      order: "desc",
    },
  ];

  return (
    <React.Fragment>
      {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Latest Transaction</div>
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="id"
            columns={EcommerceOrderColumns(toggle)}
            data={orders}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider keyField="id" data={orders} columns={EcommerceOrderColumns(toggle)} bootstrap4 search>
                {(toolkitProps) => (
                  <React.Fragment>
                    <Row>
                      <Col xl="12">
                        <div className="table-responsive">
                          <BootstrapTable
                            keyField="id"
                            responsive
                            bordered={false}
                            striped={false}
                            defaultSorted={defaultSorted}
                            selectRow={selectRow}
                            classes={"table align-middle table-nowrap table-check"}
                            headerWrapperClasses={"table-light"}
                            {...toolkitProps.baseProps}
                            {...paginationTableProps}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="pagination pagination-rounded justify-content-end">
                      <PaginationListStandalone {...paginationProps} />
                    </div>
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}
          </PaginationProvider>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

// LatestTranaction.propTypes = {
//   orders: PropTypes.array,
//   onGetOrders: PropTypes.func,
// };

export default LatestTranaction;
