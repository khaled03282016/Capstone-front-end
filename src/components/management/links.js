import React from 'react';
import {Link} from 'react-router-dom';

const DynamikLink = props =>{
    return(<div className="links-wrapper">
        <Link to={props.route}>{props.linkText}</Link>
        <a onClick={()=> props.handelLogOut()}>Signe Out</a>
    </div>)
}

export default DynamikLink;


