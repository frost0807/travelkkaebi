import MapN from "../../components/NaverMap/MapN";
import { NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';


function TestPage(){
  return (
    <RenderAfterNavermapsLoaded
    clientId={"advgkynex5y"}
    >
      <MapN
        
      />
    </RenderAfterNavermapsLoaded>
  )
}

export default TestPage;