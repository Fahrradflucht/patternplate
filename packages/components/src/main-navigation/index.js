const React = require("react");
const styled = require("styled-components").default;
const fonts = require("../fonts");
const Link = require("../link");
const Header = require("../main-header");
const NavigationTree = require("../navigation-tree");
const NavigationToolbar = require("../navigation-toolbar");
const Icon = require("../icon");

const FONTS = fonts();

class Navigation extends React.Component {
  constructor(...args) {
    super(...args);
    this.getRef = this.getRef.bind(this);
    this.handleScrollRequest = this.handleScrollRequest.bind(this);
  }

  handleScrollRequest(e) {
    if (!this.ref || !e.target) {
      return;
    }

    const item = e.target.getBoundingClientRect();
    const list = this.ref.getBoundingClientRect();
    const pad = getPadding(this.ref);

    if (item.bottom > list.bottom - pad("bottom")) {
      this.ref.scrollTop =
        e.target.offsetTop - list.height + pad("bottom") + 60 + item.height;
      return;
    }

    if (item.top < list.top + 90 + pad("top")) {
      this.ref.scrollTop = e.target.offsetTop + pad("top") - 90;
    }
  }

  getRef(ref) {
    this.ref = ref;
  }

  render() {
    const { props } = this;
    const children = React.Children.toArray(props.children);
    const toolbar = children.find(child => child.type === NavigationToolbar);
    const header = children.find(child => child.type === NavigationHeader);

    return (
      <StyledNavigation onKeyDown={this.handleKeyDown}>
        {header ? (
          header
        ) : (
          <StyledHeader
            title={props.applicationTitle}
            symbol="patternplate"
          />
        )}
        <StyledNavigationTree innerRef={this.getRef}>
          {props.docs.children.length > 0 &&
            <Documentation
              active={props.active}
              docs={props.docs}
              onItemClick={props.onItemClick}
              onScrollRequest={this.handleScrollRequest}
              />
          }
          {
            props.navigation.children.length > 0 && (
              <React.Fragment>
                <NavigationLabel
                  enabled={props.patternsEnabled}
                  name="patterns"
                  onClick={props.onLabelClick}>
                  Patterns
                </NavigationLabel>
                {
                  props.patternsEnabled &&
                    <NavigationTree
                      active={props.active}
                      data={props.navigation.children}
                      onItemClick={props.onItemClick}
                      onScrollRequest={this.handleScrollRequest}
                      prefix="/pattern"
                      />
                }
              </React.Fragment>
            )
          }
        </StyledNavigationTree>
        {toolbar && (
          <StyledNavigationToolbar>{toolbar}</StyledNavigationToolbar>
        )}
      </StyledNavigation>
    );
  }
}

module.exports = Navigation;
module.exports.NavigationToolbar = NavigationToolbar;
module.exports.NavigationHeader = NavigationHeader;

Navigation.defaultProps = {
  tools: []
};

function NavigationLabel(props) {
  return (
      <StyledLabelLink
        title={`${props.enabled ? 'Close' : 'Expand'} ${props.children} list`}
        onClick={()=> props.onClick({[`${props.name}-enabled`]: !props.enabled})}
      >
        <StyledLabel enabled={props.enabled}>
          <StyledLabelIcon enabled={props.enabled}>
            <Icon symbol="arrow-right" />
          </StyledLabelIcon>
          {props.children}
        </StyledLabel>
    </StyledLabelLink>
  );
}

function NavigationHeader(props) {
  return <div>{props.children}</div>;
}

function getPadding(el) {
  const style = global.getComputedStyle(el, null);
  return direction =>
    parseInt(style.getPropertyValue(`padding-${direction}`), 10);
}

const StyledHeader = styled(Header)`
  height: 60px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const StyledNavigation = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: ${props => props.theme.background};
`;

const StyledLabel = styled.div`
  box-sizing: border-box;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  font-family: ${FONTS.default};
  font-size: .8em;
  color: ${props => props.theme.color};
  background-color: ${props =>
    props.enabled ?
      props.theme.backgroundTertiary : props.theme.background
  };
  border-style: solid;
  border-top-color: ${props => props.enabled ? props.theme.backgroundSecondary : props.theme.border};
  border-bottom-color: ${props => props.enabled ? 'transparent' : props.theme.border};
  border-width: 1px 0;
`;

const StyledLabelLink = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  color: ${props => props.theme.color};
  cursor: pointer;
  text-decoration: none;
`;

const StyledLabelIcon = styled.span`
  margin-right: 10px;
  transform-origin: center;
  transform: rotate(${props => props.enabled ? 90 : 0}deg);
`;

const PASSAGE_HEIGHT = 50;

const StyledNavigationTree = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scroll: touch;
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) ${PASSAGE_HEIGHT}px
  );
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) ${PASSAGE_HEIGHT}px
  );
`;

const StyledNavigationToolbar = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`;

function Documentation(props) {
  return (
    <StyledDocumentationTree
      active={props.active}
      className="docs-navigation"
      data={props.docs.children}
      onItemClick={props.onItemClick}
      onScrollRequest={props.onScrollRequest}
      prefix="/doc"
    />
  );
}

const StyledDocumentationTree = styled(NavigationTree)`
  margin-bottom: 5px;
  padding-bottom: 5px;
`;
