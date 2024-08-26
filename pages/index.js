import axios from 'axios';
import Head from "next/head";
import Header from '@/components/Header';
import RenderFormTable from '@/components/RenderFormTable';
import Footer from '@/components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

export async function getStaticProps() {
  let jsonData;

  try {
    const { data } =
      await axios.get('http://10.21.75.147:3004/v1/messages');
    jsonData = data;
  } catch (error) {
    console.log('API Error: ' + error);
  }
  return {
    props: {
      jsonData
    }
  }
}

export default function Home({ jsonData }) {
  return (
    <>
      <Head>
        <title>Message Board App</title>
        <meta name="description" content="A simple message board app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={8}>
            <Header />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} xl={8}>
            <RenderFormTable jsonData={jsonData} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} xl={8}>
            <Footer />
          </Col>
        </Row>
      </Container >
    </>
  );
}
