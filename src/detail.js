
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {Nav} from 'react-bootstrap';


function Detail (props){
    let [alert1,setAlert1] = useState(true);
    let [text,setText] = useState('');
    let [count , setCount] = useState(0);
    let [tabNo , setTabNo] = useState(0);
    useEffect(()=>{
        let a = setTimeout(function(){
            setAlert1(false);
        },2000);

        return () => {
            clearTimeout(a);
        };
    },[])
    let {id} = useParams();
    id = Number(id);
    useEffect(()=>{
        if(isNaN(text)){alert("숫자만 입력해주세요");}
    },[text])

    
    return(
        <div className="container">
            {alert1 == true ?
            <div className="alert alert-warning">
                2초이내 구매시 할인
            </div>:null }
            {count}
            <input onChange={(e)=>{setText(e.target.value)}}></input>
            <button onClick={()=>{setCount(count++)}}>버튼</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+(id+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes.find(function(e){if(e.id == id){return true;}}).title}</h4>
                    <p>{props.shoes.find(function(e){if(e.id == id){return true;}}).content}</p>
                    <p>{props.shoes.find(function(e){if(e.id == id){return true;}}).price}원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTabNo(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTabNo(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTabNo(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabChange tabNo={tabNo}/>
        </div> 
    )
}
function TabChange(props){
    let [fade,setFade] = useState('');
    useEffect(()=>{
        setFade("end");
        return()=>{
            setFade("");
        }
    },[props.tabNo])
    
    if(props.tabNo==0){return(<div className={"start "+fade}>내용0</div>)}
    if(props.tabNo==1){return(<div className={"start "+fade}>내용1</div>)}
    if(props.tabNo==2){return(<div className={"start "+fade}>내용2</div>)}
}
export default Detail ;
