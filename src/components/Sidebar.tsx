import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendar, FaUser, FaLock } from 'react-icons/fa';
import '../css/Sidebar.css';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleMenuClick = (menu: string, hasSubMenu: boolean, event: React.MouseEvent) => {
    if (hasSubMenu) {
      event.preventDefault(); // Prevent navigation if menu has submenus
      setActiveMenu(menu === activeMenu ? null : menu);
      if (menu !== activeMenu) {
        setActiveSubmenu(null); // Reset active submenu when changing menu
      }
    }
  };

  const handleSubmenuClick = (subItem: string) => {
    setActiveSubmenu(subItem === activeSubmenu ? null : subItem);
  };

  const handleMouseEnter = () => {
    if (!isLocked) {
      setIsSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div 
      className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-header flex items-center justify-between">
        <Link to="/dashboards" className="flex items-center">
          <img src="https://img2.pic.in.th/pic/V-Photoroom.png" alt="Vendorverse Logo" className="logo" />
          {isSidebarOpen && (
            <span className="text-xl font-semibold">Vendorverse</span>
          )}
        </Link>
        {isSidebarOpen && (
          <button
            type="button"
            className="toggle-button"
            onClick={toggleLock}
            aria-label={isLocked ? "Unlock sidebar" : "Lock sidebar"}
          >
            <div className='lockbar'>
              <i className={`text-xl ${isLocked ? 'bi bi-nut' : 'bi bi-octagon'}`}></i>
            </div>
          </button>
        )}
      </div>

      <nav className="sidebar-menu">
        <ul>
          {[
            { name: 'Dashboards', icon: <FaHome />, path: '/dashboards', subMenu: [] },
            { name: 'Product', icon: <FaCalendar />, path: '/products', subMenu: [ 'ProductList', 'AddProduct'] },
            { name: 'Order', icon: <FaUser />, path: '/orders', subMenu: ['OrderList', 'Subitem 2'] },
            { name: 'Edit Page', icon: <FaLock />, path: '/edit-page', subMenu: [] }
          ].map((item) => (
            <li 
              key={item.name} 
              className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
            >
              <a
                href={item.subMenu.length > 0 ? '#' : item.path}
                className={`menu-link ${activeMenu === item.name ? 'active' : ''}`}
                onClick={(event) => handleMenuClick(item.name, item.subMenu.length > 0, event)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className={`menu-text ${isSidebarOpen ? 'block' : 'hidden'}`}>{item.name.replace('-', ' ').toUpperCase()}</span>
                {item.subMenu.length > 0 && isSidebarOpen && (
                  <span className="ml-auto">
                    <i className={`bi ${activeMenu === item.name ? 'bi-caret-down' : 'bi-caret-right'}`}></i>
                  </span>
                )}
              </a>
              {item.subMenu.length > 0 && (
                <div className={`submenu-content ${activeMenu === item.name ? 'active' : ''}`}>
                  <ul>
                    {item.subMenu.map((subItem, index) => (
                      <li key={index} className={`submenu-item ${activeSubmenu === subItem ? 'active' : ''}`}>
                        <Link 
                          to={`${item.path}/${subItem.toLowerCase().replace(' ', '-')}`} 
                          className={`submenu-link ${activeSubmenu === subItem ? 'active' : ''}`}
                          onClick={() => handleSubmenuClick(subItem)}
                        >
                          <div className="dropdown-icon">
                            {/* Add an icon or text here */}
                          </div>
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
