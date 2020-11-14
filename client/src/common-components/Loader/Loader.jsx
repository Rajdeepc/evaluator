import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const LoaderComponent = styled.div`
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  color:#284d81;
  z-index: 1;
  .loaderwithspinner{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    color: #284d81;
    text-align: center;
    .spinner-border {
        display: block;
        margin: 0 auto;
        margin-bottom: 15px;
    }
}
`;

 const isLoadingHOC = (WrappedComponent, loadingMessage) => {
  const HOC = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const setLoadingState = (isComponentLoading) => {
      setIsLoading(isComponentLoading);
    };
    return (
      <>
        {isLoading && (
          <div className="loader">
            <LoaderComponent>
                <div className="loaderwithspinner">
                <Spinner animation="border" role="status">
                
                </Spinner>
                <span className="loading-message">{loadingMessage}</span>
                </div>
              
            </LoaderComponent>
          </div>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  };
  return HOC;
};

export default isLoadingHOC;
