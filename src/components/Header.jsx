import React, { Component } from 'react';
import { Grid, Col, Row, TopNav } from '@teachers/tpt-ui';

const Header = () => (
  <Grid fluid className="blue Header">
    <Row>
      <Col xs={6}>
        <h4> REFRY </h4>
      </Col>
      <Col xs={6}>
        <TopNav 
          links={
            [
                { label: "About", link: '#title1' },
                { label: "Installation", link: '#title2' },
                { label: "Usage", link: '#title3' },
                { label: "Tutorial", link: '#title4' },
                { label: "API", link: '#title5' }
            ]
          }
        />
      </Col>
    </Row>
  </Grid>
);

export default Header;