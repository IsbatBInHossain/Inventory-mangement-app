import './InfoBox.scss';

// eslint-disable-next-line react/prop-types
const InfoBox = ({ icon, title, count, bgColor }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className='info-icon --color-white'>{icon}</span>
      <span className='info-text'>
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};
export default InfoBox;
