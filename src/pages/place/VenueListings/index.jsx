import React, { Component, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PlaceCard from "../../../components/PlaceCard";
import Pagination from "react-js-pagination";

import { connect } from "react-redux";
import { getVenueListings } from "../../../redux/actions/places.actions/places.thunk";
import Paper from "@material-ui/core/Paper/Paper";
import { Form } from "react-bootstrap/Form";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
// import "./style.scss";

function VenueListings({ getVenueListings, venueListings }) {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);

  console.log(venueListings);

  useEffect(() => {
    getVenueListings({ limit, offset: currentPage });
  }, []);

  // const listing = {count: 20,
  //     row: [
  //         {id: 1, name: "Name", image: 'qqq.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //         {id: 2, name: "Nam2", image: 'qqq2.com', city: {city_name: '1', zip_code: '2', country_name:'3'}, price: '4', priceType: '5', persons: '6', rating:'7'},
  //     ]};

  const handlePageChange = pageNumber => {
    // const updateFilters = { ...filters, offset: pageNumber };
    setCurrentpage(pageNumber);
    getVenueListings({ limit, offset: currentPage });
  };

  return venueListings?.count ? (
    <>
      <TableContainer component={Paper} className={"table-wrapper"}>
        <Table size="small" aria-label="a dense table" className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell className={"not-order"} align="right">
                ID
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Image
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Name
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Currency
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Price
              </TableCell>
              <TableCell className={"not-order"} align="right">
                Price Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venueListings &&
              venueListings.rows.map((listValue, index) => (
                <TableRow
                  key={index}
                  className={(index + 1) % 2 === 0 && "changeBg"}
                >
                  <TableCell align="right">{listValue.id}</TableCell>
                  <TableCell align="right">
                    {listValue.image ? (
                      <img
                        style={{ width: "150px" }}
                        src={listValue.image}
                        alt=""
                      />
                    ) : (
                      "image dosen't exist"
                    )}
                  </TableCell>
                  <TableCell align="right">{listValue.name}</TableCell>
                  <TableCell align="right">{listValue.currency}</TableCell>
                  <TableCell align="right">{listValue.price}</TableCell>
                  <TableCell align="right">{listValue.priceType}</TableCell>

                  {/*<TableCell align="right">*/}
                  {/*<button*/}
                  {/*onClick={handlerRemoveVenue}*/}
                  {/*data-id={listValue.id}*/}
                  {/*className={"remove-btn"}*/}
                  {/*>*/}
                  {/*Remove*/}
                  {/*</button>*/}
                  {/*</TableCell>*/}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {venueListings && (
          <div className={"admin pagination-wrapper"}>
            <Pagination
              itemsCountPerPage={limit}
              innerClass={"pagination-table"}
              activePage={currentPage}
              totalItemsCount={venueListings?.count}
              itemClass={"item-pagination"}
              onChange={handlePageChange}
              itemClassPrev={"prev"}
              itemClassNext={"next"}
              prevPageText="Last"
              nextPageText="Next"
              hideFirstLastPages={true}
            />
          </div>
        )}
      </TableContainer>
    </>
  ) : (
    <div>
      <h1>venues is not found</h1>

      <Link className={"profilePage-link"} to="/buildings">
        Add new venue
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    venueListings: state.place.VenueListings
  };
};
const mapDispatchToProps = {
  getVenueListings
};

export default connect(mapStateToProps, mapDispatchToProps)(VenueListings);
