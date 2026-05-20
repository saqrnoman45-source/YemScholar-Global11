import React from 'react';
import { fields } from '../data/fields';

const FieldsPage: React.FC = () => {
  return (
    <div className="fields-page">
      <h1>Fields</h1>
      <div className="grid">
        {fields.map((field, index) => (
          <div key={index} className="card">
            <h2>{field.name}</h2>
            <p>{field.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldsPage;
