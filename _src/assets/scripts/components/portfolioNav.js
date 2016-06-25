import React, { PropTypes } from 'react'
import { browserHistory, Link } from 'react-router';

const PortfolioNav = React.createClass({
  getInitialState() {

    const slideDuration = 400;
    const pageSwitchDuration = Math.floor(slideDuration * 0.6);
    const pageSwitchDelay = Math.floor(slideDuration * 0.4);

    return {
      slideDuration,
      pageSwitchDuration,
      pageSwitchDelay,
      showBall: false,
      ballPosition: this.activeBallPosition(this.currentRoute()),
      ballSize: 14,
      ballStyles: {},
      styleBank: {
        textDefault: {
          transition: `opacity ${pageSwitchDuration}ms ${pageSwitchDelay}ms`
        },
        textActive: { opacity: 1 },
        textInactive: { opacity: 0.2 },
        ballDefault: {
          transition: `transform ${slideDuration}ms ease`
        },
        ballRight: {},
        ballLeft: {},
      },
    }
  },
  componentDidMount(){
    this.setLeftAndRightCenterVal()
      .then( () => {this.setState({ showBall: true })} );
  },
  currentRoute(){
    return location.pathname
      .split('/')
      .filter( route => route !== '' )
      .slice(-1)[0];
  },
  activeBallPosition(route){
    switch (route) {
      case 'portfolio':
        return 'ballLeft';
      case 'other':
        return 'ballRight';
      default:
        return 'ballLeft';
    }
  },
  setLeftAndRightCenterVal(){
    const { styleBank, ballSize } = this.state;
    const ballHalf = ballSize / 2;
    const halfHeading1 = this.headingOne.clientWidth / 2;
    const offset1 = halfHeading1 - ballHalf;
    const halfHeading2 = this.headingTwo.clientWidth / 2;
    const offset2 = this.deepestRow.clientWidth - halfHeading2 - ballHalf;

    function updateStateVal(ballPosition, offset, oldState) {
      return new Promise((res, rej) => {
        this.setState({
          styleBank: {
            ...oldState.styleBank,
            [ballPosition]: {
              transform: `translate(${offset}px, -50%)`,
            }
          }
        }, () => {
          res(this.state)
        })
      })
    }
    return updateStateVal.call(this, 'ballLeft', offset1, this.state)
      .then( oldState => {
        updateStateVal.call(this, 'ballRight', offset2, oldState)
      })
  },
  slideBall(direction, e){
    const { pageSwitchDelay } = this.state;
    switch(direction) {
      case 'RIGHT':
        this.setState({ballPosition: 'ballRight'});
        pageTransition('/portfolio/other', pageSwitchDelay);
        break;
      case 'LEFT':
        this.setState({ballPosition: 'ballLeft'});
        pageTransition('/portfolio/', pageSwitchDelay);
        break;
      default:
        break;
    }
    function pageTransition(path, delay) {
      setTimeout(() => {
        browserHistory.push(path);
      }, delay)
    }
  },
  calcStyles(){
    const { styleBank, ballPosition } = this.state;
    const { textDefault, textActive, textInactive, ballDefault, ballLeft, ballRight } = styleBank;
    const headingOne = ballPosition === 'ballLeft'
      ? { ...textDefault, ...textActive }
      : { ...textDefault, ...textInactive };
    const headingTwo = ballPosition === 'ballRight'
      ? { ...textDefault, ...textActive }
      : { ...textDefault, ...textInactive };
    return {
      headingOne,
      headingTwo,
      ball: {
        ...ballDefault,
        ...this.state.styleBank[ballPosition]
      }
    }
  },
  render () {
    const {showBall, ballPosition, styleBank} = this.state;
    const styles = this.calcStyles();

    const ball = showBall
      ? <div style={styles.ball} className="slider-ball"></div>
      : null;
    return (
      <div className="portfolio-nav center--col-x row">
        <div className="box portfolio-nav-box">
          <div
            className="row pull--edges"
            ref={ref => this.deepestRow = ref}
          >
            <div
              className="box auto--width portfolio-nav-link"
              onClick={() => this.slideBall('LEFT')}
            >
              <span
                className="portfolio-nav-text"
                ref={ref => this.headingOne = ref}
                style={styles.headingOne}
              >
                Web Development
              </span>
            </div>
            <div
              to="/portfolio/other"
              className="box auto--width portfolio-nav-link"
              onClick={() => this.slideBall('RIGHT')}
            >
              <span
                className="portfolio-nav-text"
                ref={(ref) => this.headingTwo = ref}
                style={styles.headingTwo}
              >
                Business
              </span>
            </div>
            <div className="box s--12-12 slider-cont">
              <div className="slider-rail">
              </div>
              {ball}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default PortfolioNav;
