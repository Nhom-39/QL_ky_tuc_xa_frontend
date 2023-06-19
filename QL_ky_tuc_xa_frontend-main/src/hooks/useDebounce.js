const { useState, useEffect } = require('react');

function useDebounce(value, delay) {
    const [debouncedvalue, setDebouncedvalue] = useState(value);

    useEffect(() => {
        const hander = setTimeout(() => setDebouncedvalue(value), delay);
        return () => clearTimeout(hander);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedvalue;
}

export default useDebounce;
