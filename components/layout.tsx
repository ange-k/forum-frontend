import { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

const Layout = ({ children }:Props)  => {
    return (
        <div id="base-container">{children}</div> 
    );
};

export default Layout;