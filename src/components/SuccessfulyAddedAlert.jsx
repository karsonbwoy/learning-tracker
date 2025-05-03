import React from 'react';

const SuccessfullyAddedAlert = ({ name }) => {
    return (
        <div className="max-w-2xl mx-auto my-2 p-2 rounded-md bg-green-100 text-green-800 border border-green-200">
            <strong>Dodano pomyślnie!</strong> Dodano nowe zadanie "{name}" do listy.
        </div>
    );
};

export default SuccessfullyAddedAlert;
