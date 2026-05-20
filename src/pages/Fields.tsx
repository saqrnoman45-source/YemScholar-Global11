import React from 'react';
import { fields } from '../data/fields';

export default function FieldsPage() {
  return (
    <div className="fields-page">
      <h1>Fields</h1>
      <div className="fields-grid">
        {fields.map((field, index) => (
          <div key={index} className="field-card">
            <h2>{field.name}</h2>
            <p>{field.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
