import React from "react";
import { config, colorscale } from "./helpers";
import Plot from "react-plotly.js";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      };



    render(){  
    return (
        <div className="">
        <Plot
          className="plot"
          style={{ display: "inline" }}
          data={[
            {
                type: "choroplethmapbox",
                featureidkey: "properties." + this.props.data.feature_id_key,
                z: this.props.features.map((i) => i.properties[this.props.data.value_id]),
                locations: this.props.features.map((i) => i.properties[this.props.data.feature_id_key]),
                colorscale: colorscale,
                hovertemplate: "%{text}" + "<br>Incidence: %{z:.2f}<extra></extra>",
                text: this.props.features.map((i) => i.properties[this.props.data.location_name]),
                zmin: "0.0",
                zmax: "1500",
                geojson: this.props.json,
            }
          ]}
          layout={{
            title: { text: "COVID-19 in Germany", pad: { b: 0, l: 0, r: 0, t: 0 } },
            mapbox: {
              style: "carto-positron",
              center: { lat: 51.3, lon: 10.45 },
              zoom: 4,
            },
            margin: {
              l: 0,
              r: 0,
              b: 0,
              t: 30,
            },
            annotations: [],
            autosize: true,
            uirevision: true,
            showlegend: false,
          }}
          config={config}
        />
      </div>
    );
    }
  }