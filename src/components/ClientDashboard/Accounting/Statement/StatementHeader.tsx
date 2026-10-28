const StatementHeader = () => {
  return (
    <div className="space-y-9">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="space-y-2">
            <h1 className="text-base font-sans">Accounting</h1>
            <div className="flex justify-start items-center">
              <h1 className="text-2xl md:text-3xl font-sans">Statement</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementHeader;
