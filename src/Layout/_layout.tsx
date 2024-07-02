import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {Content} from './Content';
export default function Layout(){
    return(
            <>
              <Navbar/> 
              <div className='wrapper'>
                  <Sidebar/>
                  <Content/>
              </div>
            </>
    );
}