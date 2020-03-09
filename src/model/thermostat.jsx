// TODO: update mode should be in business logic
updateMode() {
    let mode;
    // console.log(this.state);

    let UpperBoundTemp =
      this.state.targetTemperature + this.state.dt + this.state.dtCool;
    let LowerBoundTemp =
      this.state.targetTemperature - this.state.dt - this.state.dtHeat;
    let OffUpperBound =
      this.state.targetTemperature + (this.state.dt - this.state.dtCool);
    let OffLowerBound =
      this.state.targetTemperature - (this.state.dt - this.state.dtHeat);
    // console.log(this.state.targetTemperature);

    // console.log("Upperbound: " + UpperBoundTemp + " Lower Bound:" + LowerBoundTemp + " Off lower: " + OffLowerBound + " Off Upper: " +  OffUpperBound);

    if (this.state.currentTemperature > UpperBoundTemp) {
      // console.log(this.state.currentTemperature + "," + UpperBoundTemp );
      mode = "cool";
      this.setState({
        mode: mode,
        modeColor: "#3495E4"
      });
    } else if (this.state.currentTemperature < LowerBoundTemp) {
      mode = "heat";
      // console.log(2);
      this.setState({
        mode: mode,
        modeColor: "#E4656E"
      });
    } else if (
      this.state.currentTemperature < OffUpperBound &&
      this.state.currentTemperature > OffLowerBound
    ) {
      mode = "off";
      // console.log(this.state.currentTemperature + ", " + OffUpperBound + "," + OffLowerBound);
      this.setState({
        mode: mode,
        modeColor: "#D6D6D6"
      });
    }
  }