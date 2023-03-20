import { useState } from 'react';
import { Button,Navbar,Container,Nav } from 'react-bootstrap';
import './App.css';
import {a,b,data} from './data.js';
import Detail from './detail.js';
import { Routes, Route, Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function App() {

  let [shoes,setShoes] = useState(data);
  let [count,setCount] = useState(1);
  let [loading,setLoading] = useState(false);

  return (
    <div className="App">


      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">KeidShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {shoes.map((e,i)=>{
                  return(              
                    <List shoes={shoes} i={i} key={i}/> 
                  )
                })}
              </div>
            </div>
            {count<=2?
            <button onClick={()=>{
              setLoading(true);
              setCount(count+1);              
              let url = 'https://codingapple1.github.io/shop/data'+(count+1)+'.json';
              console.log(count,url);
              axios.get(url).then((result)=>{
                setLoading(false);
                let copy = [...shoes]; 
                setShoes(copy.concat(result.data));
              })
              .catch(()=>{                
                setLoading(true);
                console.log('ajax 실패함')
              });
            }}>더보기</button>:null}
            {loading == true ? <div>로딩중입니다.</div>:null}
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
      </Routes>
      

    
    </div>
    
  );
}

function List (props){
  return(
    <div className="col-md-4">
      <Link to={"/detail/"+props.i}><img src={"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} width="80%"/></Link>
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].content}</p>
    </div>
  )
}

export default App;
