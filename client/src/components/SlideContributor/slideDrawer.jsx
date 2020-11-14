import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SlideDrawer = styled.div`
  height: 100%;
  background: #f3f4f7;
  position: fixed;
  top: 66px;
  right: 0;
  width: 300px;
  z-index: 200;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  .close {
    float: right;
    font-size: 16px;
    font-weight: 100;
    line-height: 1;
    color: #fff;
    opacity: 1;
    position: relative;
    top: 2px;
}
  header {
    font-size: 15px;
    background: #212121;
    padding: 0.75rem 1.25rem;
    color: #fff;
    margin-bottom: 10px;
    overflow: auto;
  }
  .notifications {
    padding: 15px;
    text-align: left;
    overflow: auto;
    height: calc(100vh - 56px);
    padding-bottom:85px;

    .alert-card {
      margin-bottom: 15px;
      background: #fff;
      box-shadow: 0 0px 1px rgba(0, 0, 0, 0.03), 0 1px 1px rgba(0, 0, 0, 0.1);
      padding: 10px;
      border-radius: 3px;
      .block {
        margin-bottom: 20px;
        .heading {
          font-size: 12px;
          color: #818488;
        }
      }
      .contribution{
        font-size:14px;
      }
      .contributor-tags span {
        display: inline-block;
        background: rgb(26, 89, 146);
        margin-right: 8px;
        border-radius: 32px;
        padding: 4px 14px;
        font-size: 10px;
        color: rgb(255, 255, 255);
        margin-bottom: 3px;
      }
      .desc {
        margin: 10px 0px;
        line-height: normal;
        color: #444;
      }
      h5 {
        font-size: 15px;
        font-weight: bold;
      }
      p {
        margin-top: 4px;
        margin-bottom: 4px;
      }
      text {
        font-size: 10px;
      }
    }
  }
  .sendbtn {
    color: #673ab7;
  }
`;

const SlideDrawerComponent = (props) => {
  const [contributorList, setContrbutorList] = useState([]);

  //console.log(props.data)

  useEffect(() => {
    if (props.data && props.data.length) {
      getUniqueObjectsMethod(props.data);
    }
  }, [props.data && props.data.length]);

  const handleClose = () => {
    props.closeDrawer(true);
  };

  const getUniqueObjectsMethod = (data) => {
    const dataObj = data.reduce((acc, item) => {
      if (acc[item.uploadedby]) {
        acc[item.uploadedby].push(item.category_name);
      } else {
        acc[item.uploadedby] = [item.category_name];
      }
      return acc;
    }, {});
    const filteredArray = Object.keys(dataObj).map((key) => ({
      uploadedBy: key,
      category_name: Array.from(new Set(dataObj[key])),
      noOfContributions: dataObj[key].length,
    }));
    filteredArray.sort((a,b) => {
      return new Date(a.updated_date) - new Date(b.updated_date)
    })
    setContrbutorList(filteredArray);
  };


  console.log(contributorList)

  return (
    <SlideDrawer className={props.show ? "side-drawer open" : "side-drawer"}>
      <header>
        <div className="pull-left">List of Contributors</div>
        <div className="pull-right">
          <a href="#" className="close" onClick={handleClose}>
            X
          </a>
        </div>
      </header>
      <div className="notifications list">
        {contributorList && contributorList.length > 0 ? 
        (contributorList || []).map((item,i) => {
          return (
            <div className="alert-card">
              <div className="block">
                <span>{item.uploadedBy}</span>{" "}
                {i === 0 && <span><img src={window.location.origin + "/assets/img/star.png"} alt="star" /></span>}
              </div>
              <div className="block">
                <div className="heading">Total Contributions: {" "}<b className="contribution">{item.noOfContributions}</b></div>
              </div>
              <div className="block">
                <div className="heading">Contributed in</div>
                <p className="contributor-tags">
                  {item.category_name.map((element) => {
                    return <span>{element}</span>;
                  })}
                </p>
              </div>
            </div>
          );
        }) : 'Loading....'}
      </div>
    </SlideDrawer>
  );
};

SlideDrawer.defaultProps = {
  show: false,
  data: [],
  closeDrawer: () => {},
};

SlideDrawer.propTypes = {
  show: PropTypes.bool,
  data: PropTypes.arrayOf,
  closeDrawer: PropTypes.func,
};

export default SlideDrawerComponent;
