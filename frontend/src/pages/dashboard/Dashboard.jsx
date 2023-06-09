import useRedirectUser from '../../customHooks/useRedirectUser';

const Dashboard = () => {
  useRedirectUser('/login');
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};
export default Dashboard;
