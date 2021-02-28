import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Div = styled.div`
 display: flex;

li{
cursor: pointer;
list-style:none;
}
.suggestions{
    position: absolute;
    z-index: 1;
    margin-top: 0px;
    margin-left:145px;
}

.suggestions li{
overflow:hidden;
height:0;

-webkit-transition:all 0.3s ease-in-out;
-moz-transition:all 0.3s ease-in-out;
-o-transition:all 0.3s ease-in-out;
transition:all 0.3s ease-in-out;
}


input[type="search"]:focus + .suggestions li{
height:23px;
}


`

class Autocomplete extends Component {
  static propTypes = {};
  

  constructor(props) {
    super(props);
  }

  render(){
    return (
       < Div>
         <input
           type="search"
           onChange={this.props.onChange}
           onKeyDown={this.props.onKeyDown}
           value={this.props.value}
           className="searchbox"
         />
         <ul class="suggestions">
            {this.props.suggestions.map((suggestion, index) => {
              return (
                <li  key={suggestion}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
       </Div>
     );
 };
}
export default Autocomplete;