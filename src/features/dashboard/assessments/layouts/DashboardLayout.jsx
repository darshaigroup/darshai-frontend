const DashboardLayout = ({ children }) => {

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {children}

      </div>

    </div>
  );
};

export default DashboardLayout;