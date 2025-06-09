import Sidebar from '../../components/Siderbar';

export default function PrivateLayout({ children }) {
  return (
    <div className="">
    <Sidebar />
        {children}
    </div>
  );
}
