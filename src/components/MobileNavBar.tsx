
import React from 'react';
import BottomNavigation from './navigation/BottomNavigation';
import SideMenuDrawer from './navigation/SideMenuDrawer';

export function MobileNavBar() {
  return (
    <>
      {/* Bottom Navigation Bar */}
      <BottomNavigation />
      
      {/* Side Menu Drawer */}
      <SideMenuDrawer />
    </>
  );
}

export default MobileNavBar;
