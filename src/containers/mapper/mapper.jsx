import React, { useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import styled from "styled-components";
import WorkWindowComponent from "../../components/mapper/workWindow";
import PeripheralsComponent from "../../components/mapper/peripherals/peripherals";
import SignalsComponent from "../../components/mapper/signals/signals";
// import PropertiesComponent from "../../components/mapper/properties/properties";
import LoggerComponent from "../../components/mapper/logger";
import MapResultComponent from "../../components/mapper/mapResultView/mapResultView";
import MapResultTreeComponent from "../../components/mapper/mapResultTree/mapResultTree";
import { connect } from "react-redux";

import { getUcData } from "../../redux/mapper/mapper.actions";
import { selectUcData, selectError } from "../../redux/mapper/mapper.selectors";
import { createStructuredSelector } from "reselect";

import NotAvailableComponent from "../notAvailable/notAvailable";



const MapperLayout = styled.div`
    height: 100%;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 24px minmax(20%, 1fr) minmax(20%, 1fr) minmax(40%, 2fr) 24px;
    // grid-template-rows: minmax(35vh, 1fr) minmax(35vh, 1fr) 15vh;
    grid-template-rows: minmax(37vh,38ch) minmax(33vh,13vh) 15vh;
    justify-content: center;
    align-items: center;
    grid-gap: 15px;


    @media screen and (max-width: 1024px) {
        display: none;
	}
`;

const MapperSection = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const PeripheralsSection = styled(MapperSection)`
    grid-column: 2 / 3;
    grid-row: 1 / 3;
`;

const SignalsSection = styled(MapperSection)`
    grid-column: 3 / 4;
    grid-row: 1 / 3;
`;

const MapResTreeSection = styled(MapperSection)`
    grid-column: 4 / 5;
    grid-row: 1 / 2;
`;

const MappResSection = styled(MapperSection)`
    grid-column: 4 / 5;
    grid-row: 2 / 4;
`;

const LogSection = styled(MapperSection)`
    grid-column: 2 / 4;
    grid-row: 3 / 4;
`;

const MapperComponent = ({ getUcData, ucData, error, ...props }) => {
    let { ucName } = useParams();

    useEffect(() => {
        if (ucName) {
            getUcData(ucName);
        }
        if (error) {
            props.history.push(`/404`);
        }
         // eslint-disable-next-line
    }, [getUcData, ucName, error]);

    if (!ucData) {
        return null;
    }

    return (
        <>
            <NotAvailableComponent />
            <MapperLayout data-tag="mapper-layout---div">
                <PeripheralsSection data-tag="peripheral-section--div">
                    <WorkWindowComponent title="Peripherals">
                        <PeripheralsComponent />
                    </WorkWindowComponent>
                </PeripheralsSection>
                <SignalsSection data-tag="signals-section--div">
                    <WorkWindowComponent title="Signals">
                        <SignalsComponent />
                    </WorkWindowComponent>
                </SignalsSection>
                <MapResTreeSection data-tag="map-res-tree-section--div">
                    <WorkWindowComponent title="Mapping results" download>
                        <MapResultTreeComponent />
                    </WorkWindowComponent>
                </MapResTreeSection>
                <MappResSection data-tag="map-res-section--div">
                    <WorkWindowComponent>
                        <MapResultComponent />
                    </WorkWindowComponent>
                </MappResSection>
                <LogSection data-tag="log-section--div">
                    <WorkWindowComponent title="Log">
                        <LoggerComponent />
                    </WorkWindowComponent>
                </LogSection>
            </MapperLayout>
        </>
    )
};

const mapSateToProps = createStructuredSelector({
    ucData: selectUcData,
    error: selectError
});

const mapDispatchToProps = dispatch => {
    return {
        getUcData: (ucName) => dispatch(getUcData(ucName))
    }
};


export default withRouter(connect(mapSateToProps, mapDispatchToProps)(MapperComponent));