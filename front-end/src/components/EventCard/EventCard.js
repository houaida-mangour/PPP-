import React from 'react';
import { Card , Button} from 'antd';
import obj1 from '../../pages/obj';

const { Meta } = Card;

function EventCard(props) {
    let b = props.b == "true"; 
    let id = props.id;
    function Up(){
        obj1[id] = "true";
        console.log(obj1);
    }
    if(props.sh == "true"){
      return (<Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img src={props.src} />}
      >
        <p>{props.name}</p>
{    b &&    < Button onClick={Up} type="primary">Subscribe</Button> }
      </Card>)
    }
    else return ""
    
}


export default EventCard;