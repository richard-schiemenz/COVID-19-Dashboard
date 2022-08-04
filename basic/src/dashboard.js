import React from "react";
import Toggle from "./toggle";
import Map from "./map";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    //input onchange methods
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.state = {
      //API data
      data: [
        {name: 'state_level',
         url:'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronafälle_in_den_Bundesländern/FeatureServer/0/query?where=1%3D1&outFields=LAN_ew_GEN,AdmUnitId,cases7_bl_per_100k&outSR=4326&f=geojson',
         feature_id_key:'AdmUnitId',
         location_name:'LAN_ew_GEN',
         value_id:'cases7_bl_per_100k'},
        {name: 'county_level',
        url:'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=cases,AdmUnitId,cases7_lk,cases7_per_100k,GEN&outSR=4326&f=geojson',
        feature_id_key:'AdmUnitId',
        location_name:'GEN',
        value_id:'cases7_per_100k'}],
      data_on_state_level: true,
      json: [],
      features: [],
    };

    //pull first data
    this.getData(this.state.data_on_state_level);
  }
  
  //Pull data from API
  getData = async (data_on_state_level) => {
    const response = await fetch(data_on_state_level
      ? this.state.data[0].url
      : this.state.data[1].url);
     //extract JSON from the http response
    const geoJson = await response.json();
      this.setState({json:geoJson, features:geoJson.features})
  };

  handleToggleChange(props){
    //get Data for new state
    this.getData(!this.state.data_on_state_level)
    this.setState((state) =>{
      return{data_on_state_level:!state.data_on_state_level}
    });
  }

  render() {
    return (
      <div className="col-12 d-flex justify-content-center">
        <div>
          <Toggle
                id="map_resolution"
                togglables={["States", "Counties"]}
                isToggleOn={this.state.data_on_state_level}
                onInputChange={this.handleToggleChange}
          />
        </div>
      
        <div>
          <Map
            data={this.state.data_on_state_level
              ? this.state.data[0]
              : this.state.data[1]}
            json={this.state.json}
            features={this.state.features}
          />
        </div>
      </div>
    );
  }
}
