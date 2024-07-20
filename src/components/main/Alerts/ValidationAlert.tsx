import React from 'react';
import { Alert } from 'react-bootstrap';
import './ValidationAlert.css';

const ValidationAlert = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <Alert className="alert" variant="danger" onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default ValidationAlert;
