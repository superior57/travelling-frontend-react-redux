import React, { Component } from "react";

export default function AddressExtracter(myLat, myLong) {
  //Address Component It provides formetted address by taking lat long.
  return new Promise((resolve, reject) => {
    let myApiKey = "AIzaSyDI6ER8zACWkCG3oVhNHkOXqLkai7wVNao";
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        myLat +
        "," +
        myLong +
        "&key=" +
        myApiKey
    )
      .then(response => response.json())
      .then(responseJson => {
        let autoFormettedAddress = responseJson.results[0]?.formatted_address;
        if (responseJson && responseJson.results && responseJson.results[0]) {
          let len = responseJson.results[0].address_components.length;
          var zip = "";
          let state = "";
          let country1 = "";
          let countryIsoCode = "";
          let city1 = "";
          let locality = "";
          let street_number = "";
          let route = "";
          for (let i = 0; i < len; i++) {
            let component = responseJson.results[0].address_components[i];
            if (component) {
              if (component.types.includes("administrative_area_level_1")) {
                state = component.long_name;
              } else if (component.types.includes("country")) {
                country1 = component.long_name;
                countryIsoCode = component.short_name;
              } else if (component.types.includes("postal_code")) {
                zip = component.long_name;
              } else if (
                component.types.includes("administrative_area_level_2")
              ) {
                city1 = component.long_name;
              } else if (component.types.includes("locality")) {
                city1 = component.long_name;
                locality = component.long_name;
              } else if (component.types.includes("sublocality")) {
                city1 = component.long_name;
              } else if (component.types.includes("street_number")) {
                street_number = component.long_name;
              } else if (component.types.includes("route")) {
                route = component.long_name;
              }
              let formettedAddress = {
                //Custom Address
                state: state,
                country: country1,
                countryIsoCode: countryIsoCode,
                city1: city1,
                locality: locality,
                postal_code: zip,
                street_number: street_number,
                route: route
              };
              if (i == len - 1) {
                resolve({
                  status: "Success",
                  data: {
                    CustomAddress: formettedAddress,
                    AutoFormetted: autoFormettedAddress
                  }
                });
              }
            } else {
              //Formetted Address
              let formettedAddress = {
                state: state,
                country: country1,
                countryIsoCode: countryIsoCode,
                city1: city1,
                locality: locality,
                postal_code: zip,
                street_number: street_number,
                route: route
              };
              if (i == len - 1) {
                reject({
                  status: "failed",
                  data: {
                    CustomAddress: formettedAddress,
                    AutoFormetted: autoFormettedAddress
                  }
                });
              }
            }
          }
        } else {
          reject({
            status: "failed",
            data: { CustomAddress: null, AutoFormetted: null }
          });
        }
      });
  });
}
