import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {
  return (
    <div>
      <div className="overview">
        <Navbar/>
        <div>
          <div className="Toastify"></div>
          <div className="container"></div>
          <div className="inner-staking">
            <div className="container">
              <div></div>
              <div className="staking-card">
                <h2 className="pb-4">Stake</h2>
                <div className="inner-staking-card">
                  <div className="table-responsive">
                    <table>
                      <tbody>
                        <tr>
                          <th>No.</th>
                          <th>Staking Amount</th>
                          <th>APR Reward</th>
                          <th>Stake Time</th>
                          <th>Action</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
