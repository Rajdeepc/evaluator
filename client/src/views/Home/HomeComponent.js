import React from "react";
import styled from "styled-components";
import SelectorBar from "../../components/SelectorBar/SelectorBar";

const ContainerFluid = styled.div`
  width: 100%;
  min-height: calc(100vh - 7rem);
`;

const HomeComponent = (props) => {
  return (
    <div>
      <ContainerFluid>
        <SelectorBar {...props} />
      </ContainerFluid>
    </div>
  );
};

export default HomeComponent;
