
const InputPoint = ({ label, point, setPoint }) => {
    const handleChange = (event) => {
        const { value } = event.target;
        const [lat, lng] = value.split(',');
        if (isNaN(lat) || isNaN(lng)) return;
        setPoint([Number(lat), Number(lng)]);
    };

    return (
        <div>
            <label htmlFor={label}>{label}:</label>
            <input type="text" id={label} value={point.join(',')} onChange={handleChange} />
        </div>
    );
};

export default InputPoint;