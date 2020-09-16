import React from 'react';
import { Link } from 'react-router-dom';
 
 
const Navigation = () => {
    return (<ul>
      <li>
        <Link to={"/"}>Gloomhaven</Link>
      </li>
      <li>
        <Link to={"/jotl"}>JOTL</Link>
      </li>
    </ul>)
};
 
export default Navigation;
