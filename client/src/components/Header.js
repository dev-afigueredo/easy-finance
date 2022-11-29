import React from 'react'

export default function Header(props) {
  const { description, subtitle } = props;
  return (
    <>
      <h2 className="center">{description}</h2>
      <h4 className="center">{subtitle}</h4>
    </>
  )
}
