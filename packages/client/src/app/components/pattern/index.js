import React from "react";
import Helmet from "react-helmet";
import { Markdown, styled } from "@patternplate/components";
import tag from "tag-hoc";
import Transition from "react-transition-group/Transition";

import PatternDemo from "./pattern-demo";

const VISIBILITY = props => (props.checkers ? "block" : "none");
const CROSSES = props => encodeURI(`<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><path stroke-width="1.5" stroke="#666666" fill="none" d="M15 10.187v9.875M10 15h10"/></svg>`);

const StyledPattern = styled(tag(["checkers"])("div"))`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  &::before {
    content: "";
    display: ${VISIBILITY};
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("data:image/svg+xml;utf-8,${CROSSES}");
    background-size: 15px 15px;
    background-repeat: repeat;
    background-position: 50% 50%;
  }
`;

const StyledPatternFolder = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledPatternDoc = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
`;

const StyledPatternDemo = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const StyledPatternLoader = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  &::after {
    position: absolute;
    top: 0;
    z-index: 2;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: ${props =>
      props.error ? props.theme.error : props.theme.active};
    opacity: 1;
    transition: ${props => (props.error ? "none" : "transform 1s ease-in-out")};
    ${props => {
      switch (props.status) {
        case "entering":
          return `
            transform: translateX(-100%);
          `;
        case "entered":
          return `${props =>
            props.error ? "" : "transform: translateX(-15%);"}`;
        case "exiting":
          return `
            transition: transform .3s ease-out;
            transform: translateX(0);
          `;
        case "exited":
        default:
          return `
            transform: translateX(-100%);
            transition: opacity .3s .25s ease-out;
          `;
      }
    }};
  }
`;

export default class Pattern extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { srcdoc: false };
  }

  render() {
    const { props } = this;

    if (props.contentType !== "pattern") {
      return null;
    }

    if (props.type === "folder") {
      return (
        <StyledPatternFolder>
          <StyledPatternDoc>
            <Markdown source={props.docs} />
          </StyledPatternDoc>
        </StyledPatternFolder>
      );
    }

    return (
      <StyledPattern checkers={props.opacity}>
        <Helmet
          title={[getPrefix(props), props.displayName]
            .filter(Boolean)
            .join(": ")}
        />
        <Transition
          in={props.loading || props.error}
          timeout={{ enter: 1000, exit: 850 }}
        >
          {status => (
            <StyledPatternLoader status={status} error={props.error} />
          )}
        </Transition>
        <StyledPatternDemo>
          <PatternDemo
            src={props.src}
            contents={props.contents}
            loading={props.loading}
            updated={props.updated}
          />
        </StyledPatternDemo>
      </StyledPattern>
    );
  }
}


function getPrefix(props) {
  if (props.loading) {
    return "Load";
  }
  if (props.error) {
    return "Error";
  }
  return "";
}
