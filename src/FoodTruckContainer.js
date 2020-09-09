import React from "react";
import { geolocated } from "react-geolocated";
import Form from "./Form";

const FoodTruckContainer = (props) => (
    <div
        style={{
            fontSize: "large",
            fontWeight: "bold",
            margin: "2rem",
        }}
    >
        {!props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation.</div>
        ) : !props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled.</div>
        ) : props.coords ? (
            <div>
                You are at Latitude: {" "}
                <span className="coordinate">
                    {/* {formatDegrees(props.coords.latitude, false)} */}
                    {props.coords.latitude}
                </span>
                , Longitude:{" "}
                <span className="coordinate">
                    {/* {formatDegrees(props.coords.longitude, true)} */}
                    {props.coords.longitude}
                </span>
                {props.coords.altitude ? (
                    <span>
                        , approximately {props.coords.altitude} meters above sea
                        level
                    </span>
                ) : null}
            </div>
        ) : (
            <div>Getting the location data&hellip;</div>
        )}
        {!!props.positionError && (
            <div>
                <br />
                Last position error:
                <pre>{JSON.stringify(props.positionError)}</pre>
            </div>
        )}
        <p />
        <Form cordinates = {props.coords}/>

        </div>
);

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(FoodTruckContainer);