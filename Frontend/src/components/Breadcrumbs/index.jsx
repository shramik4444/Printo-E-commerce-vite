import React from 'react';
import './index.css'

const Breadcumbs = () => {

  const breadcrumbitems = [
    { label: 'Home', link: '/' },
    { label: 'Drinkware', link: '/categories/drinkwares' },
    { label: 'Dazzle Dark Grey Mug', link: null }
  ];

  return (
    <div className="breadcrumb w-full">
      <div className="breadcrumb-container">
        {breadcrumbitems.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <a href={item.link} className="breadcrumb-link">
                {item.label}
              </a>
            ) : (
              <span className="breadcrumb-current">{item.label}</span>
            )}
            {index < breadcrumbitems.length - 1 && (
              <span className="breadcrumb-separator"> &gt; </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>


  )
}
export default Breadcumbs;