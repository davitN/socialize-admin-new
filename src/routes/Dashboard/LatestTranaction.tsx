import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import {Button, Card, CardBody, Col, Row, CardTitle, CardSubtitle} from "reactstrap";

//შესამოწმებელია რაშია ზუსტად საჭირო
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

//redux
import { useSelector, useDispatch } from "react-redux";

const LatestTranaction = ({ incomeData }: any) => {
  const dispatch = useDispatch();

  const selectRow = {
    mode: "checkbox",
  };

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  //pagination customization
  const pageOptions = {
    sizePerPage: 6,
    totalSize: incomeData.length, // replace later with size(orders),
    custom: true,
  };
  const { SearchBar } = Search;

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1);

  const EcommerceOrderColumns = (toggleModal: any) => [
    {
      dataField: "username",
      text: "Customer",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <Link to="#" className="text-body fw-bold">
          {row.username}
        </Link>
      ),
    },
    {
      dataField: "visitsCount",
      text: "# of Visits",
      sort: true,
    },
    {
      dataField: "lastVisitingTime",
      text: "Last Visit",
      sort: true,
      formatter: (cellContent: any, row: any) => (
          <>
            {new Date(row.lastVisitingTime).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short'
            })}, {new Date(row.lastVisitingTime).getFullYear()}
          </>
      )
    },
    {
      dataField: "postsCount",
      text: "# of Posts",
      sort: true,
    },
    {
      dataField: "viewsOnPosts",
      text: "Views on Posts",
      sort: true,
    },
    // {
    //   dataField: "paymentStatus",
    //   text: "Payment Status",
    //   sort: true,
    //   // eslint-disable-next-line react/display-name
    //   formatter: (cellContent, row) => (
    //     <Badge className={"font-size-12 badge-soft-" + row.badgeclass} color={row.badgeClass} pill>
    //       {row.paymentStatus}
    //     </Badge>
    //   ),
    // },
    // {
    //   dataField: "paymentMethod",
    //   isDummyField: true,
    //   text: "Payment Method",
    //   sort: true,
    //   // eslint-disable-next-line react/display-name
    //   formatter: (cellContent: any, row: any) => (
    //     <>
    //       <i
    //         className={
    //           row.paymentMethod !== "COD"
    //             ? "fab fa-cc-" + toLowerCase1(row.paymentMethod) + " me-1"
    //             : "fab fas fa-money-bill-alt me-1"
    //         }
    //       />{" "}
    //       {row.paymentMethod}
    //     </>
    //   ),
    // },
    {
      dataField: "view",
      isDummyField: true,
      text: "Send Offer",
      // eslint-disable-next-line react/display-name
      formatter: () => (
        <Button type="button" color="primary" className="btn-sm btn-rounded" onClick={toggleViewModal}>
          Send Offer
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
    setTableData(incomeData);
  }, []);

  useEffect(() => {
    if (!isEmpty(incomeData) && !!isEdit) {
      setTableData(incomeData);
      setIsEdit(false);
    }
  }, [incomeData]);

  const toggle = () => {
    setModal(!modal);
  };

  const toLowerCase1 = (str: any) => {
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
          <div className={'flex-horizontal mb-3'}>
            <CardTitle className={'mb-0'}>Top Customers</CardTitle>
            <CardSubtitle className={'ms-4'}>To unlock customers name, simply send an offer and ask that they reveal their name to your business.</CardSubtitle>
          </div>
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            // keyField="id"
            // columns={EcommerceOrderColumns(toggle)}
            // data={incomeData}
          >
            {({ paginationProps, paginationTableProps }: any) => (
              <ToolkitProvider keyField="id" data={incomeData} columns={EcommerceOrderColumns(toggle)} bootstrap4>
                {(toolkitProps: any) => (
                  <React.Fragment>
                    <Row className={'text-start'}>
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
