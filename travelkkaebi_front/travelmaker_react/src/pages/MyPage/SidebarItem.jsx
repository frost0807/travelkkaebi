import React from "react";

function SidebarItem({ menu }) {
  return (
    <div className="sidebar-item active">
      <p>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;
