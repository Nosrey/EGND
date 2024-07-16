// creemos un input component para ser exportado, recibiremos el setValue, el value y el label por props
import React, { useState } from 'react';
import { Input } from 'components/ui';

function PyLInputComponent({ setValue, value, label }) {
    const [valueInternal, setValueInternal] = useState(value);
    return (
        <Input
            label={label}
            value={value}
            onChange={(e) => setValueInternal(e.target.value)}
        />
    );
}

export default PyLInputComponent;