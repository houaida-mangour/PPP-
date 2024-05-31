import React from 'react';
import { Card , Button} from 'antd';

const { Meta } = Card;

function EventCard(props) {
    
    if(props.sh == "true"){
      return (<Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img src={props.src} />}
      >
        <p>{props.name}</p>
{< Button type="primary">Subscribe</Button> }
      </Card>)
    }
    else return ""
    
}


export default EventCard;