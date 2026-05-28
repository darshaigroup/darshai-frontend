import {
  useLocation,
} from "react-router-dom";

const Result = () => {

  const location =
    useLocation();

  const result =
    location.state;

  return (

    <div>

      <h1>
        Composite Score:
      </h1>

      <h2>
        {
          result.data
            .compositeScore
        }
      </h2>

      <h3>
        {
          result.data
            .riskBand
        }
      </h3>

      <hr />

      {
        result.data.blocks.map(
          (block) => (

            <div
              key={block.id}
            >

              <h2>
                {block.id}
              </h2>

              <p>
                Score:
                {block.score}
              </p>

              <p>
                Risk:
                {block.risk_band}
              </p>

            </div>
          )
        )
      }

    </div>
  );
};

export default Result;