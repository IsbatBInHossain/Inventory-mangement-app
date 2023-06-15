import { useState } from 'react';
import './Contact.scss';
import Card from '../../components/card/Card';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../services/authService';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const data = {
    subject,
    message,
  };

  const sendMail = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, data);
      setSubject('');
      setMessage('');
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='contact'>
      <h3 className='--mt'>Contact Us</h3>
      <div className='section'>
        <form onSubmit={sendMail}>
          <Card cardClass='card'>
            <label>Subject</label>
            <input
              type='text'
              name='subject'
              placeholder='Subject'
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              cols='30'
              rows='10'
              name='message'
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></textarea>
            <button className='--btn --btn-primary'>Send Message</button>
          </Card>
        </form>
      </div>
      <div className='section'>
        <div className='details'>
          <Card cardClasses={'card2'}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className='icons'>
              <span>
                <FaPhoneAlt />
                <p>+8801815423827</p>
              </span>
              <span>
                <FaEnvelope />
                <p>warehousewizardlive@outlook.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Dhaka,Bangladesh</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Contact;
