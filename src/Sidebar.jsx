import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";


function Sidebar() {

  return (
    <div className="sidebar">
{/*       <TwitterIcon className="sidebar__twitterIcon" /> */}
		<p class="tweetralize">Tweetralize</p>
{/* 		<div>
			<img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} />
			{ currentAccount ? <p> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : <p> Not connected </p> }
		</div> */}
      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
    </div>
  );
}

export default Sidebar;