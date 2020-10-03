import React,{ useState ,useEffect} from 'react';
import {useAPI} from 'common/hooks/api';
import { Row, Col ,Select,Modal, List, Spin } from 'antd'
export const Map = () => {
    const {data: map} = useAPI('/map/?format=json', {});
    var parser = new DOMParser();
    if(map)
        var htmlDoc = parser.parseFromString(map.map2, 'text/html');
    return (
        <Row>
            <Col span={12}>
                <div style={{'width':'100%'}}><div style={{'position':'relative','width':'100%','height':'0px','paddingBottom':'60%'}}><span style={{'color':'#565656'}} ></span><iframe src="about:blank" style={{'position':'absolute','width':'100%','height':'100%','left':'0px','top':'0px','border':'none'}} data-html={
                    htmlDoc?htmlDoc.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('iframe')[0].getAttribute("data-html"):null
                } onLoad="this.contentDocument.open();this.contentDocument.write(atob(this.getAttribute('data-html')));this.contentDocument.close();" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe></div></div>
            </Col>
        </Row>
        
        )
}
export default Map;