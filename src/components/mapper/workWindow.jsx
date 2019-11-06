import React from "react";
import styled from "styled-components";
import { CSVLink } from "react-csv";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMappingResult } from "../../redux/mapper/mapper.selectors";


const WorkWindowLayout = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 4px;
    ${props => props.theme.elevation_02};
`;

const WindowTitleSection = styled.div`
    width: 100%;
    border-bottom: 1px solid gray;
    position: relative;
`;
const SquareHighlight = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 10px;
    height: 100%;
    background-color: ${props => props.theme.primary_color}
`;

const WindowTitle = styled.h2`
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 10px;
    margin: 0 20px;
`;

const DownloadRes = styled(CSVLink)`
    background-color: ${props => props.theme.primary_color};
    padding: 5px 16px;
    color: white;

    &:hover,
    &:focus {
        text-decoration: none;
        color: white !important;
        box-shadow: 0 0 1px 2px gray;
    }
`;

const WorkWindowComponent = ({ title, download, mappingResult, ...props }) => {


    let titleContent = null;
    let downloadBtn = null;


    if (download) {
        let csvData = [];

        if (mappingResult) {
            csvData = Object.keys(mappingResult).map((result) => {
                return { signal: result, port: mappingResult[result] }
            })
        }
        downloadBtn = <DownloadRes data={csvData} filename='results.csv'>Download results</DownloadRes>;


    }

    if (title) {
        titleContent = (
            <WindowTitleSection data-tag="window-title-section--div">
                <SquareHighlight data-tag="square-highlight--div" />
                <WindowTitle data-tag="window-title">{title}</WindowTitle>
                {downloadBtn}
            </WindowTitleSection>
        );
    }

    return (
        <WorkWindowLayout data-tag="work-window-layout--div">
            {titleContent}
            {props.children}
        </WorkWindowLayout>
    )
};

const mapSateToProps = createStructuredSelector({
    mappingResult: selectMappingResult
});

export default connect(mapSateToProps)(WorkWindowComponent);