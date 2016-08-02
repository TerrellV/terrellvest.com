import React, { PropTypes } from 'react';

const SVG = ({id, className, props}) => {
  const svgBank = {
    'personal-website': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 516 328.171"
        style={{width: '80%'}}
      >
        <g>
          <path fill="#FFF" d="M516 309.87c0 10.198-8.267 18.465-18.465 18.465H18.465C8.267 328.335 0 320.068 0 309.87V18.8C0 8.602 8.267.335 18.465.335h479.07C507.733.335 516 8.602 516 18.8v291.07z"/>
          <path d="M199.706 27.335l-6.373 11.04-6.374-11.04m39.04 5h27v3h-27zm40 0h27v3h-27zm40 0h26v3h-26z" fill="#D1D3D4"/>
          <path opacity=".89" fill="none" stroke="#F1F2F2" d="M0 57.835h516"/>
          <path fill="#F1F2F2" d="M208 91.335h112v68H208z"/>
          <path fill="#D1D3D4" d="M208 177.335h112v2H208zm12 7h88v2h-88zm-6 6h100v2H214zm3 7h95v2h-95zm3 25h90v2h-90zm6 6h78v2h-78zm9 7h60v2h-60zm-10-32h79v2h-79z"/>
          <path fill="#00AEEF" d="M261 264.835c0 2.475-2.25 4.5-5 4.5h-25c-2.75 0-5-2.025-5-4.5s2.25-4.5 5-4.5h25c2.75 0 5 2.025 5 4.5z"/>
          <path fill="none" stroke="#00AEEF" stroke-miterlimit="10" d="M306 265.335c0 2.475-2.25 4.5-5 4.5h-25c-2.75 0-5-2.025-5-4.5s2.25-4.5 5-4.5h25c2.75 0 5 2.025 5 4.5z"/>
        </g>
      </svg>
    ),
    'tic-tac-toe': (
      <svg xmlns="http://www.w3.org/2000/svg" style={{width: '32%'}} className={className} viewBox="0 0 120 200">
        <path fill="#FFF" d="M120 191c0 4.97-4.03 9-9 9H9c-4.97 0-9-4.03-9-9V9c0-4.97 4.03-9 9-9h102c4.97 0 9 4.03 9 9v182z"/>
        <path fill="#91BAC1" d="M120 27H0V9c0-4.97 4.03-9 9-9h102c4.97 0 9 4.03 9 9v18z"/>
        <path fill="#FFF" d="M48 13h25v2H48z"/>
        <path fill="#F4F4F4" d="M13 52h32v32H13z"/>
        <path fill="#FFF" d="M45 52h31v32H45z"/>
        <path fill="#F4F4F4" d="M76 52h32v32H76z"/>
        <path fill="#FFF" d="M76 84h32v31H76z"/>
        <path fill="#F4F4F4" d="M76 115h32v32H76z"/>
        <path fill="#FFF" d="M45 115h31v32H45z"/>
        <path fill="#F4F4F4" d="M45 84h31v31H45z"/>
        <path fill="#FFF" d="M13 84h32v31H13z"/>
        <path fill="#F4F4F4" d="M13 115h32v32H13z"/>
        <g fill="#C9E9F0">
          <circle cx="50.297" cy="174" r="6.469"/>
          <circle cx="69.703" cy="174" r="6.469"/>
        </g>
      </svg>
    ),
    'twitch-viewer': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 516 328.171"
        className={className}
        style={{width: '80%'}}
      >
      <path fill="#FFF" d="M516 319.335c0 5.522-4.478 10-10 10H10c-5.523 0-10-4.478-10-10v-309c0-5.523 4.477-10 10-10h496c5.522 0 10 4.477 10 10v309z"/>
      <path fill="#F9F9F9" d="M111 23.335h345v13H111z"/>
      <path fill="#9D9DA8" d="M54 328.335H10c-5.523 0-10-4.478-10-10v-308c0-5.523 4.477-10 10-10h44v328z"/>
      <path fill="#CFCEDE" d="M115 74.335h79v46h-79z"/>
      <path fill="#9D9DA8" d="M115 153.335h79v45h-79zM115 236.335h79v45h-79zM247 153.335h78v45h-78zM247 236.335h78v45h-78zM379 153.335h77v45h-77zM379 236.335h77v45h-77z"/>
      <path fill="#CFCEDE" d="M247 74.335h78v46h-78zM379 74.335h77v46h-77z"/>
      <g fill="#FFF">
        <path opacity=".8" d="M16 25.335h22v3H16zM16 35.335h22v3H16zM16 45.335h22v3H16z"/>
      </g>
      <circle opacity=".8" fill="#FFF" cx="26.5" cy="293.835" r="7.5"/>
      </svg>
    ),
    'clock': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{width: '32%'}}
        className={className}
        viewBox="0 0 120 200"
      >
        <path fill="#868179" d="M120 191c0 4.97-4.03 9-9 9H9c-4.97 0-9-4.03-9-9V9c0-4.97 4.03-9 9-9h102c4.97 0 9 4.03 9 9v182z"/>
        <path fill="#D7D0C4" d="M26 10h27v2H26zM68 10h27v2H68z"/>
        <circle fill="#D7D0C4" cx="81.667" cy="68.667" r="15.667"/>
        <circle fill="#938F8A" cx="39.667" cy="68.667" r="15.667"/>
        <path fill="#D7D0C4" d="M50 104h21v2H50zM44 109h33v2H44zM39 114h43v2H39z"/>
        <path opacity=".2" fill="none" stroke="#FFF" stroke-miterlimit="10" d="M0 21.5h120"/>
        <path fill="none" stroke="#D7D0C4" stroke-width="2" stroke-miterlimit="10" d="M31 185h60"/>
        <g>
          <path fill="#F2C37E" stroke="#F2C37E" d="M54.5 154.625c0 1.588-1.287 2.875-2.875 2.875h-18.25c-1.588 0-2.875-1.287-2.875-2.875v-.25c0-1.588 1.287-2.875 2.875-2.875h18.25c1.588 0 2.875 1.287 2.875 2.875v.25z"/>
          <path fill="none" stroke="#FFF" d="M88.5 154.625c0 1.588-1.287 2.875-2.875 2.875h-18.25c-1.588 0-2.875-1.287-2.875-2.875v-.25c0-1.588 1.287-2.875 2.875-2.875h18.25c1.588 0 2.875 1.287 2.875 2.875v.25zM72 154.5h10"/>
        </g>
      </svg>
    ),
    'weather-forecast': (
      <svg
        viewBox="0 0 120 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        style={{width: '32%'}}
      >
      <path fill="#FFFFFF" d="M120,191c0,4.971-4.029,9-9,9H9c-4.971,0-9-4.029-9-9V9c0-4.971,4.029-9,9-9h102c4.971,0,9,4.029,9,9V191z"
      	/>
      <path fill="#B4D7CF" d="M120,68H0V9c0-4.971,4.029-9,9-9h102c4.971,0,9,4.029,9,9V68z"/>
      <rect x="17.602" y="89.25" fill="#E0E0E0" width="12" height="2"/>
      <rect x="43.5" y="89.25" fill="#E0E0E0" width="33" height="2"/>
      <rect x="17.602" y="118.375" fill="#E0E0E0" width="12" height="2"/>
      <rect x="43.5" y="118.375" fill="#E0E0E0" width="33" height="2"/>
      <rect x="17.602" y="146.5" fill="#E0E0E0" width="12" height="2"/>
      <rect x="43.5" y="146.5" fill="#E0E0E0" width="33" height="2"/>
      <rect x="17.602" y="176.625" fill="#E0E0E0" width="12" height="2"/>
      <rect x="43.5" y="176.625" fill="#E0E0E0" width="33" height="2"/>
      <circle fill="#B4D7CF" cx="97.078" cy="148.5" r="6.469"/>
      <circle fill="#B4D7CF" cx="97.078" cy="119.375" r="6.469"/>
      <circle fill="#B4D7CF" cx="97.078" cy="90.25" r="6.469"/>
      <g>
      	<rect x="17.602" y="29.766" fill="#EFEFEF" width="45" height="2"/>
      	<rect x="26.102" y="33" fill="#EFEFEF" width="28" height="2"/>
      	<circle fill="#EFEFEF" cx="90.93" cy="34" r="12.469"/>
      </g>
      <circle fill="#B4D7CF" cx="97.078" cy="177.625" r="6.469"/>
      </svg>
    ),
    'random-quote-generator': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 516 328.171"
        className={className}
        style={{width: '80%'}}
      >
        <path fill="#B0C4D9" d="M516,318.207c0,5.502-4.478,9.965-10,9.965H10c-5.523,0-10-4.463-10-9.965V10.3
        	c0-5.503,4.477-9.965,10-9.965h496c5.522,0,10,4.461,10,9.965V318.207z"/>
        <path opacity="0.89" fill="none" stroke="#F1F2F2" enable-background="new    " d="M516,57.835"/>
        <path opacity="0.89" fill="none" stroke="#F1F2F2" enable-background="new    " d="M0,57.835"/>
        <rect x="111" y="23.335" fill="#F9F9F9" width="345" height="13"/>
        <path fill="#9EACBC" d="M0,44.835v-35c0-5.523,4.479-10,10-10l496,0c5.523,0,10,4.477,10,10v35H0z"/>
        <g>
        	<rect x="200.75" y="21.085" opacity="0.8" fill="#FFFFFF" enable-background="new    " width="114.5" height="4.5"/>
        </g>
        <g>
        	<circle opacity="0.8" fill="#FFFFFF" enable-background="new    " cx="242.25" cy="296.085" r="10.25"/>
        	<circle opacity="0.8" fill="#FFFFFF" enable-background="new    " cx="273.75" cy="296.085" r="10.25"/>
        </g>
        <g>
        	<circle fill="#FFFFFF" cx="217.25" cy="178.252" r="81.834"/>
        	<circle fill="#9EACBC" cx="349.75" cy="211.252" r="30.834"/>
        </g>
        <rect x="171" y="176.251" fill="#9EACBC" width="92.5" height="4"/>
        <rect x="336" y="213.336" fill="#FFFFFF" width="27.5" height="4"/>
        <rect x="336" y="205.169" fill="#FFFFFF" width="27.5" height="4"/>
        <rect x="189.083" y="189.085" fill="#9EACBC" width="56.334" height="4"/>
        <rect x="189.083" y="163.418" fill="#9EACBC" width="56.334" height="4"/>
      </svg>
    )
  };

  return svgBank[id] || svgBank['clock'];
};

export default SVG;
