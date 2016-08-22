import React from 'react';
import { browserHistory } from 'react-router';

const Menu = React.createClass({
  getInitialState() {
    const slideDuration = 206;
    const pageSwitchDuration = Math.floor(slideDuration * 0.6);
    const pageSwitchDelay = Math.floor(slideDuration * 0.4);
    const { navItems } = this.props;
    const blankPositions = Object.keys(navItems)
      .reduce((newObj, key) => ({
        ...newObj,
        [`POSITION_${key}`]: 0,
      }), {});

    return {
      offsetVal: 40,
      slideDuration,
      pageSwitchDuration,
      pageSwitchDelay,
      showBall: false,
      ballPosition: this.activeBallPosition(this.currentRoute(), navItems),
      ballSize: 14,
      ballStyles: {},
      styleBank: {
        textDefault: {
          transition: `opacity ${pageSwitchDuration}ms ${pageSwitchDelay}ms, color ${pageSwitchDuration}ms ${pageSwitchDelay}ms`,
          color: 'black',
        },
        textActive: { opacity: 1, color: 'dodgerblue' },
        textInactive: { opacity: 0.2 },
        ballDefault: {
          transition: `transform ${slideDuration}ms ease-in-out`,
        },
        ...blankPositions,
      },
    };
  },
  componentDidMount() {
    const { offsetVal } = this.state;
    const { navItems } = this.props;
    this.initBallPositions(navItems, offsetVal)
      .then(() => {
        this.setState({ showBall: true });
      });
  },
  initBallPositions(navItems) {
    return new Promise(res => {
      const { ballSize } = this.state;
      function calcPixels(navKey) {
        const ele = this[`heading${navKey}`];
        const halfEleWidth = ele.offsetWidth / 2;
        const offset = ele
          .parentElement
          .offsetLeft;
        const num = offset + halfEleWidth - ballSize / 2;
        return { transform: `translate(${num}px, -50%)` };
      }

      const positions = Object.keys(navItems)
        .reduce((newOBj, navKey) => ({
          ...newOBj,
          [`POSITION_${navKey}`]: calcPixels.call(this, navKey),
        }), {});

      this.setState({
        styleBank: {
          ...this.state.styleBank,
          ...positions,
        },
      }, () => { res('DONE_SETTING_INIT_POSITIONS'); });
    });
  },
  activeBallPosition(route, navItems) {
    const numberText = Object.keys(navItems)
      .filter(key => navItems[key].route === route)
      .pop();

    return `POSITION_${numberText}`;
  },
  currentRoute() {
    return location.pathname
      .split('/')
      .filter(route => route !== '')
      .slice(-1)[0];
  },
  slideBall(ballPosition, positionObj) {
    const { path } = positionObj;
    this.setState({
      ballPosition,
    }, () => {
      browserHistory.push(path);
    });
  },
  calcStyles() {
    const { styleBank, ballPosition } = this.state;
    const { navItems } = this.props;
    const { textDefault, textActive, textInactive, ballDefault } = styleBank;

    const headingOne = ballPosition === 'ballLeft'
      ? { ...textDefault, ...textActive }
      : { ...textDefault, ...textInactive };

    const headingStyles = Object.keys(navItems)
      .reduce((newObj, key) => {
        const navObj = navItems[key];
        const { route } = navObj;
        const isActive = route === this.currentRoute();
        const decStyles = isActive ? textActive : textInactive;

        return {
          ...newObj,
          [`heading${key}`]: {
            ...textDefault,
            ...decStyles,
          },
        };
      }, {});

    return {
      ...headingStyles,
      ball: {
        ...ballDefault,
        ...this.state.styleBank[ballPosition],
      },
    };
  },
  render() {
    const { showBall } = this.state;
    const { navItems } = this.props;
    const styles = this.calcStyles();

    const navElements = Object.keys(navItems)
      .map(numKey => {
        const positionObj = navItems[numKey];
        return (
          <div
            key={numKey}
            className="box auto--width portfolio-nav-link"
            onClick={() =>
              this.slideBall(`POSITION_${numKey}`, positionObj)
            }
          >
            <span
              className="portfolio-nav-text"
              ref={c => {
                this[`heading${numKey}`] = c;
              }}
              style={styles[`heading${numKey}`]}
            >
              {positionObj.text}
            </span>
          </div>
        );
      });

    return (
      <div className="portfolio-nav center--col-x row">
        <div className="box portfolio-nav-box">
          <div
            className="row"
            ref={ref => { this.deepestRow = ref; }}
          >
            {navElements}
            <div className="box s--12-12 slider-cont">
              <div className="slider-rail">
              </div>
              {
                showBall
                ? <div
                  style={styles.ball}
                  className="slider-ball"
                >
                </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default Menu;
