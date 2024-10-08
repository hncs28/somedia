import React, { useEffect,useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  meta,
  Prizes,
} from "../../content_option";
import Slide from "./slide";
import FocusRing from "../../components/focusring"; // Import the FocusRing component
import Preloader from "../../components/preload/Pre";
import home1 from "../../assets/images/home1.jpg";
import axios from "axios";
export const Tradition = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const background = document.querySelector('.backgroundvideo img');
      const blur = scrollPosition * 0.015; // Làm mờ ảnh
      background.style.filter = `blur(${blur}px) brightness(0.8)`; // Làm mờ ảnh
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [data,setData]=useState([]);
  useEffect(function lodData(){
    async function fetchData() {
      const response = await axios.get('https://sobackend.vercel.app/api/prizes');
      setData(response.data);
    };
    fetchData();
  },[]);
  return (
    <HelmetProvider>
      <FocusRing />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Traditional Room | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Preloader />
        <div className=" backgroundvideo grain" >
          <img loading="lazy"src={home1} alt="background" />
        </div>
        <Row className="mb-0 mt-3 pt-md-3 " >
          <Col lg="12">
            <h1 className="display-4 mb-4 " style={{ textAlign: "left" }}>Traditional Room</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="mt-0 mb-3 " >
          <Row className="mb-5">
            <span className="text-center"> <h2>Humans of So Media</h2></span>
          </Row>
          <Row className="mt-3">
            <Col lg="12" xl="12" className="slideroom">
              <Slide></Slide>
            </Col>
          </Row>
          <hr className="t_border my-4 ml-0 text-left" />
        </Row>
        <Row className="mb-5 mt-3 pt-md-3">
          <h2 className="text-center"> Prizes </h2>
          <Row className="mt-3">
            {data.map((data, index) => (
              <Col lg="4" xl="4" className="prize" key={index}>
                <h4>{data.prizeName}</h4>
                <p>{data.prizeLocation}</p>
                <p>{data.prizeTime}</p>
              </Col>
            ))}
          </Row>
        </Row>
        {/* <Row className="mt-3 mb-3 " >
          <hr></hr>
          <Row>
            <h2 className="text-center"> Why we named "Sổ Media" ? </h2>
          </Row>
          <Row>
            <Col lg="6" xl="12">

            </Col>
            <Col lg="6" xl="12">
            </Col>

          </Row>
        </Row> */}
      </Container>
    </HelmetProvider >
  );
};
