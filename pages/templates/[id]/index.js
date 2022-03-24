import React, { Component } from 'react';

const TemplateList = ({ category }) => {

  return (
    <div>
      <h1>{category} Templates</h1>
    </div>
  )
}

TemplateList.getInitialProps = async ({ query: { id }}) => {
  return { category: id }
}

export default TemplateList