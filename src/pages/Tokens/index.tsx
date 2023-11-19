import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "src/components/Card";

const Tokens = () => {
  return (
    <div>
      <Card>
        <table>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Price</th>
              <th>TVL</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ether</td>
              <td>$1,943.70</td>
              <td>$890</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Tokens;
