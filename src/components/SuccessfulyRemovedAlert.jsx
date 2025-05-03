import React from 'react';

const SuccessfullyRemovedAlert = ({ name }) => {
    return (
        <div className="max-w-2xl mx-auto my-2 p-2 rounded-md bg-red-100 text-red-800 border border-red-200">
            <strong>Usunięto pomyślnie!</strong> Usunięto zadanie "{name}" z listy.
        </div>
    );
};

export default SuccessfullyRemovedAlert;
