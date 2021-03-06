import React from "react";
import styled from "styled-components";
import ProcessorImg from "../../assets/images/processor-2.jpg";

const PresentationSection = styled.section`
    max-width: 1000px;
    margin: auto;
    padding: 4rem 0;
    display: flex;
    justify-content:center;
    align-items: center;
    border-bottom: .1rem solid;
    border-color: ${props => props.theme.border_color};
    position: relative;

    @media screen and (max-width: 1023px) {
        flex-direction: column-reverse;

        .text-block,
        .image-block {
            width: 100%;
        }

        .text-block {
            margin-top: 2rem;
            padding: 0 2rem;

            .presentation-title {
                position: absolute;
                top: 20%;
                color: ${props => props.theme.primary_color_rgba};
                z-index: 10;
            }
        }
	}
`;

const TextBlock = styled.div`
    width: 50%;
    padding-right: 1.6rem;
`;

const ImageBlock = styled.div`
    height: 30rem;
    width: 50%;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(255, 255, 255, 0.6),rgba(97, 97, 97, 0.4)), url(${ProcessorImg});
    filter: grayscale(1);
`;

const Title = styled.h1`
    font-size: 4rem;
    font-weight: 700;
`;

const DescriptionText = styled.h2`
    margin-top: 3rem;
    font-size: 3rem;
    font-weight: 500;
`;

const SubText = styled.span`
    font-size: 1.6rem;
    font-weight: 500;

    a {
        font-size: 2.8rem;
        font-weight: 600;
        color: ${props => props.theme.secondary_color_rgba};

        &:hover {
            text-decoration: none;
        }
    }
`;

const Presentation = () => {
    return (
        <PresentationSection data-tag="presentation-section">
            <TextBlock data-tag="text-block--div" className="text-block">
                <Title data-tag="title--h1" className="presentation-title">Pin Mapper
                <SubText data-tag="sub-text--span"> for
                <a href="https://www.infineon.com/cms/en/product/microcontroller/32-bit-tricore-microcontroller/"> Aurix </a>
                        family</SubText>
                </Title>
                <DescriptionText data-tag="description-text--h2">
                    This is a simple tool which auto-maps signals to pins.
                </DescriptionText>
            </TextBlock>
            <ImageBlock data-tag="image-block--div" className="image-block">

            </ImageBlock>
        </PresentationSection>
    )
};

export default Presentation;