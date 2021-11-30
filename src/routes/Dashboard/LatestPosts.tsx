import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { Button, Card, CardBody, Col, Row, CardTitle, CardSubtitle, Badge } from "reactstrap";

//შესამოწმებელია რაშია ზუსტად საჭირო
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

const getCustomerTypeColors = (type: string): string => {
  switch (type) {
    case 'Regular':
      return 'success';
    case 'First Visit':
      return 'warning';
    case 'Second Visit':
      return 'danger';
    default:
      return 'danger';
  }
}

import { Post } from "../../types/dashboard/index.d";

const LatestPosts: React.FC<{posts: Post[]}> = ({posts}) => {
  const selectRow = {
    mode: "checkbox",
  };

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  //pagination customization
  const pageOptions = {
    sizePerPage: 6,
    totalSize: posts.length, // replace later with size(orders),
    custom: true,
  };
  const { SearchBar } = Search;

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1);

  const EcommerceOrderColumns = (toggleModal: any) => [
    {
      dataField: "_id",
      text: "Post",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <Link to="#" className="text-body fw-bold">
          {row._id}
        </Link>
      ),
    },
    {
      dataField: "name",
      text: "Customer Posting",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
          <React.Fragment>
            {row.firstName} {row.lastName}
          </React.Fragment>
      )
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
          <React.Fragment>
            {new Date(row.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short'
            })}, {new Date(row.createdAt).getFullYear()}
          </React.Fragment>
      )
    },
    {
      dataField: "commentsCount",
      text: "Comments",
      sort: true,
    },
    {
      dataField: "customerType",
      text: "Customer Type",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent: any, row: any) => (
        <Badge className={"font-size-12 badge-soft-" + getCustomerTypeColors(row.customerType)}
               color={getCustomerTypeColors(row.customerType)} pill>
          {row.customerType}
        </Badge>
      ),
    },
    {
      dataField: "viewsCount",
      text: "Views",
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
      text: "View Details",
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

  const toggle = () => {
    setModal(!modal);
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
          <CardTitle className={'mb-3 text-start'}>Latest Posts</CardTitle>
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            // keyField="id"
            // columns={EcommerceOrderColumns(toggle)}
            // data={posts}
          >
            {({ paginationProps, paginationTableProps }: any) => (
              <ToolkitProvider keyField="id" data={posts} columns={EcommerceOrderColumns(toggle)} bootstrap4>
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

// TopCustomers.propTypes = {
//   orders: PropTypes.array,
//   onGetOrders: PropTypes.func,
// };

export default LatestPosts;
