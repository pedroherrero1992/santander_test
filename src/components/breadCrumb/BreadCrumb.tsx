import React from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

interface BreadcrumbProps {
  paths: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  const handleClick = (path: string) => {
    window.alert(path);
  };

  return (
    <nav aria-label="breadcrumb">
      <div style={{ display: 'flex', alignItems: 'center' }}>
            {/*horrible el -5 pero todas los iconos le agrega un margen de 5 px al usar tendria que generar un svg propio sin el margen por cuestiones de tiempo se opto por esta soluc */}
          <IoChevronBackOutline onClick={()=>window.alert("Volver")}  style={{ fontSize: '20px', color: '#888', marginLeft:-5 }} />
        
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <span
              style={{
                display: 'inline',
                color: index === paths.length - 1 ? 'black' : '#888',
                fontWeight: index === paths.length - 1 ? 'bold' : 'normal',
                cursor: 'pointer',
                marginInline:5
              }}
              onClick={() => handleClick(path)}
            >
              {path}
            </span>
            {index < paths.length - 1 && ' / '}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
